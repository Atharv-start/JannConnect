import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { getUser, createUser, verifyUser } from "../services/userService"

export default function SignIn() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState("")

  const navigate = useNavigate()
  const { login } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")

    if (!email || !password) return

    try {
      if (isRegister) {
        // Register new user
        await createUser({ name, email, password })
        login({ name, email })
        navigate("/onboarding")
      } else {
        // Login existing user
        const user = await verifyUser(email, password)

        if (!user) {
          setError("Invalid email or password")
          return
        }

        login({ name: user.name, email: user.email })

        if (user.profileCompleted) {
          navigate("/dashboard")
        } else {
          navigate("/onboarding")
        }
      }
    } catch (err) {
      setError("Something went wrong")
    }
  }

  return (
    <section className="max-w-md mx-auto px-6 py-32">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {isRegister ? "Register" : "Sign In"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 border border-white/10 rounded-lg p-6 space-y-4"
      >
        {isRegister && (
          <div>
            <label className="block text-sm mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 rounded bg-slate-800 text-white"
              required
            />
          </div>
        )}

        <div>
          <label className="block text-sm mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded bg-slate-800 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded bg-slate-800 text-white"
            required
          />
        </div>

        {error && (
          <p className="text-red-400 text-sm">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full mt-4 px-4 py-2 bg-green-500 text-black rounded font-semibold"
        >
          {isRegister ? "Register" : "Sign In"}
        </button>

        <p
          className="text-center text-sm text-gray-400 cursor-pointer"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? "Already have an account? Sign in"
            : "New user? Register"}
        </p>
      </form>
    </section>
  )
}
