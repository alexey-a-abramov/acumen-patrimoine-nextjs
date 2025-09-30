'use client';

const RecruitmentSection = () => {
  const jobs = [
    {
      title: "Conseiller en Investissement LMNP",
      tags: ["CDI", "Neuilly-sur-Seine", "Commercial"],
      description: "Nous recherchons un conseiller expérimenté pour accompagner nos clients dans leurs projets d'investissement LMNP. Vous serez l'interface privilégiée entre nos partenaires CGP et les investisseurs."
    },
    {
      title: "Analyste Immobilier Senior",
      tags: ["CDI", "Neuilly-sur-Seine", "Analyse"],
      description: "Rejoignez notre équipe d'analystes pour évaluer les opportunités LMNP et réaliser les due diligences. Expertise en analyse financière immobilière requise."
    },
    {
      title: "Responsable Partenariats CGP",
      tags: ["CDI", "Neuilly-sur-Seine", "Business Development"],
      description: "Développez et animez notre réseau de partenaires CGP. Vous serez en charge de la formation, du support commercial et du développement de nouveaux partenariats."
    },
    {
      title: "Juriste Fiscaliste LMNP",
      tags: ["CDI", "Neuilly-sur-Seine", "Juridique"],
      description: "Expertise juridique et fiscale spécialisée en LMNP pour sécuriser nos montages et accompagner nos clients dans l'optimisation de leur stratégie patrimoniale."
    }
  ];

  return (
    <section 
      id="recrutement" 
      className="text-white py-25 px-5"
      style={{
        background: 'linear-gradient(135deg, #002F6C, #FF6A13)'
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-15">
          <h2 className="text-5xl font-bold mb-5">Rejoignez l'équipe Acumen Patrimoine</h2>
          <p className="text-xl opacity-90 max-w-4xl mx-auto">
            Nous recherchons des talents passionnés par l'immobilier et l'accompagnement patrimonial pour renforcer notre équipe d'experts LMNP.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-15">
          {jobs.map((job, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm p-10 rounded-2xl border border-white/20 hover:bg-white/15 transform hover:-translate-y-2 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-4">{job.title}</h3>
              <div className="flex flex-wrap gap-3 mb-5">
                {job.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex}
                    className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="opacity-90 leading-relaxed mb-5">{job.description}</p>
              <a 
                href="#contact" 
                className="inline-block bg-white/20 text-white border-2 border-white/30 px-6 py-3 rounded-lg font-medium hover:bg-white/30 transform hover:-translate-y-1 transition-all duration-300"
              >
                Postuler
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecruitmentSection;