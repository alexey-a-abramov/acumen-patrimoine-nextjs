'use client';

const AboutSection = () => {
  const expertiseCards = [
    {
      title: "🏢 Notre métier",
      items: [
        "Sourcing et revente exclusive d'investissements LMNP",
        "Partenariat stratégique avec des CGP certifiés",
        "Due diligence approfondie de chaque opportunité",
        "Accompagnement personnalisé de A à Z",
        "Optimisation fiscale et patrimoniale",
        "Suivi post-acquisition et mise en location"
      ]
    },
    {
      title: "🎯 Notre différence",
      items: [
        "Opportunités exclusives off-market (non disponibles au grand public)",
        "Stock actualisé en temps réel dans l'espace partenaire",
        "Dossiers packagés prêts à l'emploi pour vos clients",
        "Accès simple et rapide à l'espace CGP",
        "Accompagnement personnel dédié (vs plateformes anonymes)",
        "Transparence totale sur les rétrocessions"
      ]
    },
    {
      title: "🤝 Nos partenaires",
      items: [
        "300+ Conseillers en Gestion de Patrimoine",
        "Promoteurs immobiliers de renom",
        "Gestionnaires locatifs certifiés",
        "Experts-comptables spécialisés LMNP",
        "Notaires et avocats fiscalistes",
        "Établissements bancaires partenaires"
      ]
    }
  ];

  return (
    <section id="apropos" className="bg-white py-25 px-5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center text-gray-900 mb-15">À propos d'Acumen Patrimoine</h2>
        <p className="text-xl text-gray-600 text-center max-w-4xl mx-auto mb-15 leading-relaxed">
          Depuis plus de 15 ans, Acumen Patrimoine s'est imposé comme le spécialiste incontournable de la revente de biens LMNP géré sur le marché secondaire. Notre mission : proposer aux CGP des opportunités off-market exceptionnelles avec un accompagnement personnalisé et une transparence totale sur les rémunérations.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-15">
          {expertiseCards.map((card, index) => (
            <div 
              key={index}
              className="text-left p-10 bg-gray-50 rounded-2xl border-l-4 border-orange-500"
            >
              <h3 className="text-2xl mb-5 text-gray-900 font-semibold">{card.title}</h3>
              <ul className="list-none space-y-3">
                {card.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-gray-600 pl-6 relative text-lg leading-relaxed">
                    <span className="absolute left-0 text-green-500 font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;