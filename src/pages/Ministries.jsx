import { useLanguage } from "../context/LanguageContext"

export default function Ministries() {
  const { t } = useLanguage()

  return (
    <section className="max-w-4xl mx-auto px-6 py-24">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        {t.ministries}
      </h1>

      <ul className="space-y-3 text-gray-700 dark:text-white/80">
        <li>Ministry of Education</li>
        <li>Ministry of Health & Family Welfare</li>
        <li>Ministry of Women & Child Development</li>
        <li>Ministry of Agriculture</li>
        <li>Ministry of Rural Development</li>
      </ul>
    </section>
  )
}
