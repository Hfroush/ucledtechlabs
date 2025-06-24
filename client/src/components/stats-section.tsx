export default function StatsSection() {
  const stats = [
    { value: "300+", label: "Startups Accelerated" },
    { value: "12", label: "Cohorts" },
    { value: "8M", label: "Learners Impacted" },
    { value: "£500M+", label: "Total Startup Valuation" },
    { value: "£37M+", label: "Funding Raised" },
    { value: "60+", label: "Investment Rounds" },
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
