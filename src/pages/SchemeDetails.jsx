import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useLanguage } from "../context/LanguageContext"
import { getSchemeById } from "../services/schemesService"

export default function SchemeDetails() {
  const { id } = useParams()
  const { lang, t } = useLanguage()

  const [scheme, setScheme] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [isSpeaking, setIsSpeaking] = useState(false)

  // Stop speech when tab changes
  useEffect(() => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
    }
    setIsSpeaking(false)
  }, [activeTab])

  // Fetch scheme from Firebase
  useEffect(() => {
    async function fetchScheme() {
      const data = await getSchemeById(id)
      setScheme(data)
      setLoading(false)
    }
    fetchScheme()
  }, [id])

  // Text-to-Speech
  function speakText(text) {
    if (!("speechSynthesis" in window)) {
      alert("Text-to-speech not supported in this browser.")
      return
    }

    if (!text) return

    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      return
    }

    const utterance = new SpeechSynthesisUtterance(text)

    if (lang === "hi") utterance.lang = "hi-IN"
    else utterance.lang = "en-IN"

    utterance.rate = 1
    utterance.pitch = 1

    utterance.onend = () => setIsSpeaking(false)

    setIsSpeaking(true)
    window.speechSynthesis.speak(utterance)
  }

  if (loading) return <p>Loading scheme…</p>
  if (!scheme) return <p>Scheme not found</p>

  // Tabs
  const tabs = [
    { key: "overview", label: t.overview },
    { key: "benefits", label: t.benefits },
    { key: "eligibility", label: t.eligibility },
    { key: "documents", label: t.documents },
    { key: "steps", label: t.howToApply },
  ]

  // Read-aloud content
  let readAloudText = ""

  if (activeTab === "overview") {
    readAloudText = scheme.simpleExplanation?.[lang] || scheme.simpleExplanation?.en || ""
  }

  if (activeTab === "benefits") {
    readAloudText = scheme.benefits?.[lang] || scheme.benefits?.en || ""
  }

  if (activeTab === "eligibility") {
    const eligData = scheme.eligibility?.[lang] || scheme.eligibility?.en || scheme.eligibility || {}
    readAloudText = Object.entries(eligData)
      .map(([k, v]) => `${k}: ${v}`)
      .join(". ")
  }

  if (activeTab === "documents") {
    const docsArray = Array.isArray(scheme.documentsRequired)
      ? scheme.documentsRequired
      : scheme.documentsRequired?.[lang] || scheme.documentsRequired?.en || []
    readAloudText = docsArray?.join(". ") || ""
  }

  if (activeTab === "steps") {
    const stepsArray = Array.isArray(scheme.applicationProcess)
      ? scheme.applicationProcess
      : scheme.applicationProcess?.[lang] || scheme.applicationProcess?.en || []
    readAloudText = stepsArray?.join(". ") || ""
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold">{scheme.name}</h1>

      <p className="text-gray-500 mt-2">
        {scheme.states?.join(", ") || "All India"}
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mt-8">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded ${
              activeTab === tab.key
                ? "bg-green-500 text-black"
                : "border"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Box */}
      <div className="mt-8 border rounded-xl p-6">

        {/* Read Aloud Button */}
        <button
          onClick={() => speakText(readAloudText)}
          className="mb-4 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700"
        >
          {isSpeaking ? "⏹ Stop Reading" : "🔊 Read Aloud"}
        </button>

        {activeTab === "overview" && (
          <p>
            {scheme.simpleExplanation?.[lang] ||
              "No overview available."}
          </p>
        )}

        {activeTab === "benefits" && (
          <p>
            {scheme.benefits?.[lang] || scheme.benefits?.en || t.noBenefits}
          </p>
        )}

        {activeTab === "eligibility" && (
          <ul className="list-disc ml-6">
            {(() => {
              const eligData = scheme.eligibility?.[lang] || scheme.eligibility?.en || scheme.eligibility || {}
              return Object.keys(eligData).length ? (
                Object.entries(eligData).map(
                  ([k, v], i) => (
                    <li key={i}>
                      <strong>{k}:</strong> {v}
                    </li>
                  )
                )
              ) : (
                <li>{t.noEligibility}</li>
              )
            })()}
          </ul>
        )}

        {activeTab === "documents" && (
          <ul className="list-disc ml-6">
            {(() => {
              const docsArray = Array.isArray(scheme.documentsRequired)
                ? scheme.documentsRequired
                : scheme.documentsRequired?.[lang] || scheme.documentsRequired?.en || []
              return docsArray?.length
                ? docsArray.map(
                    (d, i) => <li key={i}>{d}</li>
                  )
                : (
                <p>{t.noDocuments}</p>
              )
            })()}
          </ul>
        )}

        {activeTab === "steps" && (
          <ol className="list-decimal ml-6">
            {(() => {
              const stepsArray = Array.isArray(scheme.applicationProcess)
                ? scheme.applicationProcess
                : scheme.applicationProcess?.[lang] || scheme.applicationProcess?.en || []
              return stepsArray?.length
                ? stepsArray.map(
                    (s, i) => <li key={i}>{s}</li>
                  )
                : (
                <p>No application steps available.</p>
              )
            })()}
          </ol>
        )}
      </div>

      {scheme.applyLink && (
        <button
          onClick={() => window.open(scheme.applyLink, "_blank")}
          className="mt-10 px-6 py-3 bg-green-500 text-black rounded font-semibold"
        >
          {t.applyNow}
        </button>
      )}
    </section>
  )
}
