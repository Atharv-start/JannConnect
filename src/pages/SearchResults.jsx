import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"
import schemes from "../data/schemes"
import FilterPanel from "../components/FilterPanel"

export default function SearchResults() {
  const navigate = useNavigate()
  const { t, lang } = useLanguage()
  const [filterOpen, setFilterOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  // Read category from URL
  const [searchParams] = useSearchParams()
  const categoryParam = searchParams.get("category")

  // Filter logic
  const filteredSchemes =
    (activeTab === "all"
      ? schemes
      : schemes.filter(
          s => s.type && s.type.toLowerCase() === activeTab
        )
    ).filter(s => {
      if (!categoryParam) return true
      if (!s.targetGroup) return true
      return s.targetGroup.includes(
        categoryParam.toLowerCase()
      )
    })

  return (
    <section className="max-w-7xl mx-auto px-6 pb-24">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold">
          {t.searchResults}
        </h1>

        <button
          onClick={() => setFilterOpen(true)}
          className="px-4 py-2 border border-gray-300 dark:border-white/20 rounded"
        >
          {t.filters}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        {["all", "government", "ngo"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${
              activeTab === tab
                ? "bg-green-500 text-black"
                : "border border-gray-300 dark:border-white/20"
            }`}
          >
            {t[tab]}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="grid gap-8">
        {filteredSchemes.map(scheme => (
          <article
            key={scheme.id}
            className="
              bg-white dark:bg-slate-900
              text-gray-800 dark:text-white
              border border-gray-200 dark:border-white/10
              rounded-xl overflow-hidden
              shadow-sm
            "
          >
            {scheme.image && (
              <img
                src={scheme.image}
                alt={scheme.name}
                className="w-full h-48 object-cover"
              />
            )}

            <div className="p-6">
              <h2 className="text-2xl font-semibold">
                {scheme.name}
              </h2>

              <p className="text-sm text-gray-500 dark:text-white/60 mt-1">
                {scheme.states?.join(", ") || "All India"}
              </p>

              <p className="mt-3 text-gray-700 dark:text-white/70">
                {scheme.simpleExplanation?.[lang] ||
                  scheme.simpleExplanation?.en}
              </p>

              <div className="mt-6 flex gap-3">
                {/* View Details */}
                <button
                  onClick={() =>
                    navigate(`/scheme/${scheme.id}`)
                  }
                  className="
                    px-4 py-2
                    border border-gray-300 dark:border-white/20
                    rounded
                  "
                >
                  {t.overview}
                </button>

                {/* Apply Now */}
                {scheme.applyLink && (
                  <button
                    onClick={() =>
                      window.open(
                        scheme.applyLink,
                        "_blank"
                      )
                    }
                    className="px-4 py-2 bg-green-500 text-black rounded"
                  >
                    {t.applyNow}
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {filterOpen && (
        <FilterPanel
          onClose={() => setFilterOpen(false)}
        />
      )}
    </section>
  )
}
