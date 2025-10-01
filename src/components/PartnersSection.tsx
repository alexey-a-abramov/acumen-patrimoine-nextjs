'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface LoginMessage {
  type: string;
  text: string;
}

interface PartnersSectionProps {
  loginMessage: LoginMessage;
  setLoginMessage: (message: LoginMessage) => void;
}

const PartnersSection: React.FC<PartnersSectionProps> = ({ loginMessage, setLoginMessage }) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await response.json();

      if (data.success) {
        setLoginMessage({ type: 'success', text: data.message });
        // Redirect to partners page
        setTimeout(() => {
          router.push('/partenaires');
        }, 1000);
      } else {
        setLoginMessage({ type: 'error', text: data.message });
      }
    } catch {
      setLoginMessage({ type: 'error', text: 'Erreur de connexion. Veuillez réessayer.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="partenaires" className="bg-gray-50 py-25 px-5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center text-gray-900 mb-15">Espace Partenaires</h2>
        <p className="text-xl text-gray-600 text-center mb-15">
          Accédez à votre espace dédié pour consulter nos opportunités LMNP exclusives
        </p>
        
        <div className="max-w-lg mx-auto">
          <div className="bg-white p-12 rounded-2xl shadow-xl text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-900 to-orange-500 rounded-full mx-auto mb-8 flex items-center justify-center text-white text-3xl">
              🔐
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-900">Connexion Partenaire</h3>
            <p className="text-gray-600 mb-10 text-lg">
              Connectez-vous pour accéder à votre portefeuille d'opportunités
            </p>
            
            {loginMessage.text && (
              <div className={`p-4 rounded-lg mb-6 ${loginMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {loginMessage.text}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-left mb-2 text-gray-700 font-medium">
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-4 border-2 border-gray-300 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10"
                  placeholder="Entrez votre mot de passe"
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-blue-900 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Connexion...
                  </span>
                ) : (
                  'Se connecter'
                )}
              </button>
            </form>
            
            <p className="text-sm text-gray-500 mt-6">
              Vous n'avez pas encore d'accès ?{' '}
              <a href="#contact" className="text-blue-600 hover:underline font-medium">
                Contactez-nous
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;