import { useLanguage } from "../context/LanguageContext"

export default function HowItWorks() {
  const { t } = useLanguage()

  const steps = [
    {
      title: t.step1Title,
      desc: t.step1Desc,
      icon: "📝",
    },
    {
      title: t.step2Title,
      desc: t.step2Desc,
      icon: "🔍",
    },
    {
      title: t.step3Title,
      desc: t.step3Desc,
      icon: "🖱️",
    },
  ]

  return (
    <section className="mt-28">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-gray-500 dark:text-white/60 text-sm uppercase tracking-wide">
          {t.howTitle}
        </p>

        <h2 className="mt-2 text-3xl md:text-4xl font-bold">
          {t.howSubtitle}
        </h2>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="
                bg-white dark:bg-slate-900
                text-gray-800 dark:text-white
                border border-gray-200 dark:border-white/10
                rounded-xl p-8
                hover:border-green-500 transition-all duration-300
              "
            >
              <div className="text-4xl mb-4">
                {step.icon}
              </div>

              <h3 className="text-lg font-semibold">
                {step.title}
              </h3>

              <p className="mt-2 text-sm text-gray-500 dark:text-white/60">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
