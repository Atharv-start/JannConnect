import { useNavigate } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"
import Agriculture from "../assets/icons/Agriculture.svg"
import Education from "../assets/icons/Education.svg"
import Finance from "../assets/icons/Finance.svg"
import Health from "../assets/icons/Health.svg"
import WomenChild from "../assets/icons/WomenChild.svg"
import Employment from "../assets/icons/Employment.svg"

export default function Categories() {
  const navigate = useNavigate()
  const { t } = useLanguage()

  const categories = [
    { id: "Agriculture", key: "agriculture", icon: Agriculture },
    { id: "Education", key: "education", icon: Education },
    { id: "Finance", key: "finance", icon: Finance },
    { id: "Health", key: "health", icon: Health },
    { id: "Women and Child", key: "womenChild", icon: WomenChild },
    { id: "Employment", key: "employment", icon: Employment },
  ]

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-10">
        {t.browseCategory}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map(cat => (
          <div
            key={cat.id}
            onClick={() =>
              navigate(`/search?category=${encodeURIComponent(cat.id)}`)
            }
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
            <img src={cat.icon} alt={cat.id} className="w-10 h-10" />
            <p className="text-sm font-medium text-center">
              {t[cat.key]}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
