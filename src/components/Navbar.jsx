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
  const [isListening, setIsListening] = useState(false)

  function handleSearch(e) {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${query}`)
      setQuery("")
    }
  }

  // Voice search function
  function startVoiceSearch() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert(t.voiceNotSupported)
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = "en-US"
    recognition.start()
    setIsListening(true)

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript
      setQuery(text)
      setIsListening(false)
      navigate(`/search?q=${text}`)
    }

    recognition.onerror = () => {
      setIsListening(false)
    }
  }

  return (
    <>
      <header className="fixed top-4 left-0 w-full z-50 px-6">
        <div
          className={`
            mx-auto max-w-7xl
            flex items-center gap-4
            px-6 py-3 rounded-full
            backdrop-blur-xl
            shadow-lg
            transition-all duration-500
            ${
              theme === "dark"
                ? "bg-white/10 border border-white/20 text-white"
                : "bg-white/70 border border-black/10 text-gray-900"
            }
          `}
        >
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="font-bold text-lg cursor-pointer whitespace-nowrap"
          >
            <span className="text-green-500">Jann</span>
            <span
              className={theme === "dark" ? "text-white" : "text-gray-900"}
            >
              Connect
            </span>
          </div>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="flex-1 hidden md:flex items-center gap-2"
          >
            <img src={SearchIcon} className="w-4 opacity-70" />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
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

            {/* Voice button */}
            <button
              type="button"
              onClick={startVoiceSearch}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isListening
                  ? "bg-red-500 text-white"
                  : theme === "dark"
                  ? "bg-white/10 border border-white/20"
                  : "bg-white/80 border border-black/10"
              }`}
              title="Voice search"
            >
              🎤
            </button>
          </form>

          {/* Right side */}
          <div className="flex items-center gap-3 transition-all duration-500">
            {/* Theme toggle */}
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

            {/* Language button */}
            <button
              onClick={() => setLangOpen(true)}
              className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 whitespace-nowrap transition-all ${
                theme === "dark"
                  ? "bg-white/10 border border-white/20 text-white"
                  : "bg-white/80 border border-black/10 text-gray-800"
              }`}
            >
              <img src={LanguageIcon} className="w-4" />
              {lang.toUpperCase()}
            </button>

            {/* Auth section */}
            {user ? (
              <div className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-1 text-sm whitespace-nowrap ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  <img src={UserIcon} className="w-4" />
                  {t.greeting}, {user.name}
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
        </div>
      </header>

      {langOpen && <LanguagePopup onClose={() => setLangOpen(false)} />}
    </>
  )
}
