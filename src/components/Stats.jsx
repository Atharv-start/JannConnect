import { useLanguage } from "../context/LanguageContext"

export default function Stats() {
  const { t } = useLanguage()

  const stats = [
    {
      value: "50+",
      label: t.statsTotal,
    },
    {
      value: "30+",
      label: t.statsCentral,
    },
    {
      value: "10+",
      label: t.statsStates,
    },
  ]

  return (
    <section className="mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="
                bg-white dark:bg-slate-900
                text-gray-800 dark:text-white
                border border-gray-200 dark:border-white/10
                rounded-xl p-8 text-center
                hover:border-green-500 transition-all duration-300
              "
            >
              <div className="text-4xl font-bold">
                {item.value}
              </div>

              <div className="mt-2 text-sm text-gray-500 dark:text-white/60">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
