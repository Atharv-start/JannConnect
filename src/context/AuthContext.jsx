import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("jann_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  function login(userData) {
    setUser(userData)
    localStorage.setItem("jann_user", JSON.stringify(userData))
  }

  function logout() {
    setUser(null)
    localStorage.removeItem("jann_user")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
