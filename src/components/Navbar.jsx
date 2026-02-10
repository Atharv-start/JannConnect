import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"
import { useAuth } from "../context/AuthContext"
import { useTheme } from "../context/ThemeContext"
import LanguagePopup from "./LanguagePopup"

import SearchIcon from "../assets/icons/Search.svg"
import MoonIcon from "../assets/icons/moon.svg"
import SunIcon from "../assets/icons/sun.svg"
import LanguageIcon from "../assets/icons/Language.svg"
import UserIcon from "../assets/icons/user.svg"
import SignInIcon from "../assets/icons/sign-in.svg"
import SignOutIcon from "../assets/icons/sign-out.svg"

export default function Navbar() {
  const { t, lang } = useLanguage()
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const [query, setQuery] = useState("")
  const [langOpen, setLangOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  function handleSearch(e) {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${query}`)
      setQuery("")
      setMenuOpen(false)
    }
  }

  return (
    <>
      <header className="fixed top-2 left-0 w-full z-50 px-3 md:px-6">
        <div
          className={`
            mx-auto max-w-7xl
            flex items-center justify-between
            px-4 md:px-6 py-2 md:py-3
            rounded-full
            backdrop-blur-xl
            shadow-lg
            transition-all duration-500
            ${
              theme === "dark"
                ? "bg-white/10 border border-white/20 text-white"
                : "bg-white/80 border border-black/10 text-gray-900"
            }
          `}
        >
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="font-bold text-base md:text-lg cursor-pointer whitespace-nowrap"
          >
            <span className="text-green-400">Jann</span>Connect
          </div>

          {/* Desktop Search */}
          <form
            onSubmit={handleSearch}
            className="flex-1 hidden md:flex items-center gap-2 mx-6"
          >
            <img src={SearchIcon} className="w-4 opacity-70" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className={`
                w-full bg-transparent outline-none
                ${
                  theme === "dark"
                    ? "text-white placeholder-white/60"
                    : "text-gray-800 placeholder-gray-500"
                }
              `}
            />
          </form>

          {/* Right (desktop) */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme */}
            <button
              onClick={toggleTheme}
              className={`w-9 h-9 rounded-full flex items-center justify-center ${
                theme === "dark"
                  ? "bg-white/10 border border-white/20"
                  : "bg-white/80 border border-black/10"
              }`}
            >
              <img
                src={theme === "dark" ? SunIcon : MoonIcon}
                className="w-4"
              />
            </button>

            {/* Language */}
            <button
              onClick={() => setLangOpen(true)}
              className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${
                theme === "dark"
                  ? "bg-white/10 border border-white/20"
                  : "bg-white/80 border border-black/10"
              }`}
            >
              <img src={LanguageIcon} className="w-4" />
              {lang.toUpperCase()}
            </button>

            {/* Auth */}
            {user ? (
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <img src={UserIcon} className="w-4" />
                  {user.name}
                </div>

                <button
                  onClick={logout}
                  className="px-3 py-1 rounded-full bg-green-500 text-black text-sm flex items-center gap-1"
                >
                  <img src={SignOutIcon} className="w-4" />
                  {t.logout}
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/signin")}
                className="px-4 py-1 rounded-full bg-green-500 text-black text-sm flex items-center gap-2"
              >
                <img src={SignInIcon} className="w-4" />
                {t.signIn}
              </button>
            )}
          </div>

          {/* Hamburger (mobile) */}
          <button
            className="md:hidden text-xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className={`
              mt-2 mx-auto max-w-7xl rounded-xl p-4
              backdrop-blur-xl shadow-lg
              ${
                theme === "dark"
                  ? "bg-slate-900 border border-white/10 text-white"
                  : "bg-white border border-gray-200 text-gray-900"
              }
            `}
          >
            {/* Mobile search */}
            <form
              onSubmit={handleSearch}
              className="flex items-center gap-2 mb-4"
            >
              <img src={SearchIcon} className="w-4 opacity-70" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full bg-transparent outline-none"
              />
            </form>

            <div className="flex flex-col gap-3">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2"
              >
                <img
                  src={theme === "dark" ? SunIcon : MoonIcon}
                  className="w-4"
                />
                {t.toggleTheme}
              </button>

              <button
                onClick={() => setLangOpen(true)}
                className="flex items-center gap-2"
              >
                <img src={LanguageIcon} className="w-4" />
                {t.languageLabel} {lang.toUpperCase()}
              </button>

              {user ? (
                <button
                  onClick={logout}
                  className="flex items-center gap-2 text-red-400"
                >
                  <img src={SignOutIcon} className="w-4" />
                  {t.logout}
                </button>
              ) : (
                <button
                  onClick={() => navigate("/signin")}
                  className="flex items-center gap-2 text-green-500"
                >
                  <img src={SignInIcon} className="w-4" />
                  {t.signIn}
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {langOpen && <LanguagePopup onClose={() => setLangOpen(false)} />}
    </>
  )
}
