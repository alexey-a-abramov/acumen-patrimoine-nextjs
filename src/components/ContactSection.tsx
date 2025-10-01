'use client';

import { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

interface ContactMessage {
  type: string;
  text: string;
}

interface ContactSectionProps {
  contactMessage: ContactMessage;
  setContactMessage: (message: ContactMessage) => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({ contactMessage, setContactMessage }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState({
    contactCivility: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    contactProfile: '',
    contactMessage: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setContactMessage({ type: '', text: '' });

    try {
      let recaptchaToken = null;
      
      // Execute reCAPTCHA if available
      if (executeRecaptcha) {
        try {
          console.log('Executing reCAPTCHA...');
          recaptchaToken = await executeRecaptcha('contact_form');
          console.log('reCAPTCHA token generated:', recaptchaToken ? 'Success' : 'No token');
        } catch (recaptchaError) {
          console.warn('reCAPTCHA execution failed:', recaptchaError);
          // Continue without reCAPTCHA token - server will handle this gracefully
        }
      } else {
        console.log('reCAPTCHA executeRecaptcha not available');
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          recaptchaToken
        })
      });

      const data = await response.json();

      if (data.success) {
        setContactMessage({ type: 'success', text: data.message });
        setFormData({
          contactCivility: '',
          contactName: '',
          contactEmail: '',
          contactPhone: '',
          contactProfile: '',
          contactMessage: ''
        });
      } else {
        setContactMessage({ type: 'error', text: data.message });
      }
    } catch {
      setContactMessage({ type: 'error', text: 'Erreur réseau. Veuillez réessayer.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-white py-25 px-5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center text-gray-900 mb-15">Contactez nos experts</h2>
        <p className="text-xl text-gray-600 text-center max-w-4xl mx-auto mb-15">
          Notre équipe est à votre disposition pour répondre à toutes vos questions sur l'investissement LMNP
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mt-15">
          {/* Contact Form */}
          <div className="bg-gray-50 p-12 rounded-2xl shadow-lg">
            <form onSubmit={handleSubmit}>
              <h3 className="text-2xl font-semibold mb-8 text-gray-900">Parlons de votre projet patrimonial</h3>
              
              {contactMessage.text && (
                <div className={`p-4 rounded-lg mb-6 ${contactMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {contactMessage.text}
                </div>
              )}

              <div className="mb-6">
                <label htmlFor="contactCivility" className="block mb-2 text-gray-700 font-medium">Civilité</label>
                <select
                  id="contactCivility"
                  name="contactCivility"
                  value={formData.contactCivility}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-300 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10"
                >
                  <option value="">Sélectionnez</option>
                  <option value="M.">Monsieur</option>
                  <option value="Mme">Madame</option>
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="contactName" className="block mb-2 text-gray-700 font-medium">Nom complet *</label>
                <input
                  type="text"
                  id="contactName"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 border-2 border-gray-300 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="contactEmail" className="block mb-2 text-gray-700 font-medium">Email professionnel *</label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 border-2 border-gray-300 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="contactPhone" className="block mb-2 text-gray-700 font-medium">Téléphone *</label>
                <input
                  type="tel"
                  id="contactPhone"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 border-2 border-gray-300 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="contactProfile" className="block mb-2 text-gray-700 font-medium">Profil</label>
                <select
                  id="contactProfile"
                  name="contactProfile"
                  value={formData.contactProfile}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-300 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10"
                >
                  <option value="">Sélectionnez votre profil</option>
                  <option value="CGP">Conseiller en Gestion de Patrimoine</option>
                  <option value="Investisseur">Investisseur particulier</option>
                  <option value="Autre">Autre professionnel</option>
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="contactMessage" className="block mb-2 text-gray-700 font-medium">Votre projet ou question *</label>
                <textarea
                  id="contactMessage"
                  name="contactMessage"
                  value={formData.contactMessage}
                  onChange={handleInputChange}
                  rows={4}
                  required
                  placeholder="Décrivez-nous votre projet…"
                  className="w-full p-4 border-2 border-gray-300 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10 resize-vertical"
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
                    Envoi en cours...
                  </span>
                ) : (
                  'Envoyer ma demande'
                )}
              </button>
              
              <p className="text-sm text-gray-600 mt-4 text-center">
                * Champs obligatoires - Réponse sous 24h ouvrées<br/>
                Ce site est protégé par reCAPTCHA et les{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-900 hover:underline">
                  Règles de confidentialité
                </a>{' '}et{' '}
                <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-blue-900 hover:underline">
                  Conditions d&apos;utilisation
                </a>{' '}de Google s&apos;appliquent.
              </p>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-semibold mb-10 text-gray-900">Nos coordonnées</h3>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-300">
                <h4 className="font-semibold text-gray-900 mb-2 text-lg">📍 Siège social</h4>
                <p className="text-gray-600">
                  183 avenue Charles de Gaulle<br />
                  92200 Neuilly-sur-Seine<br />
                  France
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-300">
                <h4 className="font-semibold text-gray-900 mb-2 text-lg">📞 Téléphone</h4>
                <p className="text-gray-600">
                  01 84 78 46 71<br />
                  Du lundi au vendredi<br />
                  9h00 - 18h00
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-300">
                <h4 className="font-semibold text-gray-900 mb-2 text-lg">✉️ Email</h4>
                <p className="text-gray-600">
                  contact@acumen-patrimoine.fr<br /><br />
                  <strong>CGP :</strong> partenaires@acumen-patrimoine.fr<br />
                  <strong>Support :</strong> support@acumen-patrimoine.fr
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-300">
                <h4 className="font-semibold text-gray-900 mb-2 text-lg">🕒 Horaires d'ouverture</h4>
                <p className="text-gray-600">
                  <strong>Lundi - Jeudi :</strong> 9h00 - 19h00<br />
                  <strong>Vendredi :</strong> 9h00 - 17h00<br />
                  <strong>Samedi - Dimanche :</strong> Fermé
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;