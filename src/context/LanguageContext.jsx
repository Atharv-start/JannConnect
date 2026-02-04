import { createContext, useContext, useState, useEffect } from "react"

const LanguageContext = createContext()

const translations = {
  en: {
    signIn: "Sign In",
    searchPlaceholder: "Search schemes...",
    heroTitle1: "Government Schemes",
    heroTitle2: "Made Easy",
    heroDesc:
      "Discover, understand, and apply for government and NGO schemes.",
    findSchemes: "Find Schemes For You",
    searchResults: "Search Results",
    filters: "Filters",

    overview: "Overview",
    benefits: "Benefits",
    eligibility: "Eligibility",
    documents: "Documents",
    howToApply: "How to Apply",
    applyNow: "Apply on Official Website",

    government: "Government",
    ngo: "NGO",
    all: "All",

    /* STATS */
    statsTotal: "Total Schemes",
    statsCentral: "Central Schemes",
    statsStates: "States/UTs",

    /* HOW IT WORKS */
    howTitle: "How it works",
    howSubtitle: "Easy steps to apply for schemes",

    step1Title: "Enter Details",
    step1Desc: "Start by entering your basic details.",

    step2Title: "Search",
    step2Desc: "We find the best schemes for you.",

    step3Title: "Select & Apply",
    step3Desc: "Apply to the most suitable scheme.",
  },

  hi: {
    signIn: "साइन इन",
    searchPlaceholder: "योजनाएं खोजें...",
    heroTitle1: "सरकारी योजनाएं",
    heroTitle2: "अब आसान",
    heroDesc:
      "सरकारी और एनजीओ योजनाओं को खोजें और समझें।",
    findSchemes: "आपके लिए योजनाएं खोजें",
    searchResults: "खोज परिणाम",
    filters: "फ़िल्टर",

    overview: "सारांश",
    benefits: "लाभ",
    eligibility: "पात्रता",
    documents: "दस्तावेज़",
    howToApply: "कैसे आवेदन करें",
    applyNow: "आधिकारिक वेबसाइट पर आवेदन करें",

    government: "सरकार",
    ngo: "एनजीओ",
    all: "सभी",

    /* STATS */
    statsTotal: "कुल योजनाएं",
    statsCentral: "केंद्रीय योजनाएं",
    statsStates: "राज्य/केंद्र शासित प्रदेश",

    /* HOW IT WORKS */
    howTitle: "यह कैसे काम करता है",
    howSubtitle: "आवेदन करने के आसान चरण",

    step1Title: "विवरण भरें",
    step1Desc: "अपनी बुनियादी जानकारी दर्ज करें।",

    step2Title: "खोजें",
    step2Desc: "हम आपके लिए योजनाएं ढूंढते हैं।",

    step3Title: "चुनें और आवेदन करें",
    step3Desc: "उपयुक्त योजना के लिए आवेदन करें।",
  },
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(
    localStorage.getItem("lang") || "en"
  )

  useEffect(() => {
    localStorage.setItem("lang", lang)
  }, [lang])

  function changeLanguage(newLang) {
    setLang(newLang)
  }

  const t = translations[lang]

  return (
    <LanguageContext.Provider
      value={{ lang, changeLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
