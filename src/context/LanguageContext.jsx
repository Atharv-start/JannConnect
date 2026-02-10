"use strict"

import { createContext, useContext, useState, useEffect } from "react"

const LanguageContext = createContext()

const base = {
  signIn: "Sign In",
  logout: "Logout",
  greeting: "Hi",
  searchPlaceholder: "Search schemes...",
  heroTitle1: "Schemes",
  heroTitle2: "Made Easy",
  heroDesc: "Discover, understand, and apply for Government and NGO schemes.",
  findSchemes: "View Schemes",
  learnMore: "Learn More",

  toggleTheme: "Toggle Theme",
  languageLabel: "Language:",

  trust1: "✔ 1000+ Schemes",
  trust2: "✔ Central & State",
  trust3: "✔ Government + NGO",
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

  agriculture: "Agriculture",
  education: "Education",
  finance: "Finance",
  health: "Health",
  womenChild: "Women & Child",
  employment: "Employment",

  statsTotal: "Total Schemes",
  statsCentral: "Central Schemes",
  statsStates: "States/UTs",

  howTitle: "How it works",
  howSubtitle: "Easy steps to apply for schemes",

  step1Title: "Enter Details",
  step1Desc: "Start by entering your basic details.",
  step2Title: "Search",
  step2Desc: "We find the best schemes for you.",
  step3Title: "Select & Apply",
  step3Desc: "Apply to the most suitable scheme.",

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

  loading: "Loading...",
  loadingSchemes: "Loading schemes…",
  schemeNotFound: "Scheme not found",
  ttsNotSupported: "Text-to-speech not supported in this browser.",
  readAloud: "Read Aloud",
  stopReading: "Stop Reading",
  allIndia: "All India",
  allIndiaCentral: "All India (Central Schemes)",

  age: "Age",
  annualIncome: "Annual Income (₹)",
  gender: "Gender",
  any: "Any",
  male: "Male",
  female: "Female",
  enterAge: "Enter age",
  enterIncome: "Enter income",
  noSteps: "No application steps available.",
  aboutTitle: "About",
  aboutP1:
    "JannConnect is a National Platform that aims to offer one-stop search and discovery of Government and NGO schemes.",
  aboutP2:
    "It provides a simple, technology-based solution to discover scheme information based on the eligibility of the citizen.",
  aboutP3:
    "The platform helps users find the right schemes for them and also guides them on how to apply for each scheme without visiting multiple government websites.",
  viewMore: "View More →",

  // New keys for forms, footer, buttons, chatbot
  tagline: "Government & NGO Scheme Portal",
  fullName: "Full Name",
  emailAddress: "Email Address",
  password: "Password",
  view: "View",
  viewDetails: "View Details",
  apply: "Apply",
  aboutUs: "About Us",
  privacyPolicy: "Privacy Policy",
  disclaimer: "Disclaimer",
  ministries: "Ministries",
  departments: "Departments",
  statesUTs: "States / UTs",
  governmentSchemes: "Government Schemes",
  supportLabel: "Support",
  help: "Help",
  feedback: "Feedback",
  contactUs: "Contact Us",
  chatbotInvalidAge: "Please enter a valid age.",
  chatbotAskGender: "What is your gender? (Male/Female)",
  chatbotNoSchemes: "No schemes found for your profile.",
  chatbotSchemesIntro: "Here are schemes you may be eligible for:",
  chatbotPrompt: "Tell me what type of schemes you are looking for.",

  faqLabel: "Frequently Asked Questions",
  faqHeading: "Checkout our knowledge base for some of your answers!",
  faqs: [
    {
      q: "What is JannConnect?",
      a: "JannConnect is a platform that helps citizens easily find government and NGO schemes in one place.",
    },
    {
      q: "How will JannConnect help common citizens?",
      a: "It simplifies scheme discovery by showing eligibility, benefits, required documents, and application steps.",
    },
    {
      q: "Can I apply for schemes through JannConnect?",
      a: "JannConnect provides official links. Applications are completed on official scheme portals.",
    },
    {
      q: "How does JannConnect work?",
      a: "You can search or filter schemes based on your profile to see relevant schemes.",
    },
    {
      q: "What information can I find about a scheme?",
      a: "Benefits, eligibility, documents required, and application steps.",
    },
  ],
  importantLinks: "Important Links",
  copyRight: "© 2026 JannConnect",
}

const translations = {
  en: { ...base },

  hi: {
    ...base,
    signIn: "साइन इन",
    logout: "लॉग आउट",
    greeting: "नमस्ते",
    searchPlaceholder: "योजनाएं खोजें...",
    heroTitle1: "योजनाएं",
    heroTitle2: "अब आसान",
    heroDesc: "सरकारी और एनजीओ योजनाओं को खोजें और समझें।",
    findSchemes: "योजनाएँ देखें",
    searchResults: "खोज परिणाम",
    filters: "फ़िल्टर",
    browseCategory: "श्रेणी के अनुसार ब्राउज़ करें",

    overview: "सारांश",
    benefits: "लाभ",
    eligibility: "पात्रता",
    documents: "दस्तावेज़",
    howToApply: "कैसे आवेदन करें",
    applyNow: "आधिकारिक वेबसाइट पर आवेदन करें",

    learnMore: "और जानें",
    trust1: "✔ 1000+ योजनाएँ",
    trust2: "✔ केंद्रीय और राज्य",
    trust3: "✔ सरकारी + एनजीओ",

    aboutTitle: "हमारे बारे में",
    aboutP1:
      "JannConnect एक राष्ट्रीय प्लेटफ़ॉर्म है जो सरकारी और एनजीओ योजनाओं की एक-छत खोज और खोज सुविधा प्रदान करता है।",
    aboutP2:
      "यह नागरिक की पात्रता के आधार पर योजनाओं की जानकारी खोजने के लिए एक सरल, प्रौद्योगिकी-आधारित समाधान प्रदान करता है।",
    aboutP3:
      "यह प्लेटफ़ॉर्म उपयोगकर्ताओं को उनके लिए सही योजनाएँ खोजने में मदद करता है और प्रत्येक योजना के लिए आवेदन प्रक्रिया बताता है।",
    viewMore: "और देखें →",

    faqLabel: "अक्सर पूछे जाने वाले प्रश्न",
    faqHeading: "हमारी नॉलेज बेस देखें, शायद आपके कुछ सवालों के जवाब मिल जाएँ!",
    faqs: [
      {
        q: "JannConnect क्या है?",
        a: "JannConnect एक प्लेटफ़ॉर्म है जो नागरिकों को सरकारी और एनजीओ योजनाएँ एक ही जगह पर आसानी से खोजने में मदद करता है।",
      },
      {
        q: "JannConnect आम नागरिकों की कैसे मदद करेगा?",
        a: "यह पात्रता, लाभ, आवश्यक दस्तावेज़ और आवेदन चरण दिखाकर योजना खोज को सरल बनाता है।",
      },
      {
        q: "क्या मैं JannConnect के माध्यम से योजनाओं के लिए आवेदन कर सकता हूँ?",
        a: "JannConnect आधिकारिक लिंक प्रदान करता है। आवेदन आधिकारिक पोर्टलों पर पूरा होता है।",
      },
      {
        q: "JannConnect कैसे काम करता है?",
        a: "आप अपनी प्रोफ़ाइल के अनुसार योजनाओं को खोज या फ़िल्टर कर सकते हैं।",
      },
      {
        q: "मुझे किसी योजना के बारे में क्या जानकारी मिल सकती है?",
        a: "लाभ, पात्रता, आवश्यक दस्तावेज़ और आवेदन चरण।",
      },
    ],
  },

  mr: {
    ...base,
    signIn: "साइन इन",
    logout: "लॉगआउट",
    greeting: "नमस्कार",
    searchPlaceholder: "योजना शोधा...",
    heroTitle1: "योजना",
    heroTitle2: "सहज आहे",
    heroDesc: "सरकारी आणि एनजीओ योजना शोधा, समजून घ्या आणि अर्ज करा।",
    findSchemes: "योजना पहा",
    browseCategory: "श्रेणीनुसार ब्राउझ करा",
    learnMore: "अधिक जाणून घ्या",
    trust1: "✔ 1000+ योजना",
    trust2: "✔ केंद्रीय व राज्य",
    trust3: "✔ सरकारी + NGO",
    aboutTitle: "बद्दल",
    aboutP1:
      "JannConnect हा राष्ट्रीय प्लॅटफॉर्म आहे जो सरकारी आणि NGO योजना शोधण्यासाठी आणि शोधण्याची एक-ठिकाण सेवा देते.",
    aboutP2:
      "हा नागरिकाच्या पात्रतेनुसार योजना माहिती शोधण्यासाठी साधा तंत्रज्ञानाधारित उपाय प्रदान करतो.",
    aboutP3:
      "प्लॅटफॉर्म वापरकर्त्यांना योग्य योजना शोधण्यात मदत करतो आणि प्रत्येक योजनेसाठी अर्ज कसा करावा हे मार्गदर्शन करतो.",
    faqLabel: "वारंवार विचारले जाणारे प्रश्न",
    faqHeading: "तुमच्या काही प्रश्नांची उत्तरे आमच्या नॉलेज बेसमध्ये पहा!",
    faqs: [
      { q: "JannConnect म्हणजे काय?", a: "JannConnect एक प्लॅटफॉर्म आहे जे नागरिकांना सरकारी आणि NGO योजना एका ठिकाणी सुलभपणे शोधण्यास मदत करते." },
      { q: "JannConnect सामान्य नागरिकांना कसा मदत करेल?", a: "हे पात्रता, लाभ, आवश्यक कागदपत्रे आणि अर्ज चरण दाखवून योजना शोध सुलभ करते." },
      { q: "मी JannConnect द्वारे योजना साठी अर्ज करू शकतो का?", a: "JannConnect अधिकृत दुवे प्रदान करते. अर्ज अधिकृत पोर्टलवर पूर्ण होतात." },
      { q: "JannConnect कसे काम करते?", a: "आपण आपल्या प्रोफाइलनुसार योजना शोध किंवा फिल्टर करू शकता." },
      { q: "मला एका योजनेबद्दल काय माहिती मिळू शकते?", a: "लाभ, पात्रता, आवश्यक कागदपत्रे आणि अर्ज चरण." },
    ],
  },

  ta: {
    ...base,
    signIn: "உள்நுழைக",
    logout: "வெளியேறு",
    greeting: "வணக்கம்",
    searchPlaceholder: "திட்டங்களைத் தேடுங்கள்...",
    heroTitle1: "திட்டங்கள்",
    heroTitle2: "எளிதாக்கப்பட்டது",
    heroDesc: "அரசு மற்றும் என்ஜிஓ திட்டங்களைக் கண்டறியுங்கள், புரிந்து கொள்ளுங்கள் மற்றும் விண்ணப்பிக்கவும்.",
    findSchemes: "திட்டங்களைப் பார்க்கவும்",
    browseCategory: "வகைப்படி உலாவுங்கள்",
    learnMore: "மேலும் அறிய",
    trust1: "✔ 1000+ திட்டங்கள்",
    trust2: "✔ மத்திய மற்றும் மாநிலம்",
    trust3: "✔ அரசு + NGO",
    aboutTitle: "எங்கள் பற்றி",
    aboutP1: "JannConnect என்பது அரசாங்க மற்றும் NGO திட்டங்களை ஒரே இடத்தில் கண்டறிய உதவும் ஒரு தேசிய தளம்.",
    aboutP2: "இது நாகரீகர்களின் தகுதிக்கேற்ப திட்டத் தகவலைத் தேட எளிமையான தொழில்நுட்ப தீர்வை வழங்குகிறது.",
    aboutP3: "பயனர்கள் தங்களுக்கான சரியான திட்டங்களை கண்டறியலாம் மற்றும் ஒவ்வொரு திட்டத்திற்கும் விண்ணப்பிக்க எப்படி என்பதை அறியலாம்.",
    faqLabel: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
    faqHeading: "உங்கள் சில கேள்விகளுக்கு பதில்களில் எங்கள் அறிவுத் தளம் உதவும்!",
    faqs: [
      { q: "JannConnect என்பது என்ன?", a: "JannConnect என்பது நாகரீகர்களுக்கு அரசு மற்றும் NGO திட்டங்களை ஒரே இடத்தில் எளிதாக கண்டறிய உதவும் ஒரு தளம்." },
      { q: "JannConnect எப்படி உதவும்?", a: "இது தகுதி, நன்மைகள், தேவையான ஆவணங்கள் மற்றும் விண்ணப்ப படிகளை காட்டி திட்டத் தேடலை எளிமைப்படுத்துகிறது." },
    ],
  },

  te: {
    ...base,
    signIn: "సైన్ ఇన్",
    logout: "లాగ్‌అవుట్",
    greeting: "హలో",
    searchPlaceholder: "పథకాలను వెతకండి...",
    heroTitle1: "పథకాలు",
    heroTitle2: "సులభతరమైనవి",
    heroDesc: "ప్రభుత్వ మరియు NGO పథకాలను కనుగొనండి, అర్థం చేసుకోండి మరియు అప్లై చేయండి.",
    findSchemes: "పథకాలను చూడండి",
    browseCategory: "వర్గం ద్వారా బ్రౌజ్ చేయండి",
    learnMore: "మరింత తెలుసుకోండి",
    trust1: "✔ 1000+ పథకాలు",
    trust2: "✔ కేంద్ర & రాష్ట్ర",
    trust3: "✔ ప్రభుత్వం + NGO",
    aboutTitle: "గురించి",
    aboutP1: "JannConnect ఒక జాతీయ వేదిక, ఇది ప్రభుత్వం మరియు NGO పథకాలను ఒకే స్థలంలో కనుగొనడానికి సహాయపడుతుంది.",
    aboutP2: "పౌరుల అర్హత ఆధారంగా పథకం సమాచారం కనుగొనడానికి ఇది సాంకేతిక పరిష్కారం అందిస్తుంది.",
    aboutP3: "ప్లాట్‌ఫారమ్ వినియోగదారులకు సరైన పథకాలను కనుగొనటంలో మరియు దానికి ఎలా అప్లై చేయాలో మార్గనిర్దేశం చేస్తుంది.",
    faqLabel: "తరచుగా అడిగే ప్రశ్నలు",
    faqHeading: "మీ కొన్ని ప్రశ్నల కోసం మా నాలెడ్జ్ బేస్ చూడండి!",
    faqs: [ { q: "JannConnect అంటే ఏమిటి?", a: "JannConnect ఒక ప్లాట్‌ఫారం, ఇది పౌరులకు ప్రభుత్వం మరియు NGO పథకాలను ఒకే వెళ్ల ఉంది." } ],
  },

  or: {
    ...base,
    signIn: "ସାଇନ୍ ଇନ୍",
    logout: "ଲଗ୍ ଅଉଟ୍",
    greeting: "ନମସ୍କାର",
    searchPlaceholder: "ଯୋଜନାଗୁଡ଼ିକୁ ଖୋଜନ୍ତୁ...",
    heroTitle1: "ଯୋଜନା",
    heroTitle2: "ସହଜ",
    heroDesc: "ସରକାରୀ ଏବଂ ଏନଜିଓ ଯୋଜନାଗୁଡ଼ିକୁ ଖୋଜନ୍ତୁ, ବୁଝନ୍ତୁ ଏବଂ ଆବେଦନ କରନ୍ତୁ।",
    findSchemes: "ଯୋଜନା ଦେଖନ୍ତୁ",
    browseCategory: "ଶ୍ରେଣୀ ଅନୁସାରେ ବ୍ରାଉଜ୍",
    learnMore: "ଅଧିକ ଜାଣନ୍ତୁ",
    trust1: "✔ 1000+ ଯୋଜନା",
    trust2: "✔ କେନ୍ଦ୍ର ଏବଂ ରାଜ୍ୟ",
    trust3: "✔ ସରକାର + ଏନଜିଓ",
    aboutTitle: "ବିଷୟରେ",
    aboutP1: "JannConnect ଏକ ଜାତୀୟ ପ୍ଲାଟଫର୍ମ ଯାହା ସରକାରୀ ଏବଂ ଏନଜିଓ ଯୋଜନାଗୁଡ଼ିକୁ ଏକ ସ୍ଥାନରେ ଖୋଜିବାକୁ ସୁବିଧା ଦେଉଛି।",
    aboutP2: "ଏହା ନାଗରିକଙ୍କର ପାତ୍ରତା ଆଧାରରେ ଯୋଜନା ସୂଚନା ଖୋଜିବା ପାଇଁ ସରଳ ଟେକ୍ନୋଲୋଜି-ଭିତ୍ତିକ ସମାଧାନ ପ୍ରଦାନ କରେ।",
    aboutP3: "ପ୍ଲାଟଫର୍ମଟି ବ୍ୟବହାରକାରୀଙ୍କୁ ସଠିକ୍ ଯୋଜନା ଖୋଜିବାରେ ସାହାଯ୍ୟ କରେ।",
    faqLabel: "ପ୍ରାୟ: ପ୍ରଶ୍ନ",
    faqHeading: "ଆମର ନଲେଜ ବେସ୍ ଦେଖନ୍ତୁ — ଆପଣଙ୍କ କିଛି ପ୍ରଶ୍ନର ଉତ୍ତର ମିଳିପାରେ!",
    faqs: [ { q: "JannConnect କ'ଣ?", a: "JannConnect ଏକ ପ୍ଲାଟଫର୍ମ ଯାହା ନାଗରିକଙ୍କୁ ସରକାରୀ ଏବଂ NGO ଯୋଜନାଗୁଡିକୁ ସହଜରେ ଖୋଜିବାରେ ସାହାଯ୍ୟ କରେ।" } ],
  },

  bn: {
    ...base,
    signIn: "সাইন ইন",
    logout: "লগ আউট",
    greeting: "নমস্কার",
    searchPlaceholder: "স্কিম খুঁজুন...",
    heroTitle1: "স্কিম",
    heroTitle2: "সহজ করা হয়েছে",
    heroDesc: "সরকারি এবং এনজিও স্কিম আবিষ্কার করুন, বুঝুন এবং আবেদন করুন।",
    findSchemes: "স্কিম দেখুন",
    browseCategory: "বিভাগ অনুযায়ী ব্রাউজ করুন",
    learnMore: "আরও জানুন",
    trust1: "✔ 1000+ স্কিম",
    trust2: "✔ কেন্দ্র ও রাজ্য",
    trust3: "✔ সরকার + এনজিও",
    aboutTitle: "সম্পর্কে",
    aboutP1: "JannConnect একটি জাতীয় প্ল্যাটফর্ম যা সরকারি এবং এনজিও স্কিম এক জায়গায় খুঁজে পেতে সাহায্য করে।",
    aboutP2: "এটি নাগরিকদের যোগ্যতার উপর ভিত্তি করে স্কিম তথ্য খুঁজে পাওয়ার সহজ প্রযুক্তি-ভিত্তিক সমাধান সরবরাহ করে।",
    aboutP3: "প্ল্যাটফর্মটি ব্যবহারকারীদের তাদের জন্য উপযুক্ত স্কিম খুঁজে পেতে এবং প্রতিটি স্কিমে কীভাবে আবেদন করতে হয় তা নির্দেশ করে।",
    faqLabel: "প্রায়শই জিজ্ঞাস্য প্রশ্ন",
    faqHeading: "আপনার কিছু প্রশ্নের উত্তর আমাদের জ্ঞানভাণ্ডারে দেখুন!",
    faqs: [ { q: "JannConnect কি?", a: "JannConnect একটি প্ল্যাটফর্ম যা নাগরিকদের সরকারি এবং এনজিও স্কিম এক জায়গায় সহজে খুঁজে পেতে সাহায্য করে।" } ],
  },

  ml: {
    ...base,
    signIn: "സൈൻ ഇൻ",
    logout: "ലോഗ് ഔട്ട്",
    greeting: "നമസ്കാരം",
    searchPlaceholder: "സ്കീമുകൾ തിരയുക...",
    heroTitle1: "പദ്ധതികൾ",
    heroTitle2: "സുലഭമാക്കി",
    heroDesc: "സര്‍ക്കാര്‍ & എന്‍ജിഒ പദ്ധതികള്‍ കണ്ടെത്തുക, മനസ്സിലാക്കുക եւ അപേക്ഷിക്കുക.",
    findSchemes: "പദ്ധതികള്‍ കാണുക",
    browseCategory: "വിഭാഗം അനുസരിച്ച് ബ്രൗസ് ചെയ്യുക",
    learnMore: "കൂടുതൽ അറിയുക",
    trust1: "✔ 1000+ പദ്ധതികൾ",
    trust2: "✔ കേന്ദ്രവും സംസ്ഥാനവും",
    trust3: "✔ സർക്കാർ + എൻജിഒ",
    aboutTitle: "കുറിച്ച്",
    aboutP1: "JannConnect ഒരു ദേശീയ പ്ലാറ്റ്ഫോം ആണ്, ഇത് സർക്കാർ & എന്‍ജിഒ പദ്ധതികള്‍ ഒരു സൈറ്റിൽ കണ്ടെത്താൻ സഹായിക്കുന്നു.",
    aboutP2: "ഇത് പൗരരുടെ യോഗ്യതയുടെ അടിസ്ഥാനത്തിൽ പദ്ധതി വിവരങ്ങൾ കണ്ടെത്താൻ എളുപ്പമുള്ള സാങ്കേതിക പരിഹാരം നൽകുന്നു.",
    aboutP3: "പ്ലാറ്റ്ഫോം ഉപയോക്താക്കളെ ശരിയായ പദ്ധതികൾ കണ്ടെത്താൻ സഹായിക്കുകയും, അതിൽ അപേക്ഷിക്കാനുള്ള മാർഗ്ഗനിർദ്ദേശം നൽകുകയും ചെയ്യുന്നു.",
    faqLabel: "താത്പര്യമുള്ള ചോദ്യങ്ങൾ",
    faqHeading: "നിങ്ങളുടെ ചില ചോദ്യങ്ങൾക്ക് ഉത്തരം ഞങ്ങളുടെ നോളേജ് ബേസിൽ കണ്ടെത്തൂ!",
    faqs: [ { q: "JannConnect എന്താണ്?", a: "JannConnect പൗരന്മാർക്ക് സർക്കാർ & എന്‍ജിഒ പദ്ധതികൾ എളുപ്പത്തിൽ കണ്ടെത്താൻ സഹായിക്കുന്ന ഒരു പ്ലാറ്റ്ഫോം ആണ്." } ],
  },

  gu: {
    ...base,
    signIn: "સાઇન ઇન",
    logout: "લોગઆઉટ",
    greeting: "નમસ્તે",
    searchPlaceholder: "યોજનાઓ શોધો...",
    heroTitle1: "યોજનાઓ",
    heroTitle2: "સગવડ બનાવેલ",
    heroDesc: "સરકારી અને NGO યોજનાઓ શોધો, સમજો અને અરજી કરો.",
    findSchemes: "યોજનાઓ જુઓ",
    browseCategory: "વિભાગ અનુસાર બ્રાઉઝ કરો",
    learnMore: "વધુ જાણો",
    trust1: "✔ 1000+ યોજનાઓ",
    trust2: "✔ કેન્દ્ર અને રાજ્ય",
    trust3: "✔ સરકાર + NGO",
    aboutTitle: "વિશે",
    aboutP1: "JannConnect એક રાષ્ટ્રીય પ્લેટફોર્મ છે જે સરકારી અને NGO યોજનાઓ એકજ જગ્યાએ શોધવાની સુવિધા આપે છે.",
    aboutP2: "આ તે નાગરિકોની પાત્રતા મુજબ યોજના માહિતી શોધવા માટે સરળ ટેકનોલોજી આધારિત સોલ્યુશન પ્રદાન કરે છે.",
    aboutP3: "પ્લેટફોર્મ વપરાશકર્તાઓને યોગ્ય યોજનાઓ શોધવામાં મદદ કરે છે અને કઈ રીતે અરજી કરવી તે જણાવે છે.",
    faqLabel: "સામાન્ય પ્રશ્નો",
    faqHeading: "તમારા કેટલાક સવાલોના જવાબ માટે અમારી નોલેજ બેસ જુઓ!",
    faqs: [ { q: "JannConnect શું છે?", a: "JannConnect નાગরিকોને સરકારી અને NGO યોજનાઓને એક સ્થળે સરળતાથી શોધવામાં મદદ કરે છે." } ],
  },
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en")

  useEffect(() => {
    localStorage.setItem("lang", lang)
  }, [lang])

  function changeLanguage(newLang) {
    setLang(newLang)
  }

  const t = translations[lang] || translations.en

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
