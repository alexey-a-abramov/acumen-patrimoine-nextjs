'use client';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white pt-15 pb-0 m-0">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-10">
          {/* Informations utiles */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Informations utiles</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://www.sextantfrance.fr/fr/mentions_legales.htm?ForceNumage=75011" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-orange-500 transition-colors duration-300"
                >
                  Mentions légales
                </a>
              </li>
              <li>
                <a 
                  href="https://www.ppd-rgpd.com/fr/75011/75011" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-orange-500 transition-colors duration-300"
                >
                  RGPD / Politique de confidentialité
                </a>
              </li>
              <li>
                <a 
                  href="https://www.sextantfrance.fr/fr/cgu.htm" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-orange-500 transition-colors duration-300"
                >
                  Conditions générales d'utilisation
                </a>
              </li>
              <li>
                <a 
                  href="https://assets.adaptimmo.com/bareme/75011/bareme.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-orange-500 transition-colors duration-300"
                >
                  Barème d'honoraires
                </a>
              </li>
            </ul>
          </div>

          {/* Nous joindre */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Nous joindre</h3>
            <div className="mb-5">
              <h4 className="text-orange-500 font-semibold mb-2 text-lg">Contactez-nous</h4>
              <p className="text-white/80 leading-relaxed">
                <strong>Tél :</strong> 01 84 78 46 71<br />
                <strong>Adresse :</strong> 183 Avenue Charles de Gaulle<br />
                92200 Neuilly-sur-Seine
              </p>
            </div>
          </div>

          {/* Logo et description */}
          <div>
            <div className="mb-6">
              <div className="text-2xl font-bold mb-4">Acumen Patrimoine</div>
            </div>
            <p className="text-white/80 leading-relaxed">
              Experts en revente LMNP depuis 15 ans. Partenaire privilégié des CGP pour des investissements immobiliers exclusifs et rentables.
            </p>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="bg-black text-white py-5 text-center">
        <div className="max-w-7xl mx-auto px-5">
          <p className="text-white/70 text-sm">
            Copyright 2025 Acumen Patrimoine - Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;