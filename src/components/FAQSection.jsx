import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)
  const navigate = useNavigate()
  const { t } = useLanguage()

  const faqs = t.faqs || []

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
      <div className="hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5"
          alt="FAQ"
          className="w-full max-w-md mx-auto"
        />
      </div>

      <div>
        <p className="text-gray-400 mb-2">{t.faqLabel}</p>

        <h2 className="text-4xl font-bold mb-8">{t.faqHeading}</h2>

        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div key={index} className="border-b border-white/10 pb-4">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center text-left font-semibold"
              >
                {item.q}
                <span>{openIndex === index ? "−" : "+"}</span>
              </button>

              {openIndex === index && <p className="mt-2 text-gray-400">{item.a}</p>}
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/faqs")}
          className="mt-8 px-6 py-3 border border-white/30 rounded-lg hover:bg-white/10 transition"
        >
          {t.viewMore}
        </button>
      </div>
    </section>
  )
}
