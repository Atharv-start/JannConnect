import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { updateUserProfile } from "../services/userService"
import { getAllSchemes } from "../services/schemesService"
import { motion, AnimatePresence } from "framer-motion"

export default function Onboarding() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [schemes, setSchemes] = useState([])
  const [matchCount, setMatchCount] = useState(0)

  const [form, setForm] = useState({
    gender: "",
    age: "",
    state: "",
    area: "",
    category: "",
    disability: "",
    minority: "",
    student: "",
    bpl: "",
  })

  function setValue(key, value) {
    setForm(prev => ({
      ...prev,
      [key]: value
    }))
  }

  function next() {
    setStep(step + 1)
  }

  function back() {
    setStep(step - 1)
  }

  async function handleSubmit() {
    await updateUserProfile(user.email, form)
    navigate("/dashboard")
  }

  useEffect(() => {
    async function loadSchemes() {
      const data = await getAllSchemes()
      setSchemes(data || [])
    }
    loadSchemes()
  }, [])

  function calculateMatches(form, schemes) {
    let count = 0

    schemes.forEach(s => {
      let score = 0

      if (form.state && s.states?.includes(form.state)) {
        score += 30
      }

      if (form.category && s.category?.includes(form.category)) {
        score += 25
      }

      const e = s.eligibility || {}

      if (form.age) {
        const age = parseInt(form.age)
        if (age >= (e.minAge ?? 0) && age <= (e.maxAge ?? 120)) {
          score += 20
        }
      }

      if (form.gender && e.gender) {
        if (e.gender.toLowerCase() === form.gender) {
          score += 15
        }
      }

      if (form.student === "yes" && s.category?.includes("education")) {
        score += 10
      }

      if (form.bpl === "yes") {
        score += 10
      }

      if (score > 0) count++
    })

    return count
  }

  useEffect(() => {
    if (!schemes.length) return
    const count = calculateMatches(form, schemes)
    setMatchCount(count)
  }, [form, schemes])

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">

      {/* Heading */}
      <h1 className="text-3xl font-semibold mb-6 text-center">
        Help us find the best schemes for you
      </h1>

      {/* Progress */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-3">
          {[1, 2, 3, 4, 5].map(s => (
            <div
              key={s}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                step === s
                  ? "bg-green-500 scale-125"
                  : step > s
                  ? "bg-green-400"
                  : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Card */}
      <div className="relative max-w-2xl w-full bg-slate-900/80 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-all duration-500 hover:shadow-[0_30px_80px_rgba(0,255,150,0.25)] hover:-translate-y-2 hover:scale-[1.01]">

        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/10 via-transparent to-green-500/10 blur-2xl pointer-events-none" />

       


        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >

            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl">
                  Tell us about yourself, you are a…
                </h2>

                <div className="flex gap-4">
                  {["Male", "Female", "Transgender"].map(g => (
                    <button
                      key={g}
                      onClick={() => setValue("gender", g)}
                      className={`px-6 py-4 border rounded-lg text-lg ${
                        form.gender === g
                          ? "bg-green-500 text-black"
                          : "border-white/20"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>

                <h3>Select your age group</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {[
                    { label: "Under 18", value: 17 },
                    { label: "18–25", value: 22 },
                    { label: "26–40", value: 30 },
                    { label: "41–60", value: 50 },
                    { label: "60+", value: 65 },
                  ].map(a => (
                    <button
                      key={a.label}
                      onClick={() => setValue("age", a.value)}
                      className={`p-3 border rounded ${
                        form.age === a.value
                          ? "bg-green-500 text-black"
                          : "border-white/20"
                      }`}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>

                <input
                  type="number"
                  placeholder="Or enter exact age"
                  value={form.age || ""}
                  onChange={e =>
                    setValue("age", Number(e.target.value))
                  }
                  className="w-full p-2 text-black rounded"
                />

                <button
                  onClick={next}
                  disabled={!form.gender || !form.age}
                  className="bg-green-500 text-black px-6 py-2 rounded"
                >
                  Next
                </button>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-6">
                <h2>Select your state</h2>

                <input
                  type="text"
                  placeholder="State"
                  value={form.state}
                  onChange={e =>
                    setValue("state", e.target.value)
                  }
                  className="w-full p-2 text-black rounded"
                />

                <div className="flex gap-4">
                  {["Urban", "Rural"].map(a => (
                    <button
                      key={a}
                      onClick={() => setValue("area", a)}
                      className={`px-6 py-3 border rounded ${
                        form.area === a
                          ? "bg-green-500 text-black"
                          : "border-white/20"
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button onClick={back} className="border px-4 py-2 rounded">Back</button>
                  <button onClick={next} className="bg-green-500 text-black px-4 py-2 rounded">Next</button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-6">
                <h2>You belong to…</h2>
                {["general", "obc", "sc", "st"].map(c => (
                  <button
                    key={c}
                    onClick={() => setValue("category", c)}
                    className={`block w-full p-3 border rounded ${
                      form.category === c
                        ? "bg-green-500 text-black"
                        : "border-white/20"
                    }`}
                  >
                    {c.toUpperCase()}
                  </button>
                ))}

                <div className="flex gap-4">
                  <button onClick={back} className="border px-4 py-2 rounded">Back</button>
                  <button onClick={next} className="bg-green-500 text-black px-4 py-2 rounded">Next</button>
                </div>
              </div>
            )}

            {/* Step 4 */}
{step === 4 && (
  <div className="space-y-10 text-center">
    {/* Disability */}
    <div>
      <h2 className="text-xl mb-4">
        Do you identify as a person with a disability?
      </h2>

      <div className="flex justify-center gap-4">
        {["yes", "no"].map(v => (
          <button
            key={v}
            onClick={() => setValue("disability", v)}
            className={`px-8 py-3 border rounded-lg min-w-[120px] ${
              form.disability === v
                ? "bg-green-500 text-black"
                : "border-white/30"
            }`}
          >
            {v.toUpperCase()}
          </button>
        ))}
      </div>
    </div>

    {/* Minority */}
    <div>
      <h2 className="text-xl mb-4">
        Do you belong to a minority group?
      </h2>

      <div className="flex justify-center gap-4">
        {["yes", "no"].map(v => (
          <button
            key={v}
            onClick={() => setValue("minority", v)}
            className={`px-8 py-3 border rounded-lg min-w-[120px] ${
              form.minority === v
                ? "bg-green-500 text-black"
                : "border-white/30"
            }`}
          >
            {v.toUpperCase()}
          </button>
        ))}
      </div>
    </div>

    <div className="flex justify-center gap-4 pt-4">
      <button
        onClick={back}
        className="border px-6 py-2 rounded"
      >
        Back
      </button>
      <button
        onClick={next}
        className="bg-green-500 text-black px-6 py-2 rounded"
      >
        Next
      </button>
    </div>
  </div>
)}


           {/* Step 5 */}
{step === 5 && (
  <div className="space-y-10 text-center">
    {/* Student */}
    <div>
      <h2 className="text-xl mb-4">
        Are you a student?
      </h2>

      <div className="flex justify-center gap-4">
        {["yes", "no"].map(v => (
          <button
            key={v}
            onClick={() => setValue("student", v)}
            className={`px-8 py-3 border rounded-lg min-w-[120px] ${
              form.student === v
                ? "bg-green-500 text-black"
                : "border-white/30"
            }`}
          >
            {v.toUpperCase()}
          </button>
        ))}
      </div>
    </div>

    {/* BPL */}
    <div>
      <h2 className="text-xl mb-4">
        Do you belong to BPL category?
      </h2>

      <div className="flex justify-center gap-4">
        {["yes", "no"].map(v => (
          <button
            key={v}
            onClick={() => setValue("bpl", v)}
            className={`px-8 py-3 border rounded-lg min-w-[120px] ${
              form.bpl === v
                ? "bg-green-500 text-black"
                : "border-white/30"
            }`}
          >
            {v.toUpperCase()}
          </button>
        ))}
      </div>
    </div>

    <div className="flex justify-center gap-4 pt-4">
      <button
        onClick={back}
        className="border px-6 py-2 rounded"
      >
        Back
      </button>
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-black px-6 py-2 rounded"
      >
        Submit
      </button>
    </div>
  </div>
)}


          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
