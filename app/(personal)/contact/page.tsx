import { Suspense } from 'react'
import ContactForm from '@/components/shared/ContactForm'
import ErrorBoundary from '@/components/shared/ErrorBoundary'
import dynamic from 'next/dynamic'

const DynamicContactForm = dynamic(() => import('@/components/shared/ContactForm'), {
  ssr: false,
})

export default function ContactPage(): JSX.Element {
  return (
    <>
      <h1 className="text-3xl text-center my-4">Contact Us</h1>
      <p className="text-md text-center px-2">
        Please leave your information and a brief message and we will be in
        touch with you soon!
      </p>
      <Suspense fallback={<div>Loading form...</div>}>
        <ErrorBoundary>
          <DynamicContactForm />
        </ErrorBoundary>
      </Suspense>
    </>
  )
}
