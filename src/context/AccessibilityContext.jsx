import { createContext, useContext, useEffect, useState } from "react"

const AccessibilityContext = createContext()

export function AccessibilityProvider({ children }) {
  const [fontScale, setFontScale] = useState(
    Number(localStorage.getItem("fontScale")) || 1
  )
  const [highContrast, setHighContrast] = useState(
    localStorage.getItem("highContrast") === "true"
  )
  const [grayscale, setGrayscale] = useState(
    localStorage.getItem("grayscale") === "true"
  )
  const [dyslexiaFont, setDyslexiaFont] = useState(
    localStorage.getItem("dyslexiaFont") === "true"
  )
  const [reduceMotion, setReduceMotion] = useState(
    localStorage.getItem("reduceMotion") === "true"
  )

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontScale * 100}%`

    document.body.classList.toggle("contrast", highContrast)
    document.body.classList.toggle("grayscale", grayscale)
    document.body.classList.toggle("dyslexia", dyslexiaFont)
    document.body.classList.toggle("reduce-motion", reduceMotion)

    localStorage.setItem("fontScale", fontScale)
    localStorage.setItem("highContrast", highContrast)
    localStorage.setItem("grayscale", grayscale)
    localStorage.setItem("dyslexiaFont", dyslexiaFont)
    localStorage.setItem("reduceMotion", reduceMotion)
  }, [
    fontScale,
    highContrast,
    grayscale,
    dyslexiaFont,
    reduceMotion,
  ])

  function resetAll() {
    setFontScale(1)
    setHighContrast(false)
    setGrayscale(false)
    setDyslexiaFont(false)
    setReduceMotion(false)
  }

  return (
    <AccessibilityContext.Provider
      value={{
        fontScale,
        setFontScale,
        highContrast,
        setHighContrast,
        grayscale,
        setGrayscale,
        dyslexiaFont,
        setDyslexiaFont,
        reduceMotion,
        setReduceMotion,
        resetAll,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  return useContext(AccessibilityContext)
}
