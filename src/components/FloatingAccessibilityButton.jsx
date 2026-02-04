import { useState } from "react"
import AccessibilityPanel from "./AccessibilityPanel"

export default function FloatingAccessibilityButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed right-4 top-1/2 -translate-y-1/2
                   z-[9999]
                   w-14 h-14
                   rounded-full
                   bg-purple-600
                   text-white
                   text-xl
                   font-bold
                   shadow-xl
                   hover:scale-105 transition"
        aria-label="Accessibility options"
      >
        A
      </button>

      {open && (
        <AccessibilityPanel onClose={() => setOpen(false)} />
      )}
    </>
  )
}
