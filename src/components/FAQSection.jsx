import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)
  const navigate = useNavigate()
  const { t } = useLanguage()

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
      {/* Image */}
      <div className="hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0"
          alt="Citizens accessing services"
          className="w-full max-w-md mx-auto rounded-xl shadow-lg"
        />
      </div>

      {/* FAQ content */}
      <div>
        <p className="text-gray-500 dark:text-gray-400 mb-2">
          {t?.faqLabel || "Have Questions?"}
        </p>

        <h2 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          {t?.faqHeading || "Frequently Asked Questions"}
        </h2>

        <div className="space-y-4">
          {(t?.faqs || []).map((item, index) => (
            <div
              key={index}
              className="border-b border-gray-200 dark:border-white/10 pb-4"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex justify-between items-center text-left font-semibold text-gray-900 dark:text-white"
              >
                {item?.q || "Question"}
                <span>
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {item?.a || "Answer"}
                </p>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/faqs")}
          className="mt-8 px-6 py-3 border border-gray-300 dark:border-white/30 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition"
        >
          {t?.viewMore || "View More →"}
        </button>
      </div>
    </section>
  )
}
