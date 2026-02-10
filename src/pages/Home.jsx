import { useNavigate } from "react-router-dom"
import Stats from "../components/Stats"
import HowItWorks from "../components/HowItWorks"
import Categories from "../components/Categories"
import { useLanguage } from "../context/LanguageContext"
import AboutSection from "../components/AboutSection"
import FAQSection from "../components/FAQSection"
import AnimatedSection from "../components/AnimatedSection"

export default function Home() {
  const { t } = useLanguage()
  const navigate = useNavigate()

  return (
    <div className="space-y-28">

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-32 text-center">

        {/* Soft green glow background */}
        <div className="absolute inset-0 bg-gradient-to-b from-green-500/20 via-green-500/10 to-transparent pointer-events-none" />

        {/* Hero content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <p className="text-green-400 font-semibold mb-4 tracking-wide">
            {t.tagline}
          </p>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            {t.heroTitle1} <br />
            <span className="text-green-500">{t.heroTitle2}</span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 dark:text-white/70">
            {t.heroDesc}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/search")}
              className="px-8 py-4 bg-green-500 text-black rounded-lg font-semibold hover:bg-green-400 transition"
            >
              {t.findSchemes}
            </button>

            <button
              onClick={() => navigate("/about")}
              className="px-8 py-4 border border-white/20 rounded-lg hover:bg-white/10 transition"
            >
              {t.learnMore}
            </button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-500 dark:text-white/60">
            <span>{t.trust1}</span>
            <span>{t.trust2}</span>
            <span>{t.trust3}</span>
          </div>
        </div>
      </section>

      {/* Sections with scroll animation */}
      <AnimatedSection>
        <Stats />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <HowItWorks />
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <Categories />
      </AnimatedSection>

      <AnimatedSection delay={0.3}>
        <AboutSection />
      </AnimatedSection>

      <AnimatedSection delay={0.4}>
        <FAQSection />
      </AnimatedSection>

    </div>
  )
}
