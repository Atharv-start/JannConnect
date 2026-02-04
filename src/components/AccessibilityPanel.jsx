import { useAccessibility } from "../context/AccessibilityContext"

export default function AccessibilityPanel({ onClose }) {
  const {
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
  } = useAccessibility()

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
      <div className="w-full max-w-md bg-white text-black h-full overflow-y-auto">

        {/* Header */}
        <div className="bg-purple-600 text-white p-4 flex justify-between">
          <h2 className="font-semibold">Accessibility options</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-3 gap-4 p-4">

          <button
            onClick={() => setFontScale(fontScale + 0.1)}
            className="bg-gray-100 rounded-lg p-4 text-sm font-medium"
          >
            Bigger Text
          </button>

          <button
            onClick={() =>
              setFontScale(Math.max(0.8, fontScale - 0.1))
            }
            className="bg-gray-100 rounded-lg p-4 text-sm font-medium"
          >
            Smaller Text
          </button>

          <button
            onClick={() => setReduceMotion(!reduceMotion)}
            className="bg-gray-100 rounded-lg p-4 text-sm font-medium"
          >
            Pause Animation
          </button>

          <button
            onClick={() => setHighContrast(!highContrast)}
            className="bg-gray-100 rounded-lg p-4 text-sm font-medium"
          >
            High Contrast
          </button>

          <button
            onClick={() => setGrayscale(!grayscale)}
            className="bg-gray-100 rounded-lg p-4 text-sm font-medium"
          >
            Grayscale
          </button>

          <button
            onClick={() => setDyslexiaFont(!dyslexiaFont)}
            className="bg-gray-100 rounded-lg p-4 text-sm font-medium"
          >
            Dyslexia Font
          </button>
        </div>

        {/* Reset */}
        <div className="p-4">
          <button
            onClick={resetAll}
            className="w-full bg-purple-200 py-2 rounded font-semibold"
          >
            Reset All Settings
          </button>
        </div>
      </div>
    </div>
  )
}
