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
            JannConnect
          </h3>
          <p>
            JannConnect is a National Platform that aims to offer one-stop
            search and discovery of the Government schemes.
          </p>
        </div>

        {/* Important Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">
            Important Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/about" className={linkStyle}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/privacy" className={linkStyle}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/disclaimer" className={linkStyle}>
                Disclaimer
              </Link>
            </li>
          </ul>
        </div>

        {/* Government */}
        <div>
          <h3 className="text-white font-semibold mb-3">
            Government
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/ministries" className={linkStyle}>
                Ministries
              </Link>
            </li>
            <li>
              <Link to="/departments" className={linkStyle}>
                Departments
              </Link>
            </li>
            <li>
              <Link to="/states" className={linkStyle}>
                States / UTs
              </Link>
            </li>
            <li>
              <Link to="/government-schemes" className={linkStyle}>
                Government Schemes
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-3">
            Support
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/help" className={linkStyle}>
                Help
              </Link>
            </li>
            <li>
              <Link to="/faqs" className={linkStyle}>
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/feedback" className={linkStyle}>
                Feedback
              </Link>
            </li>
            <li>
              <Link to="/contact" className={linkStyle}>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 text-center py-4 text-xs text-white/50">
        © 2026 JannConnect
      </div>
    </footer>
  )
}
