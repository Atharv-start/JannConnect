import { useState } from "react"
import AccessibilityPanel from "./AccessibilityPanel"
import Accessibility from "../assets/icons/accessibility.svg"
import { useAccessibility } from "../context/AccessibilityContext"



export default function FloatingAccessibilityButton() {
  const [open, setOpen] = useState(false)
  const { isOverlayOpen, setIsOverlayOpen } = useAccessibility()

  return (
    <>
      {/* Floating Button */}
      {!open && !isOverlayOpen && (
        <button
          onClick={() => {
          setOpen(true)
          setIsOverlayOpen(true)
          }}

        className="fixed right-4 top-24
               z-[9999]
               w-15 h-15
               rounded-full
               text-white
               text-xl
               font-bold
               shadow-xl
               hover:scale-105 transition"
          aria-label="Accessibility options"
        >
        <img
          src={Accessibility}
          className="w-full h-full p-2 object-contain"
        />
        </button>
    )}

      {open && (
        <AccessibilityPanel
        onClose={() => {
          setOpen(false)
          setIsOverlayOpen(false)
      }}
  />
)}
    </>
  )
}
