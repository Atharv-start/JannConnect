import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import SearchResults from "./pages/SearchResults"
import SchemeDetails from "./pages/SchemeDetails"
import About from "./pages/About"
import Privacy from "./pages/Privacy"
import Disclaimer from "./pages/Disclaimer"
import SignIn from "./pages/SignIn"
import VoiceFeatures from "./components/VoiceFeatures"

import Help from "./pages/Help"
import FAQs from "./pages/FAQs"
import Feedback from "./pages/Feedback"
import Contact from "./pages/Contact"
import Ministries from "./pages/Ministries"
import Departments from "./pages/Departments"
import States from "./pages/States"
import GovernmentSchemes from "./pages/GovernmentSchemes"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/search" element={<Layout><SearchResults /></Layout>} />
        <Route path="/scheme/:id" element={<Layout><SchemeDetails /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
        <Route path="/disclaimer" element={<Layout><Disclaimer /></Layout>} />
        <Route path="/signin" element={<Layout><SignIn /></Layout>} />

        {/* Support */}
        <Route path="/help" element={<Layout><Help /></Layout>} />
        <Route path="/faqs" element={<Layout><FAQs /></Layout>} />
        <Route path="/feedback" element={<Layout><Feedback /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />

        {/* Government */}
        <Route path="/ministries" element={<Layout><Ministries /></Layout>} />
        <Route path="/departments" element={<Layout><Departments /></Layout>} />
        <Route path="/states" element={<Layout><States /></Layout>} />
        <Route path="/government-schemes" element={<Layout><GovernmentSchemes /></Layout>} />

        {/* Voice Features */}
        <Route path="/voice" element={<Layout><VoiceFeatures /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}
