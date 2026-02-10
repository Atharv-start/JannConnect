import { useLanguage } from "../context/LanguageContext"

export default function LanguagePopup({ onClose }) {
  const { changeLanguage, lang } = useLanguage()

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
    { code: "mr", name: "मराठी" },
    { code: "ta", name: "தமிழ்" },
    { code: "te", name: "తెలుగు" },
  ]

  function selectLang(langCode) {
    changeLanguage(langCode)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-slate-900 text-black dark:text-white rounded-lg p-6 w-64">
        <h2 className="text-lg font-semibold mb-4">
          Select Language
        </h2>

        <div className="space-y-3">
          {languages.map(l => (
            <button
              key={l.code}
              onClick={() => selectLang(l.code)}
              className={`w-full py-2 rounded transition ${
                lang === l.code
                  ? "bg-green-500 text-black font-semibold"
                  : "bg-gray-200 dark:bg-slate-700"
              }`}
            >
              {l.name}
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full py-2 bg-gray-300 dark:bg-slate-600 rounded"
        >
          Close
        </button>
      </div>
    </div>
  )
}
