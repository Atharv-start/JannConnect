import { useLanguage } from "../context/LanguageContext"

export default function Departments() {
  const { t } = useLanguage()

  const departmentsList = [
    { id: 1, name: t?.dept1 || "Department of Education" },
    { id: 2, name: t?.dept2 || "Department of Health" },
    { id: 3, name: t?.dept3 || "Department of Social Welfare" },
    { id: 4, name: t?.dept4 || "Department of Agriculture" },
    { id: 5, name: t?.dept5 || "Department of Labor" },
  ]

  return (
    <section className="max-w-4xl mx-auto px-6 py-24">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        {t?.departments || "Government Departments"}
      </h1>

      <ul className="space-y-3 text-gray-700 dark:text-white/80">
        {departmentsList.map((dept) => (
          <li key={dept.id} className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            {dept.name}
          </li>
        ))}
      </ul>
    </section>
  )
}
