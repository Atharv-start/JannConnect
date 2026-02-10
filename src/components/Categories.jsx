import { useNavigate } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"

export default function Categories() {
  const { t } = useLanguage()
  const navigate = useNavigate()

  const categories = [
    { value: "Agriculture", key: "agriculture", icon: "🌾" },
    { value: "Education", key: "education", icon: "🎓" },
    { value: "Finance", key: "finance", icon: "💰" },
    { value: "Health", key: "health", icon: "🏥" },
    { value: "Women & Child", key: "womenChild", icon: "👩‍👧" },
    { value: "Employment", key: "employment", icon: "💼" },
  ]

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-10">
        {t.browseCategory}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map(cat => (
          <div
            key={cat.value}
            onClick={() => navigate(`/search?category=${cat.value}`)}
            className="
              cursor-pointer
              bg-white dark:bg-slate-900
              text-gray-800 dark:text-white
              border border-gray-200 dark:border-white/10
              rounded-xl
              p-6
              flex flex-col items-center
              justify-center
              gap-3
              hover:scale-105 transition
            "
          >
            <div className="text-3xl">{cat.icon}</div>
            <p className="text-sm font-medium text-center">
              {t[cat.key]}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
