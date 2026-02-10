import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)
  const navigate = useNavigate()

  const faqs = [
    {
      q: "What is JannConnect?",
      a: "JannConnect is a platform that helps citizens easily find government and NGO schemes in one place.",
    },
    {
      q: "How will JannConnect help common citizens?",
      a: "It simplifies scheme discovery by showing eligibility, benefits, required documents, and application steps.",
    },
    {
      q: "Can I apply for schemes through JannConnect?",
      a: "JannConnect provides official links. Applications are completed on official scheme portals.",
    },
    {
      q: "How does JannConnect work?",
      a: "You can search or filter schemes based on your profile to see relevant schemes.",
    },
    {
      q: "What information can I find about a scheme?",
      a: "Benefits, eligibility, documents required, and application steps.",
    },
  ]

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
        <p className="text-gray-400 mb-2">
          Frequently Asked Questions
        </p>

        <h2 className="text-4xl font-bold mb-8">
          Checkout our knowledge base for some of your answers!
        </h2>

        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="border-b border-white/10 pb-4"
            >
              <button
                onClick={() =>
                  setOpenIndex(
                    openIndex === index ? null : index
                  )
                }
                className="w-full flex justify-between items-center text-left font-semibold"
              >
                {item.q}
                <span>
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <p className="mt-2 text-gray-400">
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/faqs")}
          className="mt-8 px-6 py-3 border border-white/30 rounded-lg hover:bg-white/10 transition"
        >
          View More →
        </button>
      </div>
    </section>
  )
}
