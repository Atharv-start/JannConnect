export default function FAQs() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-24">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Frequently Asked Questions
      </h1>

      <div className="space-y-6 text-gray-700 dark:text-white/80">
        <div>
          <h2 className="font-semibold text-lg">
            What is JannConnect?
          </h2>
          <p>
            JannConnect is a platform that helps citizens easily find
            government and NGO schemes in one place.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-lg">
            Do I need to sign in to use it?
          </h2>
          <p>
            No. You can search and view scheme details without signing in.
            The sign-in feature is only for demonstration.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-lg">
            Are the schemes official?
          </h2>
          <p>
            The platform displays publicly available information about
            government and NGO schemes. Always verify details on the
            official website before applying.
          </p>
        </div>
      </div>
    </section>
  )
}
 