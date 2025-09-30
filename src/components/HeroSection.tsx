'use client';

const HeroSection = () => {
  return (
    <section 
      id="accueil" 
      className="relative pt-[170px] pb-24 px-5 text-center text-white overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #002F6C 0%, #FF6A13 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 8s ease infinite'
      }}
    >
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-6xl md:text-7xl font-bold mb-5 text-shadow-lg">
          Acumen Patrimoine
        </h1>
        <div className="text-2xl md:text-3xl mb-4 opacity-90 font-medium">
          Experts en revente LMNP depuis plus de 15 ans
        </div>
        <p className="text-xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
          Nous sommes le partenaire privilégié des Conseillers en Gestion de Patrimoine pour proposer des solutions en LMNP géré sur le marché secondaire, avec un accès privilégié à des opportunités off-market non disponibles au grand public.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center flex-wrap">
          <a 
            href="#services" 
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-blue-900 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
            <span className="relative z-10">Découvrir nos opportunités</span>
          </a>
          <a 
            href="#contact" 
            className="px-8 py-4 border-2 border-white/80 text-white bg-white/10 backdrop-blur-sm rounded-xl font-semibold text-lg hover:bg-white/20 transform hover:-translate-y-1 transition-all duration-300"
          >
            Devenir partenaire CGP
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;