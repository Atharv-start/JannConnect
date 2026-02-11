import { useLanguage } from "../context/LanguageContext"

export default function GovernmentSchemes() {
  const { t } = useLanguage()

  return (
    <section className="max-w-4xl mx-auto px-6 py-24">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        {t?.governmentSchemes || "Government Schemes"}
      </h1>

      <p className="text-gray-700 dark:text-white/80 leading-relaxed mb-8">
        {t?.schemesIntro || "This section lists various government schemes available across ministries and departments. Use the search feature on the home page to find schemes based on your eligibility and needs."}
      </p>

      <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/40 rounded-lg p-6">
        <p className="text-gray-700 dark:text-white/80">
          {t?.schemesHelp || "To explore schemes, go to the Government Schemes page or use the search functionality to filter by category, state, or eligibility criteria."}
        </p>
      </div>
    </section>
  )
}
