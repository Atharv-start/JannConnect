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
    <div className="space-y-24">

      {/* HERO */}
      <section className="relative overflow-hidden pt-20 pb-24">

        {/* Static glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-green-500/10 rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

          <p className="text-green-400 font-semibold mb-3 tracking-wide">
            {t?.tagline || "Government & NGO Scheme Portal"}
          </p>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            {t?.heroTitle1 || "Schemes"} <br />
            <span className="text-green-500">
              {t?.heroTitle2 || "Made Easy"}
            </span>
          </h1>

          <p className="mt-5 max-w-2xl mx-auto text-lg text-gray-400">
            {t?.heroDesc ||
              "Find government and NGO schemes you are eligible for — all in one place, with simple explanations and direct application links."}
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/search")}
              className="px-8 py-4 bg-green-500 text-black rounded-lg font-semibold hover:bg-green-400 transition"
            >
              {t?.findSchemes || "View Schemes"}
            </button>

            <button
              onClick={() => navigate("/about")}
              className="px-8 py-4 border border-white/20 rounded-lg hover:bg-white/10 transition"
            >
              {t?.learnMore || "Learn More"}
            </button>
          </div>

          {/* Feature cards */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: t?.feature1Title || "Verified Schemes",
                desc: t?.feature1Desc || "Official government & NGO data",
              },
              {
                title: t?.feature2Title || "Eligibility Based",
                desc: t?.feature2Desc || "Personalized discovery",
              },
              {
                title: t?.feature3Title || "Direct Apply",
                desc: t?.feature3Desc || "No middlemen involved",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl p-6 text-sm text-gray-300"
              >
                <h3 className="font-semibold text-white mb-2">
                  {f.title}
                </h3>
                {f.desc}
              </div>
            ))}
          </div>

          {/* Trust line */}
          <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm text-gray-400">
            <span>{t?.trust1 || "✔ 50+ Schemes"}</span>
            <span>{t?.trust2 || "✔ Central & State"}</span>
            <span>{t?.trust3 || "✔ Government + NGO"}</span>
          </div>

        </div>
      </section>

      {/* Rest Sections */}
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
