'use client';

import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';
import RecruitmentSection from '@/components/RecruitmentSection';
import PartnersSection from '@/components/PartnersSection';
import Footer from '@/components/Footer';

export default function Home() {
  const [contactMessage, setContactMessage] = useState({ type: '', text: '' });
  const [loginMessage, setLoginMessage] = useState({ type: '', text: '' });

  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ServicesSection />
      <ContactSection contactMessage={contactMessage} setContactMessage={setContactMessage} />
      <RecruitmentSection />
      <PartnersSection loginMessage={loginMessage} setLoginMessage={setLoginMessage} />
      <Footer />
    </div>
  );
}
