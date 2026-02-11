import { useNavigate } from "react-router-dom"

export default function AboutSection() {
  const navigate = useNavigate()

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
      {/* Text */}
      <div>
        <h2 className="text-4xl font-bold text-green-500 mb-6">
          About
        </h2>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          JannConnect is a National Platform that aims to offer
          one-stop search and discovery of Government and NGO
          schemes.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          It provides a simple, technology-based solution to
          discover scheme information based on the eligibility
          of the citizen.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          The platform helps users find the right schemes for
          them and also guides them on how to apply for each
          scheme without visiting multiple government websites.
        </p>

        <button
          onClick={() => navigate("/about")}
          className="mt-6 px-6 py-3 border border-gray-300 dark:border-white/30 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition"
        >
          View More →
        </button>
      </div>

      {/* Image */}
      <div className="relative">
        <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
            alt="Citizens accessing digital services"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl shadow-lg">
            ▶
          </div>
        </div>
      </div>
    </section>
  )
}
