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
        const e = s.eligibility || {}
        const age = parseInt(user.age)

        /* ---------------- HARD FILTERS ---------------- */

        // AGE
        if (
          age < (e.minAge ?? 0) ||
          age > (e.maxAge ?? 120)
        ) {
          return null
        }

        // STATE
        if (
          user.state &&
          !(s.states?.includes(user.state) ||
            s.states?.includes("All"))
        ) {
          return null
        }

        // GENDER
        if (
          e.gender &&
          user.gender &&
          e.gender.toLowerCase() !== user.gender
        ) {
          return null
        }

        /* ---------------- SCORING ---------------- */

        // Base eligibility
        score += 20
        reasons.push("Eligible")

        // State exact match
        if (s.states?.includes(user.state)) {
          score += 20
          reasons.push("State specific")
        }

        // Category
        if (
          user.category &&
          s.category
            ?.map(c => c.toLowerCase())
            .includes(user.category.toLowerCase())
        ) {
          score += 20
          reasons.push("Category match")
        }

        // Student
        if (
          user.student === "yes" &&
          s.category?.includes("education")
        ) {
          score += 10
          reasons.push("Student benefit")
        }

        // BPL
        if (user.bpl === "yes") {
          score += 10
          reasons.push("Low income support")
        }

        // Disability
        if (
          user.disability === "yes" &&
          e.disability === true
        ) {
          score += 10
          reasons.push("Disability support")
        }

        // Minority
        if (
          user.minority === "yes" &&
          s.category?.includes("minority")
        ) {
          score += 10
          reasons.push("Minority scheme")
        }

        // Area
        if (
          user.area &&
          s.area &&
          s.area === user.area
        ) {
          score += 5
          reasons.push("Area specific")
        }

        return {
          ...s,
          score: Math.min(score, 100),
          reasons,
        }
      })
      .filter(Boolean) // remove null (non-matching)
      .sort((a, b) => b.score - a.score)
  }

  if (loading)
    return <p className="p-6">Loading…</p>

  return (
    <section className="max-w-6xl mx-auto px-6 pb-24">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">
          Recommended schemes for you
        </h1>

        <button
          onClick={() => navigate("/onboarding")}
          className="text-green-500 mt-2"
        >
          Edit Profile
        </button>
      </div>

      {schemes.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl text-gray-400">
            No schemes match your profile
          </p>
        </div>
      )}

      <div className="grid gap-6">
        {schemes.map(scheme => (
          <div
            key={scheme.id}
            className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-xl p-6 shadow-lg hover:shadow-green-500/10 transition"
          >
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-semibold">
                {scheme.name}
              </h2>

              <span className="px-3 py-1 bg-green-500 text-black rounded font-semibold">
                {scheme.score}%
              </span>
            </div>

            <p className="mt-3 text-gray-700 dark:text-gray-300">
              {scheme.simpleExplanation?.en}
            </p>

            {scheme.reasons?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {scheme.reasons.map((r, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 bg-green-500/10 text-green-400 rounded"
                  >
                    {r}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-5 flex gap-3">
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
                    window.open(
                      scheme.applyLink,
                      "_blank"
                    )
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
