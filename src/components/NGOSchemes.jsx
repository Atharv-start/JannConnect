import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllSchemes } from "../services/schemesService"

export default function NGOSchemes() {
  const navigate = useNavigate()
  const [schemes, setSchemes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSchemes() {
      const data = await getAllSchemes()
      setSchemes(data)
      setLoading(false)
    }
    fetchSchemes()
  }, [])

  if (loading) return null

  const ngoSchemes = schemes.filter(
    s => s.type && s.type.toLowerCase() === "ngo"
  )

  if (ngoSchemes.length === 0) return null

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-10">
        NGO Schemes
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ngoSchemes.map(scheme => (
          <article
            key={scheme.id}
            className="
              bg-white dark:bg-slate-900
              text-gray-800 dark:text-white
              border border-gray-200 dark:border-white/10
              rounded-xl overflow-hidden
              shadow-sm
            "
          >
            {scheme.image && (
              <img
                src={scheme.image}
                alt={scheme.name}
                className="w-full h-44 object-cover"
              />
            )}

            <div className="p-5">
              <h3 className="text-lg font-semibold">
                {scheme.name}
              </h3>

              {scheme.ministry && (
                <p className="text-sm text-gray-500 dark:text-white/60">
                  {scheme.ministry}
                </p>
              )}

              <p className="mt-2 text-sm text-gray-700 dark:text-white/70">
                {scheme.simpleExplanation?.en ||
                  scheme.description}
              </p>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() =>
                    navigate(`/scheme/${scheme.id}`)
                  }
                  className="px-3 py-1 border border-gray-300 dark:border-white/20 rounded"
                >
                  View Details
                </button>

                {scheme.applyLink && (
                  <button
                    onClick={() =>
                      window.open(
                        scheme.applyLink,
                        "_blank"
                      )
                    }
                    className="px-3 py-1 bg-green-500 text-black rounded"
                  >
                    Apply
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}