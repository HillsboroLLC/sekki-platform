import React, { useState } from 'react'
import './FAQ.css'

export default function FAQ() {
  const items = [
    { q:'How quickly will I see results?', a:'Most customers get their first actionable insights within 24 hours…' },
    { q:'Do I need any technical knowledge?', a:'Not at all. SEKKI is designed for business owners…' },
    { q:'What if SEKKI doesn’t work for my business?', a:'We offer a 14-day free trial… no questions asked.' },
    { q:'How is this different from hiring a consultant?', a:'SEKKI gives you the same quality insights…' },
    { q:'Can I upgrade or downgrade my plan?', a:'Yes, you can change your plan anytime…' },
  ]
  const [openIdx, setOpenIdx] = useState(null)
  return (
    <section className="faq">
      <div className="container">
        <div className="section-header"><h2 className="section-title">Frequently Asked Questions</h2></div>
        <div className="faq-container">
          {items.map((f,i)=>(
            <div className="faq-item" key={i}>
              <button className="faq-question" onClick={()=>setOpenIdx(openIdx===i?null:i)}>
                {f.q}<span>{openIdx===i?'−':'+'}</span>
              </button>
              {openIdx===i && <div className="faq-answer">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
