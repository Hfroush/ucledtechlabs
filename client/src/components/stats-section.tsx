export default function StatsSection() {
  const stats = [
    { value: "200+", label: "Startups Accelerated" },
    { value: "4", label: "Global Cities" },
    { value: "$50M+", label: "Funding Raised" },
    { value: "150+", label: "Expert Mentors" },
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
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
