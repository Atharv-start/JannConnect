import { useNavigate } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"

export default function FilterPanel({
  filters,
  onFilterChange,
  onClearFilters,
  onClose,
}) {
  const { t } = useLanguage()
  const navigate = useNavigate()

  function applyFilters(e) {
    e.preventDefault()
    onClose()
  }

  function handleClearFilters() {
    onClearFilters()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
      <div className="w-full max-w-sm bg-white dark:bg-slate-900 h-full p-6 overflow-y-auto text-gray-900 dark:text-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {t.filters}
          </h2>
          <button onClick={onClose} className="text-xl">
            ✕
          </button>
        </div>

        <form onSubmit={applyFilters} className="space-y-4">
          {/* Age */}
          <div>
            <label className="block text-sm mb-1">
              {t.age}
            </label>
            <input
              type="number"
              placeholder={t.enterAge}
              value={filters.age}
              onChange={e =>
                onFilterChange("age", e.target.value)
              }
              className="w-full px-3 py-2 rounded bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white"
            />
          </div>

          {/* Income */}
          <div>
            <label className="block text-sm mb-1">
              {t.annualIncome}
            </label>
            <input
              type="number"
              placeholder={t.enterIncome}
              value={filters.income}
              onChange={e =>
                onFilterChange("income", e.target.value)
              }
              className="w-full px-3 py-2 rounded bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm mb-1">
              {t.gender}
            </label>
            <select
              value={filters.gender}
              onChange={e =>
                onFilterChange("gender", e.target.value)
              }
              className="w-full px-3 py-2 rounded bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white"
            >
              <option value="">{t.anyGender}</option>
              <option value="female">{t.female}</option>
              <option value="male">{t.male}</option>
            </select>
          </div>

          {/* State */}
          <div>
            <label className="block text-sm mb-1">
              {t.statesUTs}
            </label>
            <select
              value={filters.state}
              onChange={e =>
                onFilterChange("state", e.target.value)
              }
              className="w-full px-3 py-2 rounded bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white"
            >
              <option value="">
                {t.allIndiaCentral}
              </option>
              <option value="Delhi">Delhi</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Puducherry">Puducherry</option>
              <option value="Jammu and Kashmir">
                Jammu and Kashmir
              </option>
              <option value="Gujarat">Gujarat</option>
              <option value="Meghalaya">Meghalaya</option>
            </select>
          </div>

          {/* Apply */}
          <button
            type="submit"
            className="w-full bg-green-500 text-black py-2 rounded font-semibold"
          >
            {t.applyFilters}
          </button>

          {/* Clear */}
          <button
            type="button"
            onClick={handleClearFilters}
            className="w-full bg-gray-400 dark:bg-slate-700 text-gray-900 dark:text-white py-2 rounded"
          >
            {t.clearFilters}
          </button>
        </form>
      </div>
    </div>
  )
}
 