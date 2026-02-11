import { useNavigate, useSearchParams } from "react-router-dom"

export default function FilterPanel({
  filters,
  onFilterChange,
  onClearFilters,
  onClose,
}) {
  const navigate = useNavigate()
  const [params] = useSearchParams()

  function applyFilters(e) {
    e.preventDefault()
    // Filters are already applied in real-time via state
    // Just close the panel
    onClose()
  }

  function handleClearFilters() {
    onClearFilters()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
      <div className="w-full max-w-sm bg-slate-900 h-full p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Filters</h2>
          <button onClick={onClose} className="text-xl">
            ✕
          </button>
        </div>

        <form onSubmit={applyFilters} className="space-y-4">
          {/* Age */}
          <div>
            <label className="block text-sm mb-1">Age</label>
            <input
              type="number"
              placeholder="Enter age"
              value={filters.age}
              onChange={e => {
                console.log("🔍 FILTER UPDATE - Age:", e.target.value)
                onFilterChange("age", e.target.value)
              }}
              className="w-full px-3 py-2 rounded bg-slate-800 text-white"
            />
          </div>

          {/* Income */}
          <div>
            <label className="block text-sm mb-1">
              Annual Income (₹)
            </label>
            <input
              type="number"
              placeholder="Enter income"
              value={filters.income}
              onChange={e => {
                console.log("🔍 FILTER UPDATE - Income:", e.target.value)
                onFilterChange("income", e.target.value)
              }}
              className="w-full px-3 py-2 rounded bg-slate-800 text-white"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm mb-1">Gender</label>
            <select
              value={filters.gender}
              onChange={e => {
                console.log("🔍 FILTER UPDATE - Gender:", e.target.value)
                onFilterChange("gender", e.target.value)
              }}
              className="w-full px-3 py-2 rounded bg-slate-800 text-white"
            >
              <option value="">Any Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>

          {/* State */}
          <div>
            <label className="block text-sm mb-1">
              State / Coverage
            </label>
            <select
              value={filters.state}
              onChange={e => {
                console.log("🔍 FILTER UPDATE - State:", e.target.value)
                onFilterChange("state", e.target.value)
              }}
              className="w-full px-3 py-2 rounded bg-slate-800 text-white"
            >
              <option value="">All India (Central Schemes)</option>
              <option value="All">All</option>
              <option value="Delhi">Delhi</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Puducherry">Puducherry</option>
              <option value="Jammu and Kashmir">Jammu and Kashmir</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Meghalaya">Meghalaya</option>
            </select>
          </div>

          {/* Apply */}
          <button
            type="submit"
            className="w-full bg-green-500 text-black py-2 rounded font-semibold"
          >
            Apply Filters
          </button>

          {/* Clear */}
          <button
            type="button"
            onClick={handleClearFilters}
            className="w-full border border-white/20 py-2 rounded"
          >
            Clear All Filters
          </button>
        </form>
      </div>
    </div>
  )
}
