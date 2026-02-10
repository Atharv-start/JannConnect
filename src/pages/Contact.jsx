export default function Contact() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-24">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Contact Us
      </h1>

      <p className="text-gray-700 dark:text-white/80 mb-8">
        If you have any questions, suggestions, or issues, feel free to
        contact us using the form below.
      </p>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
        />
        <textarea
          placeholder="Your Message"
          rows="5"
          className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
        />
        <button className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium">
          Send Message
        </button>
      </div>
    </section>
  )
}
