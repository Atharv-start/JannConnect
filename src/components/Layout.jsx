import Navbar from "./Navbar"
import Footer from "./Footer"
import FloatingAccessibilityButton from "./FloatingAccessibilityButton"
import Chatbot from "./Chatbot"
import { useTheme } from "../context/ThemeContext"

export default function Layout({ children }) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      <Navbar />

      <main className="pt-20 md:pt-24">
        {children}
      </main>

      <Footer />
      <FloatingAccessibilityButton />
      <Chatbot />
    </div>
  )
}
