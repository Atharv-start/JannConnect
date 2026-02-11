import { useEffect, useState, useMemo } from "react"
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

  // FILTER STATE - Using useState for reactive filtering
  const [filters, setFilters] = useState({
    age: "",
    income: "",
    gender: "",
    state: "",
  })

  const [searchParams] = useSearchParams()
  const queryParam = searchParams.get("q")
  const categoryParam = searchParams.get("category")

  useEffect(() => {
    async function fetchSchemes() {
      const data = await getAllSchemes()
      setSchemes(data)
      setLoading(false)
    }
    fetchSchemes()
  }, [])

  // APPLY ALL FILTERS - Memoized filtering with strict rules
  // This must be BEFORE any conditional returns to follow Rules of Hooks
  const filteredSchemes = useMemo(() => {
    return schemes
      // Filter by scheme type (tab)
      .filter(s => {
        if (activeTab === "all") return true
        return s.type && s.type.toLowerCase() === activeTab
      })
      // Apply all filter conditions
      .filter(s => {
        // TEXT SEARCH FILTER
        if (queryParam) {
          const q = queryParam.toLowerCase()
          const nameMatch = s.name?.toLowerCase().includes(q)
          const categoryMatch = (s.category || []).some(c =>
            c.toLowerCase().includes(q)
          )
          const descMatch =
            s.simpleExplanation?.en?.toLowerCase().includes(q) ||
            s.simpleExplanation?.[lang]?.toLowerCase().includes(q)

          if (!nameMatch && !categoryMatch && !descMatch) {
            return false
          }
        }

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

        // STATE FILTER - Apply only when state is selected
        if (filters.state) {
          const states = s.states || []
          // Exclude nationwide schemes when a specific state is selected
          if (states.length === 1 && states[0].toLowerCase() === "all") {
            return false
          }
          // Include only if selected state is in the scheme's states array (case-insensitive)
          const selectedStateLower = filters.state.toLowerCase()
          const hasState = states.some(st => st.toLowerCase() === selectedStateLower)
          if (!hasState) {
            return false
          }
        }

        // AGE FILTER - Apply only when age is provided
        if (filters.age) {
          const userAge = parseInt(filters.age, 10)
          if (!isNaN(userAge)) {
            const eligibility = s.eligibility || {}
            const minAge = eligibility.minAge ?? 0
            const maxAge = eligibility.maxAge ?? 120
            // Exclude if age is outside eligibility range
            if (userAge < minAge || userAge > maxAge) {
              return false
            }
          }
        }

        // INCOME FILTER - Apply only when income is provided
        if (filters.income) {
          const userIncome = parseInt(filters.income, 10)
          if (!isNaN(userIncome)) {
            const maxIncome = s.eligibility?.maxIncome
            // Only filter if scheme specifies a max income constraint
            if (maxIncome && userIncome > maxIncome) {
              return false
            }
          }
        }

        // GENDER FILTER - Apply only when gender is selected
        if (filters.gender) {
          const schemeGender = s.eligibility?.gender
          // Include only if gender requirement exists and matches exactly
          if (!schemeGender || schemeGender.toLowerCase() !== filters.gender.toLowerCase()) {
            return false
          }
        }

        return true
      })
  }, [schemes, filters, activeTab, queryParam, categoryParam, lang])

  if (loading) {
    return <p className="p-6">Loading schemes…</p>
  }

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
          filters={filters}
          onFilterChange={(key, value) =>
            setFilters(prev => ({ ...prev, [key]: value }))
          }
          onClearFilters={() =>
            setFilters({
              age: "",
              income: "",
              gender: "",
              state: "",
            })
          }
          onClose={() => {
            setFilterOpen(false)
            setIsOverlayOpen(false)
          }}
        />
      )}
    </section>
  )
}
