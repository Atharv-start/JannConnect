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
      alert(t?.ttsNotSupported || "Text-to-speech not supported in this browser.")
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

  if (loading) return <p className="text-center py-8">{t?.loadingSchemes || "Loading schemes…"}</p>
  if (!scheme) return <p className="text-center py-8">{t?.schemeNotFound || "Scheme not found"}</p>

  // Tabs with safe fallbacks
  const tabs = [
    { key: "overview", label: t?.overview || "Overview" },
    { key: "benefits", label: t?.benefits || "Benefits" },
    { key: "eligibility", label: t?.eligibility || "Eligibility" },
    { key: "documents", label: t?.documents || "Documents" },
    { key: "steps", label: t?.howToApply || "How to Apply" },
  ]

  // Read-aloud content
  let readAloudText = ""

  if (activeTab === "overview") {
    readAloudText = scheme.simpleExplanation?.[lang] || ""
  }

  if (activeTab === "benefits") {
    readAloudText = scheme.benefits || ""
  }

  if (activeTab === "eligibility") {
    readAloudText = scheme.eligibility
      ? Object.entries(scheme.eligibility)
          .map(([k, v]) => `${k}: ${v}`)
          .join(". ")
      : ""
  }

  if (activeTab === "documents") {
    readAloudText = scheme.documentsRequired?.join(". ") || ""
  }

  if (activeTab === "steps") {
    readAloudText = scheme.applicationProcess?.join(". ") || ""
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{scheme.name}</h1>

      <p className="text-gray-500 dark:text-gray-400 mt-2">
        {scheme.states?.join(", ") || t?.allIndia || "All India"}
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mt-8">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded transition ${
              activeTab === tab.key
                ? "bg-green-500 text-black font-semibold"
                : "border border-gray-300 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/10"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Box */}
      <div className="mt-8 border border-gray-300 dark:border-white/10 rounded-xl p-6 bg-white dark:bg-slate-900">

        {/* Read Aloud Button */}
        <button
          onClick={() => speakText(readAloudText)}
          className="mb-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium transition"
        >
          {isSpeaking ? (t?.stopReading || "Stop Reading") : (t?.readAloud || "Read Aloud")}
        </button>

        {/* Content */}
        <div className="text-gray-900 dark:text-white space-y-4">
          {activeTab === "overview" && (
            <p className="leading-relaxed">
              {scheme.simpleExplanation?.[lang] || t?.noOverview || "No overview available"}
            </p>
          )}

          {activeTab === "benefits" && (
            <p className="leading-relaxed">
              {scheme.benefits || t?.noBenefits || "No benefits information available"}
            </p>
          )}

          {activeTab === "eligibility" && (
            <div className="space-y-2">
              {scheme.eligibility && Object.keys(scheme.eligibility).length > 0 ? (
                Object.entries(scheme.eligibility).map(([key, value]) => (
                  <p key={key} className="flex justify-between">
                    <strong className="capitalize">{key}:</strong>
                    <span>{value}</span>
                  </p>
                ))
              ) : (
                <p>{t?.noEligibility || "No eligibility conditions"}</p>
              )}
            </div>
          )}

          {activeTab === "documents" && (
            <div>
              {scheme.documentsRequired && scheme.documentsRequired.length > 0 ? (
                <ul className="list-disc list-inside space-y-1">
                  {scheme.documentsRequired.map((doc, i) => (
                    <li key={i} className="ml-4">{doc}</li>
                  ))}
                </ul>
              ) : (
                <p>{t?.noDocuments || "No documents required"}</p>
              )}
            </div>
          )}

          {activeTab === "steps" && (
            <div>
              {scheme.applicationProcess && scheme.applicationProcess.length > 0 ? (
                <ol className="list-decimal list-inside space-y-2">
                  {scheme.applicationProcess.map((step, i) => (
                    <li key={i} className="ml-4">{step}</li>
                  ))}
                </ol>
              ) : (
                <p>{t?.noSteps || "No application steps available."}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Apply Button */}
      {scheme.applyLink && (
        <a
          href={scheme.applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block px-6 py-3 bg-green-500 hover:bg-green-600 text-black rounded font-semibold transition"
        >
          {t?.applyNow || "Apply on Official Website"}
        </a>
      )}
    </section>
  )
}
