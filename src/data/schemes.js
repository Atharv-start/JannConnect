const schemes = [
  {
    id: "SCH021",
    name: "National Action Plan for Drug Demand Reduction (NAPDDR)",
    type: "ngo",
    targetGroup: ["substance_abuse"],
    states: ["All"],
    eligibility: {},
    benefits:
      "Counselling, rehabilitation, awareness programmes, de-addiction support.",
    documentsRequired: [],
    applicationProcess: [
      "Apply via NGO or hospital",
      "Counselling",
      "Rehabilitation",
    ],
    applyLink: "https://socialjustice.gov.in/schemes/42",
    simpleExplanation: {
      en: "Helps people recover from alcohol and drug addiction.",
      hi: "नशा मुक्ति और पुनर्वास सहायता।",
    },
  },

  {
    id: "SCH022",
    name: "NITI Internship Scheme",
    type: "government",
    targetGroup: ["student"],
    states: ["All"],
    eligibility: { minAge: 18 },
    benefits:
      "Policy exposure + internship completion certificate.",
    documentsRequired: ["Marksheets", "NOC"],
    applicationProcess: [
      "Apply online (1–10 every month)",
      "Selection",
      "Internship",
    ],
    applyLink: "https://www.myscheme.gov.in/schemes/niti-i",
    simpleExplanation: {
      en:
        "Government internship for undergraduate and postgraduate students.",
      hi: "छात्रों के लिए नीति आधारित सरकारी इंटर्नशिप।",
    },
  },

  {
    id: "SCH023",
    name:
      "National Means-cum-Merit Scholarship Scheme (NMMSS)",
    type: "government",
    targetGroup: ["student"],
    states: ["All"],
    eligibility: { maxIncome: 350000 },
    benefits:
      "₹12,000 yearly scholarship for Class 9–12 students.",
    documentsRequired: [
      "Aadhaar",
      "Income Certificate",
      "Marksheets",
    ],
    applicationProcess: ["Apply on NSP portal"],
    applyLink: "https://scholarships.gov.in",
    simpleExplanation: {
      en:
        "Scholarship for bright students from poor families.",
      hi: "गरीब परिवारों के मेधावी छात्रों के लिए छात्रवृत्ति।",
    },
  },

  {
    id: "SCH024",
    name:
      "Pre-Matric Scholarship Scheme for SC & Others",
    type: "government",
    targetGroup: ["student"],
    states: ["All"],
    eligibility: {
      maxIncome: 250000,
      category: ["SC"],
    },
    benefits:
      "₹3500–₹8000 annual allowance + disability bonus.",
    documentsRequired: [
      "Aadhaar",
      "Income Certificate",
      "Caste Certificate",
    ],
    applicationProcess: [
      "Apply online",
      "School verification",
      "DBT",
    ],
    applyLink: "https://scholarships.gov.in",
    simpleExplanation: {
      en: "School support for SC students (Class 1–10).",
      hi: "SC छात्रों के लिए स्कूल सहायता।",
    },
  },

  {
    id: "SCH025",
    name: "SHRESHTA Residential Education Scheme",
    type: "ngo",
    targetGroup: ["student"],
    states: ["All"],
    eligibility: {
      category: ["SC"],
      maxIncome: 250000,
    },
    benefits:
      "Free residential education from Class 9–12.",
    documentsRequired: [
      "Aadhaar",
      "Income Certificate",
      "Caste Certificate",
    ],
    applicationProcess: [
      "Apply for NETS exam",
      "Counselling",
      "Admission",
    ],
    applyLink: "https://socialjustice.gov.in/schemes/41",
    simpleExplanation: {
      en:
        "Residential schooling for meritorious SC students.",
      hi: "SC छात्रों के लिए आवासीय शिक्षा।",
    },
  },

  {
    id: "SCH026",
    name: "Skilled Youth Startup Scheme (Sikkim)",
    type: "government",
    targetGroup: ["youth"],
    states: ["Sikkim"],
    eligibility: {
      minAge: 18,
      maxAge: 45,
      maxIncome: 800000,
    },
    benefits:
      "35–50% subsidy on startup projects + bank loan.",
    documentsRequired: [
      "Residence Certificate",
      "Income Certificate",
      "Project Report",
    ],
    applicationProcess: [
      "Submit DPR",
      "Committee approval",
      "Loan sanction",
    ],
    applyLink: "https://www.myscheme.gov.in/schemes/syss",
    simpleExplanation: {
      en: "Helps Sikkim youth start businesses.",
      hi: "सिक्किम युवाओं के लिए स्टार्टअप सहायता।",
    },
  },

  {
    id: "SCH027",
    name: "Women Scientist Scheme-C (WOS-C)",
    type: "government",
    targetGroup: ["women", "researcher"],
    states: ["All"],
    eligibility: {
      gender: "female",
      minAge: 27,
      maxAge: 45,
    },
    benefits:
      "₹25,000–₹35,000 monthly fellowship + IPR training.",
    documentsRequired: [
      "Education Certificates",
      "DOB Proof",
    ],
    applicationProcess: [
      "Apply online",
      "Selection",
      "Training",
    ],
    applyLink: "https://www.myscheme.gov.in/schemes/wos-c",
    simpleExplanation: {
      en:
        "Supports women scientists returning after career break.",
      hi:
        "कैरियर ब्रेक के बाद महिला वैज्ञानिकों को सहायता।",
    },
  },

  {
    id: "SCH028",
    name: "Atal Vayo Abhyuday Yojana (AVYAY)",
    type: "ngo",
    targetGroup: ["senior citizen"],
    states: ["All"],
    eligibility: { minAge: 60 },
    benefits:
      "Shelter, healthcare, assistive devices, elderly employment.",
    documentsRequired: ["Aadhaar", "Age Proof"],
    applicationProcess: [
      "Apply via NGO/State portal",
    ],
    applyLink: "https://socialjustice.gov.in/schemes/43",
    simpleExplanation: {
      en: "Welfare scheme for senior citizens.",
      hi: "वरिष्ठ नागरिकों के लिए कल्याण योजना।",
    },
  },

  {
    id: "SCH029",
    name:
      "Transport Allowance for Differently Abled (Puducherry)",
    type: "government",
    targetGroup: ["disabled"],
    states: ["Puducherry"],
    eligibility: {
      disabilityPercent: 40,
      maxIncome: 75000,
    },
    benefits: "₹300 monthly transport allowance.",
    documentsRequired: [
      "Aadhaar",
      "Disability Certificate",
      "Income Certificate",
    ],
    applicationProcess: [
      "Apply online or offline",
    ],
    applyLink:
      "https://www.myscheme.gov.in/schemes/gtadap",
    simpleExplanation: {
      en: "Travel support for disabled persons.",
      hi: "दिव्यांगों के लिए यात्रा सहायता।",
    },
  },

  {
    id: "SCH030",
    name:
      "Integrated Child Development Services (ICDS)",
    type: "government",
    targetGroup: ["child", "mother"],
    states: ["All"],
    eligibility: {
      minAge: 0,
      maxAge: 6,
    },
    benefits:
      "Nutrition, immunization, health checkups, preschool education.",
    documentsRequired: ["Aadhaar", "Birth Proof"],
    applicationProcess: ["Visit Anganwadi"],
    applyLink:
      "https://www.myscheme.gov.in/schemes/icdss",
    simpleExplanation: {
      en:
        "Nutrition and healthcare for children and mothers.",
      hi:
        "बच्चों और माताओं के लिए पोषण व स्वास्थ्य।",
    },
  },
]

export default schemes
