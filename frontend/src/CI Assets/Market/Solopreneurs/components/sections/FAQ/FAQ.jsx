import React, { useState } from 'react';
import './FAQ.css';

export default function FAQ() {
  const items = [
    {
      q: 'How accurate is the validation?',
      a: "Our AI analyzes thousands of data points including market trends, competitor analysis, and consumer behavior. While no prediction is 100% accurate, our validation has helped prevent 90% of our users from building failed products."
    },
    {
      q: 'What if my idea is too unique or niche?',
      a: 'SEKKI works especially well for unique ideas. We analyze adjacent markets, similar solutions, and emerging trends to give you insights even for completely new concepts.'
    },
    {
      q: 'Do I need a detailed business plan?',
      a: 'Not at all. Just describe your idea in a few sentences. SEKKI will do the heavy lifting of market research and analysis for you.'
    },
    {
      q: "What if the validation says my idea won't work?",
      a: "That's valuable information that could save you months or years of wasted effort. SEKKI also provides pivot suggestions and alternative approaches based on your core concept."
    },
    {
      q: 'Can I validate multiple ideas?',
      a: 'Yes! With the Solopreneur plan, you get unlimited validations. Test as many ideas as you want until you find the winner.'
    },
  ];
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section className="faq">
      <div className="container faq-container">
        {items.map((item, idx) => (
          <div className="faq-item" key={idx}>
            <button
              className="faq-question"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              {item.q}
              <span>{openIndex === idx ? '−' : '+'}</span>
            </button>
            {openIndex === idx && (
              <div className="faq-answer">{item.a}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
