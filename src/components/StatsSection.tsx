'use client';

const StatsSection = () => {
  const stats = [
    { number: "15+", label: "Années d'expertise LMNP" },
    { number: "300+", label: "Partenaires CGP actifs" },
    { number: "200+", label: "Portefeuille actif" },
    { number: "100%", label: "Opportunités exclusives" },
  ];

  return (
    <div className="bg-gray-50 py-20 px-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
          >
            <div 
              className="text-5xl font-bold mb-3 bg-gradient-to-br from-blue-900 to-orange-500 bg-clip-text text-transparent"
            >
              {stat.number}
            </div>
            <div className="text-gray-600 text-lg font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;