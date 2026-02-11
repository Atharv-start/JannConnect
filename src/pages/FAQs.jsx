import { useState } from "react"
import { useLanguage } from "../context/LanguageContext"

export default function FAQs() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState(null)

  // Safe fallback for faqs array
  const faqs = Array.isArray(t?.faqs) ? t.faqs : []

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
      
      {/* Illustration */}
      <div className="hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5"
          alt="FAQ illustration"
          className="w-full max-w-md mx-auto"
        />
      </div>

      {/* FAQ content */}
      <div>
        <p className="text-gray-400 mb-2 dark:text-gray-300">
          {t?.faqLabel || "Have Questions?"}
        </p>

        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          {t?.faqHeading || "Frequently Asked Questions"}
        </h1>

        <div className="space-y-4">
          {faqs && faqs.length > 0 ? (
            faqs.map((item, index) => (
              <div
                key={index}
                className="border-b border-gray-300 dark:border-white/10 pb-4"
              >
                <button
                  onClick={() =>
                    setOpenIndex(
                      openIndex === index ? null : index
                    )
                  }
                  className="w-full flex justify-between items-center text-left font-semibold text-gray-900 dark:text-white hover:text-green-500 dark:hover:text-green-400 transition"
                >
                  {item?.q || "Question"}
                  <span>
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>

                {openIndex === index && (
                  <p className="mt-2 text-gray-700 dark:text-gray-300">
                    {item?.a || "Answer"}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              {t?.noFaqs || "No FAQs available"}
            </p>
          )}
        </div>

        <button className="mt-8 px-6 py-3 border border-gray-300 dark:border-white/30 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 transition font-medium">
          {t?.viewMore || "View More"} →
        </button>
      </div>
    </section>
  )
}
