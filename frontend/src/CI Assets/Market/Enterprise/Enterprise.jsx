import React from 'react';
import './Enterprise.css';

import Topbar from './components/layout/Topbar';
import Footer from './components/layout/Footer';

import EnterpriseHero from './components/sections/EnterpriseHero/EnterpriseHero';
import UrgencyBar from './components/sections/UrgencyBar/UrgencyBar';
import FearSection from './components/sections/FearSection/FearSection';
import ValidationProcess from './components/sections/ValidationProcess/ValidationProcess';
import BenefitsSection from './components/sections/BenefitsSection/BenefitsSection';
import SocialProof from './components/sections/SocialProof/SocialProof';
import StatsSection from './components/sections/StatsSection/StatsSection';
import PricingSection from './components/sections/PricingSection/PricingSection';
import CTASection from './components/sections/CTASection/CTASection';
import LeadFormSection from './components/sections/LeadFormSection/LeadFormSection';
import FAQ from './components/sections/FAQSection/FAQ';

export default function Enterprise() {
  return (
    <>
      <Topbar />
      <EnterpriseHero />
      <UrgencyBar />
      <FearSection />
      <ValidationProcess />
      <BenefitsSection />
      <SocialProof />
      <StatsSection />
      <PricingSection />
      <CTASection />
      <LeadFormSection />
      <FAQ />
      <Footer />
    </>
  );
}
