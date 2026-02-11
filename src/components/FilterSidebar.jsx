import { useSearchParams } from "react-router-dom"

export default function FilterSidebar() {
  const [params, setParams] = useSearchParams()

  function updateParam(key, value) {
    const newParams = new URLSearchParams(params)
    if (value === "") {
      newParams.delete(key)
    } else {
      newParams.set(key, value)
    }
    setParams(newParams)
  }

  return (
    <aside className="w-full md:w-64 bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-lg p-6 text-gray-900 dark:text-white">
      <h2 className="text-lg font-semibold mb-4">
        Filters
      </h2>

      {/* Age */}
      <div className="mb-4">
        <label className="block text-sm mb-1">
          Age
        </label>
        <input
          type="number"
          placeholder="Enter age"
          value={params.get("age") || ""}
          onChange={e => updateParam("age", e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white"
        />
      </div>

      {/* Income */}
      <div className="mb-4">
        <label className="block text-sm mb-1">
          Annual Income (₹)
        </label>
        <input
          type="number"
          placeholder="Enter income"
          value={params.get("income") || ""}
          onChange={e => updateParam("income", e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white"
        />
      </div>

      {/* Gender */}
      <div className="mb-4">
        <label className="block text-sm mb-1">
          Gender
        </label>
        <select
          value={params.get("gender") || ""}
          onChange={e => updateParam("gender", e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white"
        >
          <option value="">Any</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      {/* State */}
      <div>
        <label className="block text-sm mb-1">
          State / Coverage
        </label>
        <select
          value={params.get("state") || ""}
          onChange={e => updateParam("state", e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white"
        >
          <option value="">All</option>
          <option value="All India">
            All India (Central Schemes)
          </option>
          <option value="Delhi">Delhi</option>
          <option value="Sikkim">Sikkim</option>
          <option value="Puducherry">Puducherry</option>
          <option value="Jammu and Kashmir">
            Jammu & Kashmir
          </option>
          <option value="Gujarat">Gujarat</option>
          <option value="Meghalaya">Meghalaya</option>
        </select>
      </div>
    </aside>
  )
}
