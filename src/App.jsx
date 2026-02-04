import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import SearchResults from "./pages/SearchResults"
import SchemeDetails from "./pages/SchemeDetails"
import About from "./pages/About"
import Privacy from "./pages/Privacy"
import Disclaimer from "./pages/Disclaimer"
import SignIn from "./pages/SignIn"

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
      </Routes>
    </BrowserRouter>
  )
}
