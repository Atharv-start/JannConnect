import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"

import { ThemeProvider } from "./context/ThemeContext"
import { AuthProvider } from "./context/AuthContext"
import { AccessibilityProvider } from "./context/AccessibilityContext"
import { LanguageProvider } from "./context/LanguageContext"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <AccessibilityProvider>
          <LanguageProvider>
            <App />
          </LanguageProvider>
        </AccessibilityProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
)
