import { db } from "./firebase"
import { doc, setDoc } from "firebase/firestore"

// Paste your schemes array here
const schemes = [
  {
    id: "SCH021",
    name: "National Action Plan for Drug Demand Reduction (NAPDDR)",
    type: "ngo",
    category: ["Health"],
    targetGroup: ["substance_abuse", "families", "youth"],
    states: ["All"],
    eligibility: {
      minAge: 10,
      maxAge: 65,
    },
    benefits:
      "Counselling, rehabilitation, awareness programmes, treatment, aftercare and reintegration support.",
    documentsRequired: ["Aadhaar (if available)", "Medical referral (optional)"],
    applicationProcess: [
      "Approach registered NGO or Govt-supported de-addiction centre",
      "Initial counselling & assessment",
      "Treatment & rehabilitation",
      "Follow-up & reintegration support",
    ],
    applyLink: "https://socialjustice.gov.in/schemes/42",
    simpleExplanation: {
      en: "Helps people and families recover from alcohol and drug addiction.",
      hi: "नशा मुक्ति, इलाज और पुनर्वास सहायता।",
    },
  },

  {
    id: "SCH022",
    name: "NITI Internship Scheme",
    type: "government",
    category: ["Education"],
    targetGroup: ["student", "researcher"],
    states: ["All"],
    eligibility: {
      minAge: 18,
      education: ["UG", "PG", "PhD"],
      minAttendance: 75,
    },
    benefits:
      "₹10,000 monthly stipend, policy exposure, internship completion certificate.",
    documentsRequired: [
      "Marksheets",
      "NOC from Institution",
      "Marksheets of all semesters/years of graduation, PG, along with the degree (as applicable)",
    ],
    applicationProcess: [
      "Apply online on NITI Internship Portal (1st–10th of every month)",
      "Fill application form and select one Area of Interest",
      "Preview and verify all entered details",
      "Submit the application online",
      "Note Registration Number for future reference",
      "Check application status online",
    ],
    applyLink: "https://workforindia.niti.gov.in/intern/InternshipEntry/PCInternshipEntry.aspx",
    simpleExplanation: {
      en: "Government internship for students interested in policy and governance.",
      hi: "नीति और शासन में रुचि रखने वाले छात्रों के लिए इंटर्नशिप।",
    },
  },

  {
    id: "SCH023",
    name: "National Means-cum-Merit Scholarship Scheme (NMMSS)",
    type: "government",
    category: ["Education"],
    targetGroup: ["student"],
    states: ["All"],
    eligibility: {
      classRange: ["9", "10", "11", "12"],
      maxIncome: 350000,
      minMarks: 55,
    },
    benefits:
      "₹12,000 per year scholarship for Class 9–12 students via DBT.",
    documentsRequired: [
      "Aadhaar",
      "Income Certificate",
      "Caste Certificate (if applicable)",
      "Previous Year Marksheet",
      "Disability Certificate", 
      "Domicile Certificate",
    ],
    applicationProcess: [
      "Register on National Scholarship Portal (NSP)",
      "Login using Application ID and password",
      "Verify OTP and reset password",
      "Fill application form and upload documents",
      "Submit application on NSP",
      "Track payment status via PFMS portal",
    ],
    applyLink: "https://scholarships.gov.in",
    simpleExplanation: {
      en: "Supports meritorious students from low-income families.",
      hi: "गरीब परिवारों के मेधावी छात्रों के लिए छात्रवृत्ति।",
    },
  },

  {
    id: "SCH024",
    name: "Pre-Matric Scholarship for SC Students (Class 9 & 10)",
    type: "government",
    category: ["Education"],
    targetGroup: ["student"],
    states: ["All"],
    eligibility: {
      category: ["SC"],
      classRange: ["9", "10"],
      maxIncome: 250000,
    },
    benefits:
      "Monthly scholarship + book grant + disability allowance (if applicable).",
    documentsRequired: [
      "Aadhaar",
      "Income Certificate",
      "Caste Certificate",
      "School Bonafide",
      "Land Ownership Proof (Showing Less Than 10 Acres of Land)",
      "Bank Account Details",
      "Application Form in the Prescribed Format",
      "Academic Records (If Applicable)",
    ],
    applicationProcess: [
      "Collect application form from Head of Educational Institution",
      "Fill form and attach required documents",
      "Submit application to concerned authority within deadline",
      "Collect acknowledgement/receipt"
    ],
    applyLink: "https://scholarships.gov.in",
    simpleExplanation: {
      en: "Financial help for SC students studying in Class 9 and 10.",
      hi: "कक्षा 9 और 10 के SC छात्रों के लिए छात्रवृत्ति।",
    },
  },

  {
    id: "SCH025",
    name: "SHRESHTA Residential Education Scheme",
    type: "government",
    category: ["Education"],
    targetGroup: ["student"],
    states: ["All"],
    eligibility: {
      category: ["SC"],
      maxIncome: 250000,
      examRequired: "NETS",
    },
    benefits:
      "Free residential education from Class 9 to 12 in top private schools.",
    documentsRequired: [
      "Previous Class Mark Sheet",
      "Income Certificate",
      "Caste Certificate",
      "School Leaving Certificate or Transfer Certificate from Current School",
      "NETS Scorecard",
      "Admission Confirmation from Selected SHRESHTA School",
    ],
    applicationProcess: [
      "Register online for National Entrance Test for SHRESHTA on NTA portal",
      "Appear for the SHRESHTA entrance examination",
      "Check results and eligibility on NTA website",
      "Participate in online counselling and select preferred schools",
      "Confirm allotted school within stipulated time",
      "Report to allotted SHRESHTA school and complete admission formalities",
      "Attend bridge course if prescribed by the school"
    ],
    applyLink: "https://www.nta.ac.in/",
    simpleExplanation: {
      en: "Residential schooling for bright SC students.",
      hi: "SC छात्रों के लिए आवासीय शिक्षा योजना।",
    },
  },

  {
    id: "SCH026",
    name: "Skilled Youth Startup Scheme (Sikkim)",
    type: "government",
    category: ["Employment"],
    targetGroup: ["youth"],
    states: ["Sikkim"],
    eligibility: {
      minAge: 18,
      maxAge: 45,
      maxIncome: 800000,
      onePerFamily: true,
    },
    benefits:
      "35%–50% subsidy on approved project cost with bank loan support.",
    documentsRequired: [
      "Two recent passport-sized photographs.",
      "Sikkim Subject Certificate/COI/Residential Certificate.",
      "Educational certificates and mark sheets.",
      "Birth Certificate or Panchayat certification.",
      "Project Report verified by the concerned Line Department (2 copies).",
      "Voter ID card (as address proof).",
      "Unemployment Card from respective BAC.",
      "Land lease agreement or Land Parcha, if applicable.",
      "Relevant trade license or permit at the time of loan sanction.",
      "BPL certificate from DESME.",
      "Income certificate from BDO/SDM.",
      "NOC from SABCO/SIDICO.",
    ],
    applicationProcess: [
      "Submit application form (Annexure-I) with DPR and documents to District Industries Centre (DIC)",
      "Application reviewed by Selection Committee",
      "Approved project forwarded to bank for loan sanction",
      "Complete mandatory training before loan disbursement"
    ],
    applyLink: "https://www.myscheme.gov.in/schemes/syss",
    simpleExplanation: {
      en: "Helps Sikkim youth start self-employment ventures.",
      hi: "सिक्किम के युवाओं के लिए स्वरोज़गार सहायता।",
    },
  },

  {
    id: "SCH027",
    name: "Women Scientist Scheme-C (WOS-C)",
    type: "government",
    category: ["Women and Child"],
    targetGroup: ["women", "researcher"],
    states: ["All"],
    eligibility: {
      gender: "female",
      minAge: 27,
      maxAge: 45,
      careerBreakYears: 2,
      employmentStatus: "non-permanent",
    },
    benefits:
      "₹25,000–₹35,000 monthly fellowship + IPR & technology management training.",
    documentsRequired: [
      "Photograph",
      "Signature",
      "Proof of Date of Birth (Secondary School Leaving Certificate)",
      "Details of papers published/accepted",
      "Patent details (if any)",
      "Scholarship details (if any)",
      "Employment/Unemployment details",
    ],
    applicationProcess: [
      "Register online and create login credentials",
      "Fill application sections (Basic Details, Qualification, Employment, Publications, Photo/Signature)",
      "Select one coordination centre and preferred examination centre",
      "Review details and submit the application online",
    ],
    applyLink: "https://www.myscheme.gov.in/schemes/wos-c",
    simpleExplanation: {
      en: "Helps women scientists restart careers after a break.",
      hi: "कैरियर ब्रेक के बाद महिला वैज्ञानिकों को सहायता।",
    },
  },

  {
    id: "SCH028",
    name: "Atal Vayo Abhyuday Yojana (AVYAY)",
    type: "government",
    category: ["Health"],
    targetGroup: ["senior citizen"],
    states: ["All"],
    eligibility: {
      minAge: 60,
    },
    benefits:
      "Healthcare, shelter, assistive devices, helplines, livelihood support.",
    documentsRequired: ["Aadhaar", "Age Proof"],
    applicationProcess: [
      "Apply via NGO or State Social Welfare Department",
    ],
    applyLink: "https://socialjustice.gov.in/schemes/43",
    simpleExplanation: {
      en: "Comprehensive welfare support for senior citizens.",
      hi: "वरिष्ठ नागरिकों के लिए संपूर्ण कल्याण योजना।",
    },
  },

  {
    id: "SCH029",
    name: "Transport Allowance for Differently Abled (Puducherry)",
    type: "government",
    category: ["Finance"],
    targetGroup: ["disabled"],
    states: ["Puducherry"],
    eligibility: {
      disabilityPercent: 40,
      maxIncome: 75000,
    },
    benefits: "₹300 per month transport allowance.",
    documentsRequired: [
      "Aadhaar Card",
      "Residence-cum-Nativity Certificate",
      "Passport-size Photograph",
      "Bank Passbook",
      "Disability / Medical Certificate",
      "Community Certificate",
      "Financial Assistance ID Card of Deceased (if applicable)",
      "Voter ID Card",
      "Declaration"
    ],
    applicationProcess: [
      "Collect or download the prescribed application form from the Social Welfare Department",
      "Fill the form, paste photograph, and attach self-attested documents",
      "Submit the application to the designated Social Welfare authority",
      "Obtain receipt or acknowledgement after submission"
    ],
    applyLink: "https://socwelfare.py.gov.in/sub--office-social-welfare-department",
    simpleExplanation: {
      en: "Travel support for persons with disabilities.",
      hi: "दिव्यांग व्यक्तियों के लिए यात्रा भत्ता।",
    },
  },

  {
    id: "SCH030",
    name: "Integrated Child Development Services (ICDS)",
    type: "government",
    category: ["Women and Child", "Health"],
    targetGroup: ["child", "mother"],
    states: ["All"],
    eligibility: {
      ageRange: "0–6 years",
    },
    benefits:
      "Nutrition, immunization, preschool education, health checkups.",
    documentsRequired: ["Aadhaar (if available)", "Birth Certificate","Passport Sized Photograph","Proof of Address.",],
    applicationProcess: ["Visit nearest Anganwadi Centre"],
    applyLink: "https://www.myscheme.gov.in/schemes/icdss",
    simpleExplanation: {
      en: "Nutrition and healthcare for children and mothers.",
      hi: "बच्चों और माताओं के लिए पोषण और स्वास्थ्य सेवा।",
    },
  },
    {
    id: "SCH031",
    name: "Contributory Social Security Scheme (Jammu & Kashmir)",
    type: "government",
    category: ["Employment"],
    targetGroup: ["marginal_worker"],
    states: ["Jammu and Kashmir"],
    eligibility: {
      minAge: 18,
      maxIncome: 48000,
      domicile: "Jammu and Kashmir",
    },
    benefits:
      "State contributes ₹300 and beneficiary contributes ₹200 per quarter for 5 or 10 years. Insurance cover included. Pension or lump sum after maturity.",
    documentsRequired: [
      "Proof of Residence of Jammu & Kashmir",
      "Proof of Identity",
      "Proof of Age",
      "Profession and Income Certificate",
      "Passport-size Photographs",
      "Aadhaar Card",
      "Bank Account Details",
      "Any other document as required"
    ],
    applicationProcess: [
      "Collect the CSSS application form from Tehsil/District Social Welfare Office or Nodal Bank",
      "Fill the form, paste photograph, and attach self-attested documents",
      "Submit the application to the District Social Welfare Officer",
      "Application is reviewed and approved by the District Level Sanctioning Committee",
      "Approved beneficiaries are enrolled through J&K Bank with a recurring deposit account"
    ],
    applyLink: "https://www.jksocia/lwelfare.nic.in",
    simpleExplanation: {
      en: "Savings and pension support for marginal workers.",
      hi: "सीमांत श्रमिकों के लिए पेंशन और बीमा सहायता।",
    },
  },

  {
    id: "SCH032",
    name:
      "Internship Programme for Women Students / Scholars / Social Activists / Teachers",
    type: "government",
    category: ["Education", "Women and Child"],
    targetGroup: ["women"],
    states: ["All"],
    eligibility: {
      gender: "female",
      minAge: 21,
      maxAge: 40,
    },
    benefits:
      "₹20,000 per month stipend, travel reimbursement, hostel facility, certificate.",
    documentsRequired: [
      "Passport-size Photograph",
      "ID Proof",
      "Address Proof",
      "Signature",
      "Highest Education Certificate/Degree",
      "Joining Letter of Organization (for Teachers/Social Activists)",
      "Admission Certificate / Joining Letter of current Institution"
    ],
    applicationProcess: [
      "Register on the official portal by providing personal details",
      "Login using registered email ID and password",
      "Upload photograph and update profile",
      "Fill the online application form and submit"
    ],
    applyLink: "https://wcd.intern.nic.in/",
    simpleExplanation: {
      en: "Paid government internship for women.",
      hi: "महिलाओं के लिए सरकारी इंटर्नशिप।",
    },
  },

  {
    id: "SCH033",
    name: "Ambedkar Social Innovation and Incubation Mission (ASIIM)",
    type: "government",
    category: ["Employment"],
    targetGroup: ["scheduled_caste", "startup"],
    states: ["All"],
    eligibility: {
      category: ["SC"],
      minShareholding: 51,
    },
    benefits:
      "Equity support up to ₹30 lakh over 3 years. Further venture funding possible.",
    documentsRequired: [
      "Proof of Scheduled Caste / Scheduled Caste Divyang Status",
      "Company Incorporation Documents (Private or Public Limited Company)",
      "Shareholding Pattern Document (minimum 51% SC ownership and control)",
      "Proof of Selection / Recommendation by TBI / AIC / STPI / Reputed Incubator",
      "Proof of Award under Smart India Hackathon (if applicable)",
      "Project Proposal / Innovative Idea Document (if applicable)"
    ],
    applicationProcess: [
      "Register online by creating an account on the official application portal",
      "Login using registered credentials and fill the online application form",
      "Upload required documents and submit the application after accepting declarations",
      "Proposals are reviewed and recommended by Technology Business Incubators (TBIs) or related institutions",
      "Selected startups are automatically incubated under ASIIM",
      "Eligible applicants must incorporate as a Private/Public Limited Company with 51% SC ownership",
      "Equity assistance is released annually based on progress evaluation by the incubator"
    ],
    applyLink: "https://foa.vcfsc.in/#/signin",
    simpleExplanation: {
      en: "Startup funding support for SC entrepreneurs.",
      hi: "SC उद्यमियों के लिए स्टार्टअप सहायता।",
    },
  },

  {
    id: "SCH034",
    name: "Pradhan Mantri DAKSH (PM-DAKSH)",
    type: "government",
    category: ["Employment"],
    targetGroup: ["SC", "OBC", "EWS", "DNT"],
    states: ["All"],
    eligibility: {
      minAge: 18,
      maxAge: 45,
    },
    benefits:
      "Free skill training, stipend during training, certification, placement support.",
    documentsRequired: [
      "Aadhaar Card (Identity Proof)",
      "Passport-size Photograph",
      "Caste / Community Certificate (if applicable)",
      "Income Certificate (if applicable)",
      "Proof of Age",
      "Residence Proof",
      "Educational Qualification Certificates",
      "Occupation Certificate (for Safai Mitras / Waste Pickers, if applicable)",
      "Bank Account Details / Aadhaar-linked Bank Passbook",
      "Any other document as required"
    ],
    applicationProcess: [
      "Register on Skill India Digital Hub",
      "Choose Learner/Participant in next page",
      "Enter your mobile number. Click on Continue",
      "After login, validate your profile through e-KYC to complete the registration process",
    ],
    applyLink: "https://www.skillindiadigital.gov.in/home",
    simpleExplanation: {
      en: "Skill training for employment and self-employment.",
      hi: "रोजगार के लिए कौशल प्रशिक्षण।",
    },
  },

  {
    id: "SCH035",
    name: "Post Matric Scholarship for Students with Disabilities",
    type: "government",
    category: ["Education"],
    targetGroup: ["disabled_student"],
    states: ["All"],
    eligibility: {
      disabilityPercent: 40,
      maxIncome: 250000,
    },
    benefits:
      "Monthly maintenance allowance, book grant and disability allowance.",
    documentsRequired: [
      "Aadhaar",
      "Disability Certificate",
      "Income Certificate",
      "Educational Proof",
      "Photograph",
      "Last academic qualification certificate",
      "Bank Details of the applicant or of the Parent/Guardian",
    ],
    applicationProcess: [
      "Register on National Scholarship Portal (NSP)",
      "Login using Application ID and OTP",
      "Fill application form and upload documents",
      "Final submit application"
    ],
    applyLink: "https://scholarships.gov.in",
    simpleExplanation: {
      en: "Scholarship for students with disabilities after Class 10.",
      hi: "दिव्यांग छात्रों के लिए पोस्ट मैट्रिक छात्रवृत्ति।",
    },
  },

  {
    id: "SCH036",
    name: "Abdul Kalam Technology Innovation National Fellowship",
    type: "government",
    category: ["Employment"],
    targetGroup: ["researcher"],
    states: ["All"],
    eligibility: {
      minServiceLeft: 5,
    },
    benefits:
      "₹25,000 monthly fellowship + ₹15 lakh annual research grant.",
    documentsRequired: [
      "Identity Proof of Candidate",
      "Passport Size Photograph",
      "Proof of Age",
      "Proof of Current Employment",
      "Educational Qualification Certificates",
      "Details of Professional Awards / Recognitions / Fellowships",
      "Endorsement Certificate",
      "Bank Details (Account Number, Bank Name, Branch, IFSC)",
      "Any Other Required Document"
    ],
    applicationProcess: [
      "Nomination submitted by Heads of Institutions / Academies / Awardees (self-nomination not allowed)",
      "Download and fill Nomination Form from INAE website",
      "Email the completed nomination form with supporting documents to INAE",
      "Selection by Search-cum-Selection Expert Committee"
    ],
    applyLink: "https://www.inae.in/research-innovation/abdul-kalam-technology-innovation-national-fellowship/",
    simpleExplanation: {
      en: "Supports translational research in engineering.",
      hi: "प्रौद्योगिकी अनुसंधान के लिए फेलोशिप।",
    },
  },
];

// Upload function
export async function uploadSchemesToFirestore() {
  try {
    for (const scheme of schemes) {
      const { id, ...data } = scheme
      await setDoc(doc(db, "schemes", id), data)
      console.log(`Uploaded ${id}`)
    }

    console.log("✅ All schemes uploaded successfully")
  } catch (error) {
    console.error("❌ Upload failed:", error)
  }
}
