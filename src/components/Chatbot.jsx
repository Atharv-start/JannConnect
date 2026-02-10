import React, { useEffect, useRef, useState } from "react"
import { useLanguage } from "../context/LanguageContext"
import { extractIntent } from "../utils/ai"
import { getAllSchemes } from "../services/schemesService"

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
  const [schemes, setSchemes] = useState([])

  const recognitionRef = useRef(null)
  const endRef = useRef(null)

  // Load schemes from Firebase
  useEffect(() => {
    async function loadSchemes() {
      try {
        const data = await getAllSchemes()
        setSchemes(data)
      } catch (e) {
        console.error("Failed to load schemes", e)
      }
    }
    loadSchemes()
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem("chatbot.micEnabled", micEnabled ? "true" : "false")
    } catch (e) {}
  }, [micEnabled])

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

    appendMessage("bot", "__typing__")

    setTimeout(async () => {
      try {
        let intent = { category: null, keywords: [] }
        try {
          intent = await extractIntent({ text, lang })
        } catch (e) {}

        const results = matchSchemes(intent, text)

        setMessages((m) => m.filter((x) => x.text !== "__typing__"))

        appendMessage("bot", "Here are relevant schemes:")
        if (!results || results.length === 0) {
          appendMessage("bot", "Sorry, I couldn't find matching schemes.")
        } else {
          results.slice(0, 5).forEach((s) => {
            appendMessage("bot", `${s.name} — ${s.simpleExplanation?.[lang] || s.simpleExplanation?.en}`)
          })
        }
      } catch (err) {
        setMessages((m) => m.filter((x) => x.text !== "__typing__"))
        appendMessage("bot", "Sorry, something went wrong.")
      } finally {
        setIsProcessing(false)
      }
    }, 700)
  }

  function matchSchemes(intent, rawText = "") {
    const cat = intent?.category
    let keywords = (intent?.keywords || []).map((k) => String(k).toLowerCase())

    if ((!keywords || keywords.length === 0) && rawText) {
      keywords = rawText
        .split(/[^\w\u00C0-\u024F]+/)
        .map((w) => w.toLowerCase())
        .filter((w) => w.length > 2)
    }

    let candidates = schemes.slice()

    if (cat) {
      candidates = candidates.filter((s) =>
        (s.category || []).some((c) =>
          c.toLowerCase().includes(cat.toLowerCase())
        )
      )
    }

    const scored = candidates
      .map((s) => {
        const text = (
          s.name +
          " " +
          (s.simpleExplanation?.en || "")
        ).toLowerCase()

        const matched = keywords.filter((k) => text.includes(k)).length
        return { scheme: s, score: matched }
      })
      .filter((x) => x.scheme)

    const matched = scored
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)

    if (matched.length > 0) return matched.map((m) => m.scheme)

    return schemes.slice(0, 3)
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed right-5 bottom-5 z-60 bg-indigo-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center"
      >
        {open ? "✕" : "💬"}
      </button>

      {open && (
        <div className="fixed right-5 bottom-20 z-60">
          <div className="w-[360px] h-[520px] bg-white rounded-xl shadow-xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900 text-white">
              <div className="font-semibold">JannConnect</div>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`${m.sender === "user" ? "bg-gray-200 text-black" : "bg-indigo-600 text-white"} max-w-[85%] px-4 py-2 rounded-lg`}
                  >
                    {m.text === "__typing__" ? "Processing..." : m.text}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            <div className="p-3 border-t bg-white flex items-center gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 rounded-md border border-gray-300"
              />

              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className={`px-4 py-2 rounded-md text-white ${
                  input.trim() ? "bg-indigo-600" : "bg-indigo-300"
                }`}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
