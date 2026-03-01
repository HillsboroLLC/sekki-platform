import React, { useState } from 'react';
import './FAQ.css';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = [
    {
      question: "How does SEKKI integrate with our existing systems?",
      answer: "SEKKI offers enterprise-grade APIs and pre-built connectors for major ERP, CRM, and BI platforms. Our technical team provides white-glove integration support to ensure seamless connectivity with your existing infrastructure."
    },
    {
      question: "What security measures are in place for enterprise data?",
      answer: "SEKKI is SOC 2 Type II certified, GDPR compliant, and uses enterprise-grade encryption. We offer on-premise deployment options and maintain strict data governance protocols for Fortune 500 clients."
    },
    {
      question: "How quickly can we see results after implementation?",
      answer: "Most enterprise clients see initial insights within 24-48 hours of implementation. Full platform deployment typically takes 2-4 weeks, including integration, training, and customization."
    },
    {
      question: "What kind of support do enterprise clients receive?",
      answer: "Enterprise clients receive dedicated account management, priority technical support, custom training programs, and quarterly strategic consultation sessions with our expert team."
    },
    {
      question: "Can SEKKI handle our industry-specific requirements?",
      answer: "Yes, SEKKI’s AI models are trained on industry-specific data and can be customized for your sector’s unique requirements, regulatory environment, and competitive landscape."
    }
  ];

  return (
    <section className="faq">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Frequently Asked Questions</h2>
        </div>
        <div className="faq-container">
          {faqs.map((item, idx) => (
            <div className="faq-item" key={idx}>
              <button
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                {item.question}
                <span>{openIndex === idx ? '−' : '+'}</span>
              </button>
              <div
                className="faq-answer"
                style={{ display: openIndex === idx ? 'block' : 'none' }}
              >
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
