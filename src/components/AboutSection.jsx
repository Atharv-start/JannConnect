import { useNavigate } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"

export default function AboutSection() {
  const navigate = useNavigate()
  const { t } = useLanguage()

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-4xl font-bold text-green-500 mb-6">{t.aboutTitle}</h2>

        <p className="text-gray-300 leading-relaxed mb-4">{t.aboutP1}</p>

        <p className="text-gray-300 leading-relaxed mb-4">{t.aboutP2}</p>

        <p className="text-gray-300 leading-relaxed mb-4">{t.aboutP3}</p>

        <button
          onClick={() => navigate("/about")}
          className="mt-6 px-6 py-3 border border-white/30 rounded-lg hover:bg-white/10 transition"
        >
          {t.viewMore}
        </button>
      </div>

      <div className="relative">
        <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf"
            alt="Citizens using digital services"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl shadow-lg">▶</div>
        </div>
      </div>
    </section>
  )
}
