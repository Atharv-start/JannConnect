import { createContext, useContext, useState, useEffect } from "react"

const LanguageContext = createContext()

const translations = {
  en: {
    signIn: "Sign In",
    logout: "Logout",
    greeting: "Hi",
    searchPlaceholder: "Search schemes...",
    heroTitle1: "Schemes",
    heroTitle2: "Made Easy",
    heroDesc:
      "Discover, understand, and apply for Government and NGO schemes.",
    findSchemes: "View Schemes",
    searchResults: "Search Results",
    filters: "Filters",
    browseCategory: "Browse by Category",
    ngoSchemesTitle: "NGO Schemes",

    overview: "Overview",
    benefits: "Benefits",
    eligibility: "Eligibility",
    documents: "Documents",
    howToApply: "How to Apply",
    applyNow: "Apply on Official Website",

    government: "Government",
    ngo: "NGO",
    all: "All",

    /* CATEGORIES */
    agriculture: "Agriculture",
    education: "Education",
    finance: "Finance",
    health: "Health",
    womenChild: "Women & Child",
    employment: "Employment",

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

    /* CHATBOT */
    chatbotInputPlaceholder: "Ask me anything...",
    chatbotProcessing: "Processing...",
    chatbotListingIntro: "Here are relevant schemes:",
    chatbotNoMatches: "Sorry, I couldn't find matching schemes. Try different keywords.",
    chatbotError: "Sorry, something went wrong. Please try again.",
    chatbotSend: "Send",
    chatbotListen: "Listen",
    chatbotStop: "Stop",

    noEligibility: "No eligibility conditions",
    noDocuments: "No documents required",
    noOverview: "No overview available",
    noBenefits: "No benefits information available",
  },

  hi: {
    signIn: "साइन इन",
    logout: "लॉग आउट",
    greeting: "नमस्ते",
    searchPlaceholder: "योजनाएं खोजें...",
    heroTitle1: "योजनाएं",
    heroTitle2: "अब आसान",
    heroDesc:
      "सरकारी और एनजीओ योजनाओं को खोजें और समझें।",
    findSchemes: "योजनाएँ देखें",
    searchResults: "खोज परिणाम",
    filters: "फ़िल्टर",
    browseCategory: "श्रेणी के अनुसार ब्राउज़ करें",
    ngoSchemesTitle: "एनजीओ योजनाएं",

    overview: "सारांश",
    benefits: "लाभ",
    eligibility: "पात्रता",
    documents: "दस्तावेज़",
    howToApply: "कैसे आवेदन करें",
    applyNow: "आधिकारिक वेबसाइट पर आवेदन करें",

    government: "सरकार",
    ngo: "एनजीओ",
    all: "सभी",

    /* CATEGORIES */
    agriculture: "कृषि",
    education: "शिक्षा",
    finance: "वित्त",
    health: "स्वास्थ्य",
    womenChild: "महिलाएं और बच्चे",
    employment: "रोजगार",

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

    /* CHATBOT */
    chatbotInputPlaceholder: "मुझसे कुछ भी पूछें...",
    chatbotProcessing: "प्रक्रियाधीन...",
    chatbotListingIntro: "ये प्रासंगिक योजनाएं हैं:",
    chatbotNoMatches: "माफ कीजिए, मुझे मेल खाने वाली योजनाएं नहीं मिलीं।",
    chatbotError: "माफ कीजिए, कुछ गलत हुआ।",
    chatbotSend: "भेजें",
    chatbotListen: "सुनें",
    chatbotStop: "रोकें",

    noEligibility: "कोई पात्रता शर्त नहीं",
    noDocuments: "कोई दस्तावेज़ आवश्यक नहीं",
    noOverview: "कोई विवरण उपलब्ध नहीं",
    noBenefits: "कोई लाभ जानकारी उपलब्ध नहीं",
  },

  mr: {
    signIn: "साइन इन",
    logout: "लॉगआउट",
    greeting: "नमस्कार",
    searchPlaceholder: "योजना शोधा...",
    heroTitle1: "योजना",
    heroTitle2: "सहज आहे",
    heroDesc: "सरकारी आणि एनजीओ योजना शोधा, समजून घ्या आणि अर्ज करा।",
    findSchemes: "योजना पहा",
    searchResults: "शोध परिणाम",
    filters: "फिल्टर",
    browseCategory: "श्रेणीनुसार ब्राउज करा",
    ngoSchemesTitle: "एनजीओ योजना",

    overview: "विहंगावलोकन",
    benefits: "फायदे",
    eligibility: "पात्रता",
    documents: "दस्तऐवज",
    howToApply: "कसे अर्ज करावे",
    applyNow: "अधिकृत वेबसाइटवर अर्ज करा",

    government: "सरकार",
    ngo: "एनजीओ",
    all: "सर्व",

    /* CATEGORIES */
    agriculture: "कृषी",
    education: "शिक्षा",
    finance: "वित्त",
    health: "आरोग्य",
    womenChild: "महिला आणि बाल",
    employment: "रोजगार",

    /* STATS */
    statsTotal: "एकूण योजना",
    statsCentral: "केंद्रीय योजना",
    statsStates: "राज्य/संघ क्षेत्र",

    /* HOW IT WORKS */
    howTitle: "हे कसे काम करते",
    howSubtitle: "अर्ज करण्यासाठी सोपे पावले",

    step1Title: "तपशील भरा",
    step1Desc: "तुमची मूळ माहिती प्रविष्ट करा।",

    step2Title: "शोधा",
    step2Desc: "आम्ही तुमच्यासाठी योजना शोधतो।",

    step3Title: "निवडा आणि अर्ज करा",
    step3Desc: "सर्वात योग्य योजनेसाठी अर्ज करा।",

    /* CHATBOT */
    chatbotInputPlaceholder: "मला काही विचारा...",
    chatbotProcessing: "प्रक्रिया सुरू...",
    chatbotListingIntro: "येथे संबंधित योजना आहेत:",
    chatbotNoMatches: "माफ करा, मला मेळणाऱ्या योजना सापडल्या नाहीत।",

    noEligibility: "कोणतीही पात्रता अट नाही",
    noDocuments: "कोणतेही दस्तऐवज आवश्यक नाहीत",
    noOverview: "कोणताही विहंगावलोकन उपलब्ध नाही",
    noBenefits: "कोणतीही लाभ माहिती उपलब्ध नाही",
    chatbotError: "माफ करा, काहीतरी चूक झाली।",
    chatbotSend: "पाठवा",
    chatbotListen: "ऐका",
    chatbotStop: "थांबवा",
  },

  ta: {
    signIn: "உள்நுழைக",
    logout: "வெளியேறு",
    greeting: "வணக்கம்",
    searchPlaceholder: "திட்டங்களைத் தேடுங்கள்...",
    heroTitle1: "திட்டங்கள்",
    heroTitle2: "எளிதாக்கப்பட்டது",
    heroDesc: "அரசு மற்றும் என்ஜிஓ திட்டங்களைக் கண்டறியுங்கள், புரிந்துகொள்ளுங்கள் மற்றும் விண்ணப்பிக்கவும்.",
    findSchemes: "திட்டங்களைப் பார்க்கவும்",
    searchResults: "தேடல் முடிவுகள்",
    filters: "வடிப்பாக்கங்கள்",
    browseCategory: "வகைப்படி உலாவுங்கள்",
    ngoSchemesTitle: "என்ஜிஓ திட்டங்கள்",

    overview: "கண்ணோட்டம்",
    benefits: "நன்மைகள்",
    eligibility: "தகுதி",
    documents: "ஆவணங்கள்",
    howToApply: "பொருந்தக்கூடிய முறை",
    applyNow: "அதிகாரப்பூர்வ வலைதளத்தில் விண்ணப்பிக்கவும்",

    government: "அரசு",
    ngo: "என்ஜிஓ",
    all: "அனைத்து",

    /* CATEGORIES */
    agriculture: "விவசாயம்",
    education: "கல்வி",
    finance: "நிதி",
    health: "ஆரோக்கியம்",
    womenChild: "பெண் மற்றும் குழந்தை",
    employment: "வேலைவாய்ப்பு",

    /* STATS */
    statsTotal: "மொத்த திட்டங்கள்",
    statsCentral: "மத்திய திட்டங்கள்",
    statsStates: "மாநிலங்கள்/யூடி",

    /* HOW IT WORKS */
    howTitle: "இது எவ்வாறு செயல்படுகிறது",
    howSubtitle: "விண்ணப்பிப்பதற்கான எளிய படிகள்",

    step1Title: "விபரங்களை உள்ளிடவும்",
    step1Desc: "உங்கள் அடிப்படை விபரங்களை உள்ளிடவும்।",

    step2Title: "தேடுக",
    step2Desc: "உங்களுக்கான திட்டங்களை நாம் கண்டறிகிறோம்।",

    step3Title: "தேர்ந்தெடுக்கவும் மற்றும் விண்ணப்பிக்கவும்",
    step3Desc: "மிகவும் பொருத்தமான திட்டத்திற்கு விண்ணப்பிக்கவும்।",

    /* CHATBOT */
    chatbotInputPlaceholder: "எனக்கு எதையும் கேளுங்கள்...",
    chatbotProcessing: "செயல்பாட்டில்...",
    chatbotListingIntro: "இவை பொருத்தமான திட்டங்கள்:",
    chatbotNoMatches: "மன்னிக்கவும், பொருந்தக்கூடிய திட்டங்களை என்னால் கண்டுபிடிக்க முடியவில்லை।",

    noEligibility: "தகுதி நிபந்தனைகள் இல்லை",
    noDocuments: "ஆவணங்கள் தேவையில்லை",
    noOverview: "கண்ணோட்டம் கிடைக்கவில்லை",
    noBenefits: "நன்மைகளின் தகவல் கிடைக்கவில்லை",
    chatbotError: "மன்னிக்கவும், ஏதோ தவறாய் போனது.",
    chatbotSend: "அனுப்பவும்",
    chatbotListen: "கேளுங்கள்",
    chatbotStop: "நிறுத்திவிடுங்கள்",
  },

  te: {
    signIn: "సైన్ ఇన్",
    logout: "లాగ్‌అవుట్",
    greeting: "హలో",
    searchPlaceholder: "పథకాలను వెతకండి...",
    heroTitle1: "పథకాలు",
    heroTitle2: "సులభతరమైనవి",
    heroDesc: "ప్రభుత్వ మరియు NGO పథకాలను కనుగొనండి, అర్థం చేసుకోండి మరియు ఆవేదన చేయండి.",
    findSchemes: "పథకాలను చూడండి",
    searchResults: "శోధన ఫలితాలు",
    filters: "ఫిల్టర్‌లు",
    browseCategory: "వర్గం ద్వారా విహార చేయండి",
    ngoSchemesTitle: "NGO పథకాలు",

    overview: "చిత్రసాధారణ",
    benefits: "ప్రయోజనాలు",
    eligibility: "అర్హత",
    documents: "పత్రాలు",
    howToApply: "ఎలా దరఖాస్తు చేయాలి",
    applyNow: "అధికృత వెబ్‌సైట్‌లో ఆవేదన చేయండి",

    government: "ప్రభుత్వం",
    ngo: "NGO",
    all: "సమస్తం",

    /* CATEGORIES */
    agriculture: "కృషి",
    education: "విద్య",
    finance: "ఆర్థిక",
    health: "ఆరోగ్య",
    womenChild: "మహిళలు & పిల్లలు",
    employment: "ఉద్యోగం",

    /* STATS */
    statsTotal: "మొత్తం పథకాలు",
    statsCentral: "కేంద్ర పథకాలు",
    statsStates: "రాష్ట్రాలు/UT",

    /* HOW IT WORKS */
    howTitle: "ఇది ఎలా పనిచేస్తుంది",
    howSubtitle: "దరఖాస్తు చేయడానికి సులభమైన దశలు",

    step1Title: "వివరాలను నమోదు చేయండి",
    step1Desc: "మీ ప్రాథమిక వివరాలను నమోదు చేయండి.",

    step2Title: "వెతకండి",
    step2Desc: "మీ కోసం పథకాలను మేము కనుగొంటాము.",

    step3Title: "ఎంచుకోండి & దరఖాస్తు చేయండి",
    step3Desc: "అత్యంత అనుకూలమైన పథకానికి దరఖాస్తు చేయండి.",

    /* CHATBOT */

    noEligibility: "అర్హత నిబন్ధనలు లేవు",
    noDocuments: "పత్రాలు అవసరం లేదు",
    noOverview: "చిత్రసాధారణ అందుబాటులో లేదు",    noBenefits: "ప్రయోజనాల సమాచారం అందుబాటులో లేదు",    chatbotInputPlaceholder: "నాకు ఏదైనా అడగండి...",
    chatbotProcessing: "ప్రక్రియలో...",
    chatbotListingIntro: "ఇవి సంబంధిత పథకాలు:",
    chatbotNoMatches: "క్షమించండి, సరిపోలే పథకాలను కనుగొనలేకపోయాను.",
    chatbotError: "క్షమించండి, ఏదో తప్పుగా జరిగింది.",
    chatbotSend: "పంపించు",
    chatbotListen: "ఆలకించండి",
    chatbotStop: "ఆపివేయండి",
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
