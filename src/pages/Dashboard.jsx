import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { getUser } from "../services/userService"
import { getAllSchemes } from "../services/schemesService"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [profile, setProfile] = useState(null)
  const [schemes, setSchemes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const u = await getUser(user.email)
      const s = await getAllSchemes()
      const ranked = rankSchemes(u, s)
      setProfile(u)
      setSchemes(ranked)
      setLoading(false)
    }
    loadData()
  }, [])

  function rankSchemes(user, schemes) {
    return schemes
      .map(s => {
        let score = 0
        let reasons = []

        if (s.states?.includes(user.state)) {
          score += 30
          reasons.push("State match")
        }

        if (s.category?.includes(user.category)) {
          score += 25
          reasons.push("Category match")
        }

        const e = s.eligibility || {}
        const age = parseInt(user.age)

        if (age >= (e.minAge ?? 0) && age <= (e.maxAge ?? 120)) {
          score += 20
          reasons.push("Age eligible")
        }

        if (e.gender &&
            e.gender.toLowerCase() === user.gender) {
          score += 15
          reasons.push("Gender match")
        }

        if (user.student === "yes" &&
            s.category?.includes("education")) {
          score += 10
          reasons.push("Student benefit")
        }

        if (user.bpl === "yes") {
          score += 10
          reasons.push("Low income support")
        }

        return {
          ...s,
          score: Math.min(score, 100),
          reasons
        }
      })
      .filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score)
  }

  if (loading) return <p className="p-6">Loading…</p>

  return (
    <section className="max-w-7xl mx-auto px-6 pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          We found {schemes.length} schemes based on your preferences
        </h1>

        <button
          onClick={() => navigate("/onboarding")}
          className="text-green-500 mt-2"
        >
          Edit Profile
        </button>
      </div>

      <div className="grid gap-6">
        {schemes.map(scheme => (
          <div
            key={scheme.id}
            className="bg-white dark:bg-slate-900 border rounded-xl p-6"
          >
            <h2 className="text-2xl font-semibold">
              {scheme.name}
            </h2>

            <p className="mt-2">
              {scheme.simpleExplanation?.en}
            </p>

            <div className="mt-4">
              <span className="font-semibold">
                Match Score:
              </span>
              <span className="ml-2 px-3 py-1 bg-green-500 text-black rounded">
                {scheme.score}%
              </span>
            </div>

            {scheme.reasons?.length > 0 && (
              <p className="text-sm text-green-400 mt-2">
                Matches: {scheme.reasons.join(", ")}
              </p>
            )}

            <div className="mt-4 flex gap-3">
              <button
                onClick={() =>
                  navigate(`/scheme/${scheme.id}`)
                }
                className="px-4 py-2 border rounded"
              >
                View
              </button>

              {scheme.applyLink && (
                <button
                  onClick={() =>
                    window.open(scheme.applyLink, "_blank")
                  }
                  className="px-4 py-2 bg-green-500 text-black rounded"
                >
                  Apply
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
