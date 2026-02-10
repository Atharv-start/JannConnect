import React, { useEffect, useRef, useState } from "react"
import { useLanguage } from "../context/LanguageContext"
import schemes from "../data/schemes"
import { extractIntent } from "../utils/ai"

const LANG_TO_LOCALE = {
  en: "en-IN",
  hi: "hi-IN",
  ta: "ta-IN",
  te: "te-IN",
  ml: "ml-IN",
  bn: "bn-IN",
  mr: "mr-IN",
}

export default function Chatbot() {
  const { t, lang } = useLanguage()
  const [open, setOpen] = useState(false)
  const [listening, setListening] = useState(false)
  const [micEnabled, setMicEnabled] = useState(() => {
    try {
      return localStorage.getItem("chatbot.micEnabled") === "true"
    } catch (e) {
      return false
    }
  })
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)
  const recognitionRef = useRef(null)
  const endRef = useRef(null)

  useEffect(() => {
    try {
      localStorage.setItem("chatbot.micEnabled", micEnabled ? "true" : "false")
    } catch (e) {}
  }, [micEnabled])

  // cleanup recognition on unmount
  useEffect(() => {
    return () => {
      try {
        if (recognitionRef.current) {
          recognitionRef.current.onresult = null
          recognitionRef.current.onend = null
          recognitionRef.current.onerror = null
          recognitionRef.current.stop()
        }
      } catch (e) {}
    }
  }, [])

  useEffect(() => {
    if (endRef.current) endRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [messages, isProcessing, open])

  function appendMessage(sender, text) {
    setMessages((m) => [...m, { sender, text }])
  }

  async function handleSend() {
    const text = input.trim()
    if (!text) return
    appendMessage("user", text)
    setInput("")
    setIsProcessing(true)

    // typing indicator
    appendMessage("bot", "__typing__")

    // ensure a short delay so typing indicator is visible
    setTimeout(async () => {
      try {
        // simple conversational pre-filters (greetings / help)
        const low = text.toLowerCase()
        const isGreeting = /^(hi|hello|hey|namaste|hii|hola)\b/.test(low)
        const isHelp = /\b(help|how|what can you|what do you do|support)\b/.test(low)

        if (isGreeting) {
          setMessages((m) => m.filter((x) => x.text !== "__typing__"))
          appendMessage("bot", "Hi! I can help you find government and NGO schemes. How can I help?")
          setIsProcessing(false)
          return
        }

        if (isHelp) {
          setMessages((m) => m.filter((x) => x.text !== "__typing__"))
          appendMessage("bot", "Tell me what you need — for example, \"I need a scholarship for students\" or \"schemes for senior citizens\".")
          setIsProcessing(false)
          return
        }

        let intent = { category: null, keywords: [] }
        try {
          intent = await extractIntent({ text, lang })
        } catch (e) {
          // ignore AI error and fall back to keyword derivation
        }

        const results = matchSchemes(intent, text)

        // remove typing placeholder
        setMessages((m) => m.filter((x) => x.text !== "__typing__"))

        appendMessage("bot", t.chatbotListingIntro || "Here are relevant schemes:")
        if (!results || results.length === 0) {
          appendMessage("bot", t.chatbotNoMatches || "Sorry, I couldn't find matching schemes.")
        } else {
          results.slice(0, 5).forEach((s) => {
            appendMessage("bot", `${t(s.titleKey)} — ${t(s.descriptionKey)}`)
          })
        }
      } catch (err) {
        setMessages((m) => m.filter((x) => x.text !== "__typing__"))
        appendMessage("bot", t.chatbotError || "Sorry, something went wrong.")
      } finally {
        setIsProcessing(false)
      }
    }, 700)
  }

  function matchSchemes(intent, rawText = "") {
    const cat = intent?.category
    let keywords = (intent?.keywords || []).map((k) => String(k).toLowerCase())

    // if AI didn't provide keywords, derive from the raw text
    if ((!keywords || keywords.length === 0) && rawText) {
      keywords = rawText
        .split(/[^\w\u00C0-\u024F]+/)
        .map((w) => w.toLowerCase())
        .filter((w) => w.length > 2)
    }

    let candidates = schemes.slice()
    if (cat) {
      const last = String(cat).split(".").pop()
      candidates = candidates.filter((s) => String(s.categoryKey).toLowerCase().includes(last.toLowerCase()))
    }

    const scored = candidates
      .map((s) => {
        const tags = (s.tags || []).map((t) => String(t).toLowerCase())
        const matched = keywords.filter((k) => tags.includes(k)).length
        return { scheme: s, score: matched }
      })
      .filter((x) => x.scheme)

    const matched = scored.filter((x) => x.score > 0).sort((a, b) => b.score - a.score)
    if (matched.length > 0) return matched.map((m) => m.scheme)

    if (schemes.length > 0) return schemes.slice(0, 3)
    return []
  }

  function createRecognition() {
    if (recognitionRef.current) return recognitionRef.current
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) return null
    const r = new SpeechRecognition()
    r.continuous = true
    r.interimResults = false
    r.maxAlternatives = 1
    r.lang = LANG_TO_LOCALE[lang] || "en-IN"

    r.onresult = (e) => {
      const results = []
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const alt = e.results[i][0]
        if (alt && alt.transcript) results.push(alt.transcript)
      }
      const text = results.join(" ")
      if (text) setInput((prev) => (prev ? prev + " " + text : text))
      // keep listening; user can stop explicitly
    }

    r.onerror = (ev) => {
      console.warn("Speech recognition error", ev)
      setListening(false)
    }

    // some browsers stop recognition automatically; restart if user still wants listening
    r.onend = () => {
      setListening(false)
    }

    recognitionRef.current = r
    return r
  }

  function startRecognition() {
    const r = createRecognition()
    if (!r) return
    try {
      r.lang = LANG_TO_LOCALE[lang] || "en-IN"
      setListening(true)
      setTimeout(() => {
        try {
          r.start()
        } catch (e) {
          console.warn("Speech recognition start error", e)
          setListening(false)
        }
      }, 100)
    } catch (e) {
      setListening(false)
    }
  }

  function stopRecognition() {
    const r = recognitionRef.current
    if (!r) return
    try {
      r.stop()
      setListening(false)
    } catch (e) {
      setListening(false)
    }
  }

  function toggleListen() {
    if (!micEnabled) {
      // only set flag; browser will prompt when startRecognition is called
      setMicEnabled(true)
      return
    }
    if (listening) stopRecognition()
    else startRecognition()
  }

  // handle Enter key
  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Floating toggle button */}
      <button
        aria-label={open ? "Close chat" : "Open chat"}
        onClick={() => setOpen((v) => !v)}
        className="fixed right-5 bottom-5 z-60 bg-indigo-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center"
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed right-5 bottom-20 z-60 md:right-6 md:bottom-6">
          <div className="w-[360px] md:w-[420px] h-[520px] md:h-[560px] bg-white rounded-xl shadow-xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900 text-white">
              <div className="font-semibold">JannConnect</div>
              <div>
                <button aria-label="close" onClick={() => setOpen(false)} className="text-white/90">✕</button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`${m.sender === "user" ? "bg-gray-200 text-black" : "bg-indigo-600 text-white"} max-w-[85%] px-4 py-2 rounded-lg break-words`}
                  >
                    {m.text === "__typing__" ? (
                      <div className="text-sm italic">{t.chatbotProcessing || "Processing..."}</div>
                    ) : (
                      <div style={{ whiteSpace: "pre-wrap" }}>{m.text}</div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            <div className="p-3 border-t bg-white flex items-center gap-2">
              <textarea
                aria-label="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.chatbotInputPlaceholder || "Ask me anything..."}
                className="flex-1 px-3 py-2 rounded-md border border-gray-300 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none h-10"
                style={{ WebkitTextFillColor: "black", WebkitBoxShadow: "0 0 0 1000px white inset" }}
              />

              <button
                aria-label="mic"
                onClick={toggleListen}
                className={`p-2 rounded-md border ${micEnabled && listening ? "bg-rose-50 border-rose-200" : "bg-white border-gray-200"}`}
                title={listening ? (t.chatbotStop || "Stop") : (t.chatbotListen || "Listen")}
              >
                {listening ? <span className="text-rose-600">●</span> : <span>🎤</span>}
              </button>

              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className={`px-4 py-2 rounded-md text-white ${input.trim() ? "bg-indigo-600" : "bg-indigo-300 cursor-not-allowed"}`}
              >
                {t.chatbotSend || "Send"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .fixed.right-5.bottom-5 { right: 0.5rem; left: 0.5rem; }
          .fixed.right-5.bottom-20 > div { width: calc(100% - 1rem) !important; height: 70vh !important; border-radius: 12px !important; left: 0.5rem; right: 0.5rem; bottom: 0.5rem; }
        }
      `}</style>
    </>
  )
}
