import { useNavigate, useSearchParams } from "react-router-dom"

export default function FilterPanel({ onClose }) {
  const navigate = useNavigate()
  const [params] = useSearchParams()

  function applyFilters(e) {
    e.preventDefault()
    const form = e.target
    const query = new URLSearchParams()

    if (form.age.value) query.set("age", form.age.value)
    if (form.income.value) query.set("income", form.income.value)
    if (form.gender.value) query.set("gender", form.gender.value)
    if (form.state.value) query.set("state", form.state.value)

    const queryString = query.toString()

    // Save filters
    localStorage.setItem("lastFilters", queryString)

    navigate(`/search?${queryString}`)

    // scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" })

    onClose()
  }

  function clearFilters() {
    localStorage.removeItem("lastFilters")
    navigate("/search")
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
      <div className="w-full max-w-sm bg-slate-900 h-full p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Filters</h2>
          <button onClick={onClose} className="text-xl">✕</button>
        </div>

        <form onSubmit={applyFilters} className="space-y-4">
          {/* Age */}
          <input
            name="age"
            placeholder="Age"
            defaultValue={params.get("age") || ""}
            className="w-full px-3 py-2 rounded bg-slate-800"
          />

          {/* Income */}
          <input
            name="income"
            placeholder="Annual Income (₹)"
            defaultValue={params.get("income") || ""}
            className="w-full px-3 py-2 rounded bg-slate-800"
          />

          {/* Gender */}
          <select
            name="gender"
            defaultValue={params.get("gender") || ""}
            className="w-full px-3 py-2 rounded bg-slate-800"
          >
            <option value="">Any Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          {/* State */}
          <select
            name="state"
            defaultValue={params.get("state") || ""}
            className="w-full px-3 py-2 rounded bg-slate-800"
          >
            <option value="">All India (Central Schemes)</option>
            <option value="All">All</option>
            <option value="Delhi">Delhi</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Puducherry">Puducherry</option>
            <option value="Jammu & Kashmir">Jammu & Kashmir</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Meghalaya">Meghalaya</option>
          </select>

          {/* Apply */}
          <button className="w-full bg-green-500 text-black py-2 rounded font-semibold">
            Apply Filters
          </button>

          {/* Clear */}
          <button
            type="button"
            onClick={clearFilters}
            className="w-full border border-white/20 py-2 rounded"
          >
            Clear All Filters
          </button>
        </form>
      </div>
    </div>
  )
}
