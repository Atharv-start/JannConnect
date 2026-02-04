import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function SignIn() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()
  const { login } = useAuth()

  function handleSubmit(e) {
    e.preventDefault()

    if (!name || !email || !password) return

    login({
      name,
      email,
    })

    navigate("/")
  }

  return (
    <section className="max-w-md mx-auto px-6 py-32">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Sign In
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 border border-white/10 rounded-lg p-6 space-y-4"
      >
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

        <button
          type="submit"
          className="w-full mt-4 px-4 py-2 bg-green-500 text-black rounded font-semibold"
        >
          Sign In
        </button>
      </form>
    </section>
  )
}
