import { useParams } from "react-router-dom"
import { useState } from "react"
import schemes from "../data/schemes"
import { useLanguage } from "../context/LanguageContext"

export default function SchemeDetails() {
  const { id } = useParams()
  const { t, lang } = useLanguage()

  const scheme = schemes.find(s => s.id === id)
  const [activeTab, setActiveTab] = useState("overview")

  if (!scheme) return <p>Scheme not found</p>

  const tabs = [
    { key: "overview", label: t.overview },
    { key: "benefits", label: t.benefits },
    { key: "eligibility", label: t.eligibility },
    { key: "documents", label: t.documents },
    { key: "steps", label: t.howToApply },
  ]

  return (
    <section className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold">
        {scheme.name}
      </h1>

      <p className="text-gray-500 dark:text-white/60 mt-2">
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
                : "border border-gray-300 dark:border-white/20"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div
        className="
          mt-8
          bg-white dark:bg-slate-900
          text-gray-800 dark:text-white/80
          border border-gray-200 dark:border-white/10
          rounded-xl p-6
        "
      >
        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <p>
            {scheme.simpleExplanation?.[lang] ||
              "No overview available."}
          </p>
        )}

        {/* BENEFITS */}
        {activeTab === "benefits" && (
          <p>
            {lang === "hi"
              ? "लाभ: " + scheme.benefits
              : scheme.benefits}
          </p>
        )}

        {/* ELIGIBILITY */}
        {activeTab === "eligibility" && (
          <ul className="list-disc ml-6">
            {scheme.eligibility &&
            Object.keys(scheme.eligibility).length > 0 ? (
              Object.entries(scheme.eligibility).map(
                ([key, value], i) => (
                  <li key={i}>
                    <strong>
                      {lang === "hi" ? "शर्त" : key}:
                    </strong>{" "}
                    {Array.isArray(value)
                      ? value.join(", ")
                      : value}
                  </li>
                )
              )
            ) : (
              <li>
                {lang === "hi"
                  ? "कोई पात्रता शर्त नहीं"
                  : "No eligibility conditions"}
              </li>
            )}
          </ul>
        )}

        {/* DOCUMENTS */}
        {activeTab === "documents" && (
          <ul className="list-disc ml-6">
            {scheme.documentsRequired?.length ? (
              scheme.documentsRequired.map((doc, i) => (
                <li key={i}>
                  {lang === "hi"
                    ? "दस्तावेज़: " + doc
                    : doc}
                </li>
              ))
            ) : (
              <li>
                {lang === "hi"
                  ? "कोई दस्तावेज़ आवश्यक नहीं"
                  : "No documents required"}
              </li>
            )}
          </ul>
        )}

        {/* STEPS */}
        {activeTab === "steps" && (
          <ol className="list-decimal ml-6">
            {scheme.applicationProcess?.length ? (
              scheme.applicationProcess.map((step, i) => (
                <li key={i}>
                  {lang === "hi"
                    ? "चरण " + (i + 1) + ": " + step
                    : step}
                </li>
              ))
            ) : (
              <li>
                {lang === "hi"
                  ? "कोई प्रक्रिया उपलब्ध नहीं"
                  : "No steps available"}
              </li>
            )}
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
