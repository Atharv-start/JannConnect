import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"
import { useAccessibility } from "../context/AccessibilityContext"
import FilterPanel from "../components/FilterPanel"
import { getAllSchemes } from "../services/schemesService"

export default function SearchResults() {
  const navigate = useNavigate()
  const { t, lang } = useLanguage()
  const { setIsOverlayOpen } = useAccessibility()

  const [schemes, setSchemes] = useState([])
  const [loading, setLoading] = useState(true)

  const [filterOpen, setFilterOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const [searchParams] = useSearchParams()
  const categoryParam = searchParams.get("category")
  const ageParam = searchParams.get("age")
  const incomeParam = searchParams.get("income")
  const genderParam = searchParams.get("gender")
  const stateParam = searchParams.get("state")

  useEffect(() => {
    async function fetchSchemes() {
      const data = await getAllSchemes()
      setSchemes(data)
      setLoading(false)
    }
    fetchSchemes()
  }, [])

  if (loading) {
    return <p className="p-6">Loading schemes…</p>
  }

  const filteredSchemes =
    (activeTab === "all"
      ? schemes
      : schemes.filter(
          s =>
            s.type &&
            s.type.toLowerCase() === activeTab
        )
    ).filter(s => {
      // CATEGORY FILTER
      if (categoryParam) {
        if (
          !(s.category || []).some(c =>
            c.toLowerCase().includes(categoryParam.toLowerCase())
          )
        ) {
          return false
        }
      }

      // STATE FILTER
      if (stateParam && stateParam !== "All") {
        if (
          !(s.states || []).includes("All") &&
          !(s.states || []).includes(stateParam)
        ) {
          return false
        }
      }

      // AGE FILTER
      if (ageParam) {
        const age = parseInt(ageParam)
        const e = s.eligibility || {}
        const min = e.minAge ?? 0
        const max = e.maxAge ?? 120
        if (age < min || age > max) return false
      }

      // INCOME FILTER
      if (incomeParam) {
        const income = parseInt(incomeParam)
        const maxIncome = s.eligibility?.maxIncome
        if (maxIncome && income > maxIncome) return false
      }

      // GENDER FILTER
      if (genderParam) {
        const g = s.eligibility?.gender
        if (g && g.toLowerCase() !== genderParam.toLowerCase()) {
          return false
        }
      }

      return true
    })

  return (
    <section className="max-w-7xl mx-auto px-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold">
          {t.searchResults}
        </h1>

        <button
          onClick={() => {
            setFilterOpen(true)
            setIsOverlayOpen(true)
          }}
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
            className="bg-white dark:bg-slate-900 border rounded-xl p-6"
          >
            {scheme.imageUrl && (
              <img
                src={scheme.imageUrl}
                alt={scheme.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}

            <h2 className="text-2xl font-semibold">
              {scheme.name}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {scheme.states?.join(", ") || "All India"}
            </p>

            <p className="mt-3">
              {scheme.simpleExplanation?.[lang] ||
                scheme.simpleExplanation?.en}
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() =>
                  navigate(`/scheme/${scheme.id}`)
                }
                className="px-4 py-2 border rounded"
              >
                {t.overview}
              </button>

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
          </article>
        ))}
      </div>

      {/* Filter Panel */}
      {filterOpen && (
        <FilterPanel
          onClose={() => {
            setFilterOpen(false)
            setIsOverlayOpen(false)
          }}
        />
      )}
    </section>
  )
}
