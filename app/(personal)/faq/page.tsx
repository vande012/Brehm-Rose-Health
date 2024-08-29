'use client'

import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import { Faq as FaqType } from '@/types'
import { PortableText } from 'next-sanity'

// GROQ query to fetch FAQ data from Sanity
const faqQuery = groq`
  *[_type == "faq"][0]{
    sections[]{
      title,
      questions[]{
        question,
        answer
      }
    }
  }
`

export default async function FaqPage() {
  const faqData: FaqType | null = await client.fetch(faqQuery)

  return (
    <div className="faq-page-container max-w-5xl mx-auto p-4 md:p-8">
      <h1 className="faq-page-title text-3xl md:text-5xl text-center font-bold mb-6">
        Frequently Asked Questions
      </h1>
      <p className="faq-description text-lg md:text-xl text-center text-gray-700 mb-12">
        Here are some frequently asked questions about different health
        insurance coverage..
      </p>
      {faqData?.sections.map((section, index) => (
        <div key={index} className="faq-section-container mb-6 md:mb-10">
          <details className="faq-section">
            <summary className="faq-section-title text-2xl md:text-3xl font-semibold text-custom-blue mb-4">
              {section.title}
            </summary>
            <ul className="faq-questions-list">
              {section.questions.map((question, questionIndex) => (
                <li key={questionIndex} className="faq-question-container mb-4">
                  <details className="faq-question">
                    <summary className="faq-question-title text-xl md:text-2xl font-medium cursor-pointer flex items-center">
                      <span className="faq-toggle-icon mr-5">+</span>
                      {question.question}
                    </summary>
                    <div className="faq-answer-container mt-2 text-gray-700 text-lg md:text-xl">
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
  )
}
