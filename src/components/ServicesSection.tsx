'use client';

const ServicesSection = () => {
  return (
    <section id="services" className="bg-gradient-to-br from-gray-50 to-gray-100 py-25 px-5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center text-gray-900 mb-15">Notre offre</h2>
        <p className="text-xl text-gray-600 text-center mb-15">Un accès exclusif au marché secondaire LMNP</p>
        
        <div className="bg-white p-15 rounded-2xl shadow-lg mb-15 text-center">
          <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
            Chez Acumen Patrimoine, nous vous donnons accès à l'un des plus importants portefeuilles professionnels de biens LMNP en revente gérée, avec une promesse claire : des opportunités fiables, sélectionnées et immédiatement commercialisables pour vos clients.
          </p>
        </div>
        
        <div className="space-y-12">
          <div className="bg-white p-15 rounded-2xl shadow-lg">
            <div className="w-15 h-15 bg-gradient-to-br from-orange-500 to-blue-900 rounded-xl mb-6 flex items-center justify-center text-white text-2xl">
              📦
            </div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">+200 reventes LMNP, un stock dynamique et négocié</h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Notre plateforme propose à nos partenaires un stock de plus de 200 mandats exclusifs de biens issus du marché secondaire LMNP, dont une majorité en off market.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Nous négocions directement les rentabilités auprès des vendeurs pour vous garantir des taux nets attractifs et différenciants.
            </p>
            <p className="text-gray-900 font-semibold mb-4">Chaque bien est présenté avec :</p>
            <ul className="space-y-2">
              <li className="text-gray-600 pl-6 relative">
                <span className="absolute left-0 text-blue-900 font-bold">→</span>
                Une projection financière complète (rentabilité, durée restante du bail, charges, etc.)
              </li>
              <li className="text-gray-600 pl-6 relative">
                <span className="absolute left-0 text-blue-900 font-bold">→</span>
                Les documents juridiques clés (bail, PV AG, dernier appel de loyers)
              </li>
              <li className="text-gray-600 pl-6 relative">
                <span className="absolute left-0 text-blue-900 font-bold">→</span>
                Un historique de gestion si disponible
              </li>
            </ul>
          </div>

          <div className="bg-white p-15 rounded-2xl shadow-lg">
            <div className="w-15 h-15 bg-gradient-to-br from-orange-500 to-blue-900 rounded-xl mb-6 flex items-center justify-center text-white text-2xl">
              🧠
            </div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">Une base de données unique pour des estimations précises</h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Grâce à nos données internes issues de milliers de reventes LMNP, nous sommes capables d'estimer finement la valeur de chaque actif en fonction :
            </p>
            <ul className="space-y-2 mb-6">
              <li className="text-gray-600 pl-6 relative">
                <span className="absolute left-0 text-blue-900 font-bold">→</span>
                De sa localisation
              </li>
              <li className="text-gray-600 pl-6 relative">
                <span className="absolute left-0 text-blue-900 font-bold">→</span>
                Du gestionnaire
              </li>
              <li className="text-gray-600 pl-6 relative">
                <span className="absolute left-0 text-blue-900 font-bold">→</span>
                Du rendement attendu
              </li>
              <li className="text-gray-600 pl-6 relative">
                <span className="absolute left-0 text-blue-900 font-bold">→</span>
                Et des références comparables récentes
              </li>
            </ul>
            <p className="text-gray-900 font-semibold mb-4">Cela nous permet de :</p>
            <ul className="space-y-2">
              <li className="text-gray-600 pl-6 relative">
                <span className="absolute left-0 text-blue-900 font-bold">→</span>
                Fournir les meilleures estimations aux vendeurs
              </li>
              <li className="text-gray-600 pl-6 relative">
                <span className="absolute left-0 text-blue-900 font-bold">→</span>
                Et garantir à vos clients des acquisitions à leur juste prix
              </li>
            </ul>
          </div>

          <div className="bg-white p-15 rounded-2xl shadow-lg">
            <div className="w-15 h-15 bg-gradient-to-br from-orange-500 to-blue-900 rounded-xl mb-6 flex items-center justify-center text-white text-2xl">
              ⚖️
            </div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">Un réseau de notaires spécialisés LMNP</h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Toutes les transactions sont accompagnées par un réseau de notaires partenaires spécialisés dans la revente LMNP, assurant :
            </p>
            <ul className="space-y-2">
              <li className="text-gray-600 pl-6 relative">
                <span className="absolute left-0 text-blue-900 font-bold">→</span>
                Une parfaite maîtrise des baux commerciaux
              </li>
              <li className="text-gray-600 pl-6 relative">
                <span className="absolute left-0 text-blue-900 font-bold">→</span>
                Une sécurisation juridique des dossiers
              </li>
              <li className="text-gray-600 pl-6 relative">
                <span className="absolute left-0 text-blue-900 font-bold">→</span>
                Et un traitement rapide des signatures et promesses
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-900 to-orange-500 text-white p-15 rounded-2xl shadow-lg">
            <div className="w-15 h-15 bg-white/20 rounded-xl mb-6 flex items-center justify-center text-2xl">
              🎯
            </div>
            <h3 className="text-2xl font-semibold mb-6">Votre rôle : conseiller, nous fournissons le reste</h3>
            <p className="text-lg opacity-90 leading-relaxed">
              Nous vous accompagnons à chaque étape, de la sélection du bien à la finalisation de la vente, avec des outils professionnels et des interlocuteurs dédiés.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;