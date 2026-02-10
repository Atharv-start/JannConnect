import { useState } from "react"
import { useNavigate } from "react-router-dom"
import LanguagePopup from "./LanguagePopup"
import AccessibilityPanel from "./AccessibilityPanel"
import { useLanguage } from "../context/LanguageContext"
import { useAuth } from "../context/AuthContext"
import { useTheme } from "../context/ThemeContext"

export default function Navbar() {
  const { t, lang } = useLanguage()
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const [query, setQuery] = useState("")
  const [langOpen, setLangOpen] = useState(false)
  const [accessOpen, setAccessOpen] = useState(false)

  function handleSearch(e) {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${query}`)
      setQuery("")
    }
  }

  return (
    <>
      <header
        className="
          fixed top-0 left-0 w-full z-50
          bg-white dark:bg-slate-900
          border-b border-gray-200 dark:border-white/10
          backdrop-blur
        "
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-6">

          {/* Logo */}
          <div
            className="
              font-bold text-xl cursor-pointer
              text-gray-900 dark:text-white
            "
            onClick={() => navigate("/")}
          >
            <span className="text-green-500">Jann</span>Connect
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:block flex-1">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="
                w-full px-4 py-2 rounded
                bg-gray-100 dark:bg-slate-800
                text-gray-900 dark:text-white
                placeholder-gray-500
                focus:ring-2 focus:ring-green-500
              "
            />
          </form>

          {/* Right Controls */}
          <div className="flex items-center gap-3 text-gray-900 dark:text-white">
            {/* Theme */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 border border-gray-300 dark:border-white/20 rounded"
            >
              {theme === "dark" ? "🌙" : "☀️"}
            </button>

            {/* Language */}
            <button
              onClick={() => setLangOpen(true)}
              className="px-3 py-2 border border-gray-300 dark:border-white/20 rounded text-sm"
            >
              🌐 {lang.toUpperCase()}
            </button>

            {/* Auth */}
            {user ? (
              <>
                <span className="text-sm font-medium">
                  {t.greeting}, {user.name}
                </span>
                <button
                  onClick={logout}
                  className="px-3 py-2 border border-gray-300 dark:border-white/20 rounded text-sm"
                >
                  {t.logout}
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/signin")}
                className="px-4 py-2 bg-green-500 text-black rounded font-semibold"
              >
                {t.signIn}
              </button>
            )}
          </div>
        </div>
      </header>

      {langOpen && <LanguagePopup onClose={() => setLangOpen(false)} />}
      {accessOpen && <AccessibilityPanel onClose={() => setAccessOpen(false)} />}
    </>
  )
}
