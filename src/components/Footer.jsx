import { useLanguage } from "../context/LanguageContext"

export default function Footer() {
  const { t } = useLanguage()

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
            <li>About Us</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Disclaimer</li>
          </ul>
        </div>

        {/* Government */}
        <div>
          <h3 className="text-white font-semibold mb-3">
            Government
          </h3>
          <ul className="space-y-2">
            <li>Ministries</li>
            <li>Departments</li>
            <li>States / UTs</li>
            <li>Government Schemes</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-3">
            Support
          </h3>
          <ul className="space-y-2">
            <li>Help</li>
            <li>FAQs</li>
            <li>Feedback</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 text-center py-4 text-xs text-white/50">
        © 2026 JannConnect
      </div>
    </footer>
  )
}
