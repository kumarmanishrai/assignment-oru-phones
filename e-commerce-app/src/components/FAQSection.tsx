import { useState } from "react";

const FAQS = [
  {
    question: "How to sell your old phone on OruPhones?",
    answer: [
      "Get instant quote using our AI-powered valuation system",
      "Schedule free doorstep pickup at your convenience",
      "Get professional quality check & data wiping",
      "Receive instant payment via UPI/Bank Transfer",
    ],
  },
  {
    question: "Is it safe to buy used phones on OruPhones?",
    answer: [
      "360° quality certification process",
      "7-stage refurbishment by certified technicians",
      "12-month warranty on all devices",
      "15-day easy returns policy",
      "Secure payment gateway protection",
    ],
  },
  {
    question: "What are the benefits of selling phones on ORUphones?",
    answer: [
      "Get prices 20% higher than local markets",
      "Free pickup from any location in India",
      "Instant payment within 24 hours of verification",
      "Eco-friendly recycling of non-sellable devices",
      "Complete data security guarantee",
    ],
  },
  {
    question: "How can I check the condition of a used phone on the platform?",
    answer: [
      "🔍 Detailed condition grading (Like New/Excellent/Good)",
      "📸 12+ actual device photos from all angles",
      "📋 50+ quality parameters checklist",
      "📈 Price comparison with market rates",
      "📞 Live video inspection option available",
    ],
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      className="w-full px-0 md:px-8 lg:px-16 pb-48 pt-18"
  id="faq-section"
    >
      <h2
        className="text-3xl md:text-4xl font-bold text-yellow-400 mb-8 text-center"
        id="faq-heading"
      >
        Frequently Asked Questions
      </h2>

      <div className="space-y-4" id="faq-list">
        {FAQS.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-700 rounded-lg overflow-hidden"
            id={`faq-item-${index}`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left bg-gray-800 hover:bg-gray-700 transition-colors flex justify-between items-center"
              id={`faq-question-${index}`}
            >
              <span className="text-lg font-medium text-gray-100">
                {faq.question}
              </span>
              <svg
                className={`w-6 h-6 text-yellow-400 transform transition-transform ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                activeIndex === index
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
              id={`faq-answer-${index}`}
            >
              <div className="px-6 py-4 bg-gray-900 border-t border-gray-700">
                <ul className="text-gray-300 space-y-3">
                  {faq.answer.map((point, pointIndex) => (
                    <li
                      key={pointIndex}
                      className="flex items-center  space-x-3"
                      id={`faq-point-${index}-${pointIndex}`}
                    >
                      <span className="text-yellow-400 mt-1">•</span>
                      <span className="flex-1">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
