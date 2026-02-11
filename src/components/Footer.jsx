import { Link } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"

export default function Footer() {
  const { t } = useLanguage()

  const linkStyle =
    "hover:text-white transition-colors cursor-pointer"

  return (
    <footer className="mt-32 border-t border-white/10 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 text-sm text-white/70">

        {/* About */}
        <div>
          <h3 className="text-white font-semibold mb-3">
            {t.brand}
          </h3>
          <p>
            {t.aboutP1}
          </p>
        </div>

        {/* Important Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">
            {t.importantLinks}
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/about" className={linkStyle}>
                {t.aboutUs}
              </Link>
            </li>
            <li>
              <Link to="/privacy" className={linkStyle}>
                {t.privacyPolicy}
              </Link>
            </li>
            <li>
              <Link to="/disclaimer" className={linkStyle}>
                {t.disclaimer}
              </Link>
            </li>
          </ul>
        </div>

        {/* Government */}
        <div>
          <h3 className="text-white font-semibold mb-3">
            {t.government}
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/ministries" className={linkStyle}>
                {t.ministries}
              </Link>
            </li>
            <li>
              <Link to="/departments" className={linkStyle}>
                {t.departments}
              </Link>
            </li>
            <li>
              <Link to="/states" className={linkStyle}>
                {t.statesUTs}
              </Link>
            </li>
            <li>
              <Link to="/government-schemes" className={linkStyle}>
                {t.governmentSchemes}
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-3">
            {t.supportLabel}
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/help" className={linkStyle}>
                {t.help}
              </Link>
            </li>
            <li>
              <Link to="/faqs" className={linkStyle}>
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/feedback" className={linkStyle}>
                {t.feedback}
              </Link>
            </li>
            <li>
              <Link to="/contact" className={linkStyle}>
                {t.contactUs}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 text-center py-4 text-xs text-white/50">
        {t.copyRight}
      </div>
    </footer>
  )
}
