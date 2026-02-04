import { useLanguage } from "../context/LanguageContext"

export default function LanguagePopup({ onClose }) {
  const { changeLanguage } = useLanguage()

  function selectLang(lang) {
    changeLanguage(lang)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white text-black rounded-lg p-6 w-64">
        <h2 className="text-lg font-semibold mb-4">
          Select Language
        </h2>

        <div className="space-y-3">
          <button
            onClick={() => selectLang("en")}
            className="w-full py-2 bg-gray-100 rounded"
          >
            English
          </button>

          <button
            onClick={() => selectLang("hi")}
            className="w-full py-2 bg-gray-100 rounded"
          >
            हिंदी
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full py-2 bg-gray-200 rounded"
        >
          Close
        </button>
      </div>
    </div>
  )
}
