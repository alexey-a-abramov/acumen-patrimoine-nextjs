'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'shadow-md bg-white/95 backdrop-blur-md' : 'bg-white/95'}`}>
      <div className="max-w-7xl mx-auto px-5 flex justify-between items-center h-[70px]">
        <div className="logo">
          <Image src="/img/logo.png" alt="Acumen Patrimoine" width={200} height={40} className="h-10 w-auto" />
        </div>
        
        <button 
          className="block md:hidden bg-transparent border-none text-2xl cursor-pointer text-gray-700"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          ☰
        </button>
        
        <ul className={`flex md:flex-row flex-col md:static absolute top-[70px] left-0 w-full md:w-auto bg-white md:bg-transparent md:shadow-none shadow-lg md:flex ${mobileMenuOpen ? 'flex' : 'hidden md:flex'} gap-6 transition-all duration-300 md:p-0 p-5`}>
          <li><Link href="#accueil" className="text-gray-700 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-900 transition-all duration-300 relative">Accueil</Link></li>
          <li><Link href="#apropos" className="text-gray-700 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-900 transition-all duration-300 relative">À propos</Link></li>
          <li><Link href="#services" className="text-gray-700 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-900 transition-all duration-300 relative">Nos services</Link></li>
          <li><Link href="#contact" className="text-gray-700 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-900 transition-all duration-300 relative">Contact</Link></li>
          <li><Link href="#recrutement" className="text-gray-700 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-900 transition-all duration-300 relative">Recrutement</Link></li>
          <li><Link href="#partenaires" className="text-gray-700 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-900 transition-all duration-300 relative">Espace Partenaires</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;