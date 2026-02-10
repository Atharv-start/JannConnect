import { useNavigate } from "react-router-dom"
import Stats from "../components/Stats"
import HowItWorks from "../components/HowItWorks"
import Categories from "../components/Categories"
import schemes from "../data/schemes"
import { useLanguage } from "../context/LanguageContext"
import NGOSchemes from "../components/NGOSchemes"

export default function Home() {
  const { t } = useLanguage()
  const navigate = useNavigate()

  const ngoSchemes = schemes.filter(s => s.type === "ngo")

  return (
    <>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-24 text-center">
        <h1 className="text-5xl font-bold leading-tight text-gray-900 dark:text-white">
          Schemes <br />
          <span className="text-green-500">Made Easy</span>
        </h1>

        {/* <button
          onClick={() => navigate("/search")}
          className="mt-10 px-8 py-4 bg-green-500 text-black rounded-lg font-semibold"
        >
          {t.findSchemes}
        </button> */}
      </section>

      <Stats />
      <HowItWorks />
      <Categories />
      <NGOSchemes />
    </>
  )
}
