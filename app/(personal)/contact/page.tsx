import dynamic from 'next/dynamic'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Brehm Rose Health',
  description: 'Get in touch with Brehm Rose Health today!',
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
}

const DynamicContactForm = dynamic(() => import('@/components/shared/ContactForm'), {
  ssr: false,
})

const ClientErrorBoundary = dynamic(() => import('@/components/shared/ClientErrorBoundary'), {
  ssr: false,
})

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-4">Please fill out the form below to get in touch with us.</p>
      <ClientErrorBoundary>
        <DynamicContactForm />
      </ClientErrorBoundary>
    </div>
  )
}
