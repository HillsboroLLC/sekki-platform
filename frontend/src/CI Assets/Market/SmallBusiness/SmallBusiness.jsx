import React from 'react'
import './SmallBusiness.css'

import Topbar from './components/layout/Topbar'
import SBHero from './components/sections/SBHero/SBHero'
import TrustBar from './components/sections/TrustBar/TrustBar'
import ProblemSection from './components/sections/ProblemSection/ProblemSection'
import HowItWorks from './components/sections/HowItWorks/HowItWorks'
import Features from './components/sections/Features/Features'
import SocialProof from './components/sections/SocialProof/SocialProof'
import PricingComparison from './components/sections/PricingComparison/PricingComparison'
import CTASection from './components/sections/CTASection/CTASection'
import LeadForm from './components/sections/LeadForm/LeadForm'
import FAQ from './components/sections/FAQ/FAQ'
import Footer from './components/layout/Footer'

export default function SmallBusiness() {
  return (
    <>
      <Topbar />
      <SBHero />
      <TrustBar />
      <ProblemSection />
      <HowItWorks />
      <Features />
      <SocialProof />
      <PricingComparison />
      <CTASection />
      <LeadForm />
      <FAQ />
      <Footer />
    </>
  )
}
