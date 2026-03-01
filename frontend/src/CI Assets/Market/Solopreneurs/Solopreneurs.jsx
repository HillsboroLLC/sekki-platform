import React from 'react';
import './Solopreneurs.css';
// Layout
import Topbar from '../Enterprise/components/layout/Topbar';
import Footer from '../Enterprise/components/layout/Footer';
// Sections
import SoloHero from './components/sections/SoloHero/SoloHero';
import UrgencyBar from './components/sections/UrgencyBar/UrgencyBar';
import FearSection from './components/sections/FearSection/FearSection';
import ValidationProcess from './components/sections/ValidationProcess/ValidationProcess';
import Benefits from './components/sections/Benefits/Benefits';
import SocialProof from './components/sections/SocialProof/SocialProof';
import Pricing from './components/sections/Pricing/Pricing';
import CTASection from './components/sections/CTASection/CTASection';
import LeadForm from './components/sections/LeadForm/LeadForm';
import FAQ from './components/sections/FAQ/FAQ';

export default function Solopreneurs() {
  return (
    <>
      <Topbar />
      <SoloHero />
      <UrgencyBar />
      <FearSection />
      <ValidationProcess />
      <Benefits />
      <SocialProof />
      <Pricing />
      <CTASection />
      <LeadForm />
      <FAQ />
      <Footer />
    </>
  );
}
