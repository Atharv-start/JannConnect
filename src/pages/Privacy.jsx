import { useLanguage } from "../context/LanguageContext"

export default function Privacy() {
  const { t } = useLanguage()

  return (
    <section className="max-w-4xl mx-auto px-6 py-24">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        {t.privacyPolicy}
      </h1>

      <p className="text-gray-700 dark:text-white/80 leading-relaxed">
        This website does not collect, store, or process any personal data.
        It is an educational project created for learning and demonstration
        purposes only.
      </p>
    </section>
  )
}
