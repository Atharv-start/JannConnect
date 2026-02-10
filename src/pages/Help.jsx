export default function Help() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-24">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Help Center
      </h1>

      <p className="text-gray-700 dark:text-white/80 leading-relaxed mb-6">
        Welcome to the JannConnect Help Center. Here you can learn how to
        search for schemes, understand eligibility, and apply successfully.
      </p>

      <div className="space-y-6 text-gray-700 dark:text-white/80">
        <div>
          <h2 className="font-semibold text-lg">How to search for schemes</h2>
          <p>
            Use the search bar on the home page to find schemes based on
            your needs, category, or keywords.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-lg">Understanding eligibility</h2>
          <p>
            Each scheme page clearly lists eligibility criteria such as
            age, income, gender, or occupation.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-lg">Application steps</h2>
          <p>
            Follow the step-by-step instructions listed on the scheme
            details page to complete your application.
          </p>
        </div>
      </div>
    </section>
  )
}
