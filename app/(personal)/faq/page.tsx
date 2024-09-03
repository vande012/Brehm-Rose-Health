'use client'

import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import { Faq as FaqType } from '@/types'
import { PortableText } from 'next-sanity'
import '@/styles/index.css'

// GROQ query to fetch FAQ data from Sanity
const faqQuery = groq`
  *[_type == "faq"][0]{
    sections[] {
      title,
      questions[] {
        question,
        answer
      }
    }
  }
`
export default async function FaqPage() {
  const faqData: FaqType | null = await client.fetch(faqQuery)

  const faqJsonLd = generateFaqJsonLd(faqData)

  return (
    <div className="faq-page-container max-w-5xl mx-auto p-4 md:p-8">
      <h1 className="faq-page-title text-4xl md:text-6xl text-center font-extrabold mb-8 text-gray-900">
        Frequently Asked Questions
      </h1>
      <p className="faq-description text-lg md:text-2xl text-center text-gray-600 mb-16">
        Here are some frequently asked questions about different health
        insurance coverage.
      </p>
      <div className="faq-content grid grid-cols-1 md:grid-cols-2 gap-8">
        {faqData?.sections.map((section, index) => (
          <div key={index} className="faq-section-container">
            <details className="faq-section px-8 py-4 group border border-gray-300 rounded-lg shadow-sm">
              <summary className="faq-section-title text-2xl md:text-3xl font-semibold cursor-pointer flex justify-between items-center text-gray-800">
                {section.title}
                <span className="faq-toggle-icon transform transition-transform duration-300 group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <ul className="faq-questions-list space-y-6 mt-4">
                {section.questions.map((question, questionIndex) => (
                  <li key={questionIndex} className="faq-question-container">
                    <details className="faq-question group">
                      <summary className="faq-question-title text-xl md:text-2xl font-medium px-4 py-2 cursor-pointer flex justify-between items-center text-gray-700">
                        {question.question}
                        <span className="faq-toggle-icon transform transition-transform duration-300">
                          <svg
                            fill="none"
                            height="24"
                            shapeRendering="geometricPrecision"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            width="24"
                          >
                            <path d="M6 9l6 6 6-6"></path>
                          </svg>
                        </span>
                      </summary>
                      <div className="faq-answer-container mt-2 text-gray-600 text-lg md:text-xl">
                        <PortableText value={question.answer} />
                      </div>
                    </details>
                  </li>
                ))}
              </ul>
            </details>
          </div>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </div>
  )
}

function generateFaqJsonLd(faqData) {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.sections.flatMap((section) =>
      section.questions.map((question) => ({
        '@type': 'Question',
        name: question.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: question.answer,
        },
      })),
    ),
  }

  return faqJsonLd
}
