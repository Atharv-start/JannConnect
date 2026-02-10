 import React, { useEffect, useRef, useState } from "react"
import { useLanguage } from "../context/LanguageContext"
import { getAllSchemes } from "../services/schemesService"
import { useNavigate } from "react-router-dom"

export default function Chatbot() {
const { t, lang } = useLanguage()
const navigate = useNavigate()

const [open, setOpen] = useState(false)
const [input, setInput] = useState("")
const [messages, setMessages] = useState([])
const [schemes, setSchemes] = useState([])

// Eligibility flow state
const [eligibilityMode, setEligibilityMode] = useState(false)
const [eligibilityData, setEligibilityData] = useState({})
const [eligibilityStep, setEligibilityStep] = useState(null)

// Voice states
const [listening, setListening] = useState(false)
const [micEnabled, setMicEnabled] = useState(() => {
try {
return localStorage.getItem("chatbot.micEnabled") === "true"
} catch {
return false
}
})

const endRef = useRef(null)
const recognitionRef = useRef(null)

// Load schemes from Firebase
useEffect(() => {
async function loadSchemes() {
try {
const data = await getAllSchemes()
setSchemes(data || [])
} catch (e) {
console.error("Failed to load schemes", e)
}
}
loadSchemes()
}, [])

useEffect(() => {
if (endRef.current) {
endRef.current.scrollIntoView({ behavior: "smooth" })
}
}, [messages])

useEffect(() => {
try {
localStorage.setItem(
"chatbot.micEnabled",
micEnabled ? "true" : "false"
)
} catch {}
}, [micEnabled])

function appendMessage(msg) {
setMessages((m) => [...m, msg])
}

function showSchemeCards(results) {
appendMessage({
sender: "bot",
type: "cards",
schemes: results.slice(0, 5),
})
}

function filterByEligibility(data) {
return schemes.filter((s) => {
const e = s.eligibility || {}


  // Age filter
  if (data.age) {
    const min = e.minAge ?? 0
    const max = e.maxAge ?? 120
    if (data.age < min || data.age > max) return false
  }

  // Gender filter
  if (data.gender && e.gender) {
    if (e.gender.toLowerCase() !== data.gender) {
      return false
    }
  }

  // Category filter
  if (data.category) {
    if (
      !(s.category || []).some((c) =>
        c.toLowerCase().includes(data.category)
      )
    ) {
      return false
    }
  }

  return true
})


}

function createRecognition() {
if (recognitionRef.current) return recognitionRef.current


const SpeechRecognition =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition

  if (!SpeechRecognition) return null

const r = new SpeechRecognition()
r.continuous = true
r.interimResults = false
r.maxAlternatives = 1
  r.lang = lang === "hi" ? "hi-IN" : "en-IN"

r.onresult = (e) => {
  const results = []
  for (let i = e.resultIndex; i < e.results.length; i++) {
    const alt = e.results[i][0]
    if (alt && alt.transcript)
      results.push(alt.transcript)
  }
  const text = results.join(" ")
  if (text)
    setInput((prev) =>
      prev ? prev + " " + text : text
    )
}

r.onerror = () => setListening(false)
r.onend = () => setListening(false)

recognitionRef.current = r
return r


}

function startRecognition() {
const r = createRecognition()
if (!r) return
try {
setListening(true)
r.start()
} catch {
setListening(false)
}
}

function stopRecognition() {
const r = recognitionRef.current
if (!r) return
try {
r.stop()
setListening(false)
} catch {
setListening(false)
}
}

function toggleListen() {
if (!micEnabled) {
setMicEnabled(true)
return
}
if (listening) stopRecognition()
else startRecognition()
}

async function handleSend() {
const text = input.trim()
if (!text) return


appendMessage({ sender: "user", text })
setInput("")

// Eligibility conversation
if (eligibilityMode) {
  if (eligibilityStep === "age") {
    const age = parseInt(text)
    if (isNaN(age)) {
      appendMessage({ sender: "bot", text: t.chatbotInvalidAge })
      return
    }

    setEligibilityData((d) => ({ ...d, age }))
    setEligibilityStep("gender")
    appendMessage({ sender: "bot", text: t.chatbotAskGender })
    return
  }

  if (eligibilityStep === "gender") {
    const gender = text.toLowerCase()
    const data = { ...eligibilityData, gender }

    setEligibilityMode(false)
    setEligibilityStep(null)

    const results = filterByEligibility(data)

    if (results.length === 0) {
      appendMessage({ sender: "bot", text: t.chatbotNoSchemes })
    } else {
      appendMessage({ sender: "bot", text: t.chatbotSchemesIntro })
      showSchemeCards(results)
    }
    return
  }
}

// Detect scheme request
const low = text.toLowerCase()

let category = null
if (low.includes("employment")) category = "employment"
else if (low.includes("education")) category = "education"
else if (low.includes("health")) category = "health"
else if (low.includes("agriculture")) category = "agriculture"
else if (low.includes("finance")) category = "finance"

if (category) {
  setEligibilityMode(true)
  setEligibilityStep("age")
  setEligibilityData({ category })

  appendMessage({
    sender: "bot",
    text: "Sure. Let’s check your eligibility. What is your age?",
  })
  return
}

  appendMessage({ sender: "bot", text: t.chatbotPrompt })


}

function handleKeyDown(e) {
if (e.key === "Enter" && !e.shiftKey) {
e.preventDefault()
handleSend()
}
}

return (
<>
{/* Floating button */}
<button
aria-label={open ? "Close chat" : "Open chat"}
onClick={() => setOpen((v) => !v)}
className="fixed right-5 bottom-5 z-60 bg-indigo-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center"
>
{open ? "✕" : "💬"} </button>

```
  {open && (
    <div className="fixed right-5 bottom-20 z-60">
      <div className="w-[360px] h-[520px] bg-white text-black rounded-xl shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 text-white">
          <div className="font-semibold">
            JannConnect
          </div>
          <button onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
          {messages.map((m, i) => {
            if (m.type === "cards") {
              return (
                <div key={i} className="space-y-3">
                  {m.schemes.map((s) => (
                    <div
                      key={s.id}
                      className="border rounded-lg p-3 bg-white shadow-sm"
                    >
                      <h3 className="font-semibold">
                        {s.name}
                      </h3>
                      <p className="text-sm">
                        {s.simpleExplanation?.[lang] ||
                          s.simpleExplanation?.en}
                      </p>

                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() =>
                            navigate(`/scheme/${s.id}`)
                          }
                          className="px-3 py-1 border rounded"
                        >
                          View
                        </button>

                        {s.applyLink && (
                          <button
                            onClick={() =>
                              window.open(
                                s.applyLink,
                                "_blank"
                              )
                            }
                            className="px-3 py-1 bg-green-500 text-black rounded"
                          >
                            Apply
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )
            }

            return (
              <div
                key={i}
                className={`flex ${
                  m.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`${
                    m.sender === "user"
                      ? "bg-gray-200"
                      : "bg-indigo-600 text-white"
                  } max-w-[85%] px-4 py-2 rounded-lg`}
                >
                  {m.text}
                </div>
              </div>
            )
          })}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t bg-white flex items-center gap-2">
          <textarea
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            className="flex-1 px-3 py-2 rounded-md border border-gray-300 resize-none h-10 text-black bg-white"
          />

          <button
            onClick={toggleListen}
            className="p-2 border rounded"
          >
            {listening ? "●" : "🎤"}
          </button>

          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className={`px-4 py-2 rounded-md text-white ${
              input.trim()
                ? "bg-indigo-600"
                : "bg-indigo-300"
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
