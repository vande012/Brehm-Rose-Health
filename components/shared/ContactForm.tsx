'use client'

import { useState, useEffect } from 'react'

interface FormField {
  required: boolean
  fieldName: string
  placeholder: string
  fieldId: string
  inputType: 'text' | 'email' | 'tel' | 'textarea' | 'select'
  isRequiredWhenMultiSelect: boolean
  type: { title: string; value: string }[]
}

interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
  type: string
}

const formFields: FormField[] = [
  {
    required: true,
    fieldName: 'Name',
    placeholder: 'Your Name',
    fieldId: 'name',
    inputType: 'text',
    isRequiredWhenMultiSelect: false,
    type: [],
  },
  {
    required: true,
    fieldName: 'Email',
    placeholder: 'Your Email',
    fieldId: 'email',
    inputType: 'email',
    isRequiredWhenMultiSelect: false,
    type: [],
  },
  {
    required: false,
    fieldName: 'Phone',
    placeholder: 'Your Phone',
    fieldId: 'phone',
    inputType: 'tel',
    isRequiredWhenMultiSelect: false,
    type: [],
  },
  {
    required: true,
    fieldName: 'Message',
    placeholder: 'Your Message',
    fieldId: 'message',
    inputType: 'textarea',
    isRequiredWhenMultiSelect: false,
    type: [],
  },
  {
    required: true,
    fieldName: 'Type',
    placeholder: 'Type',
    fieldId: 'type',
    inputType: 'select',
    isRequiredWhenMultiSelect: true,
    type: [
      { title: 'Short Term Coverage', value: 'Short Term Coverage' },
      {
        title: 'Employee Benefit Group Insurance Coverage',
        value: 'Employee Benefit Group Insurance Coverage',
      },
      {
        title: 'Individual Insurance Coverage',
        value: 'Individual Insurance Coverage',
      },
      {
        title: 'Medicare and Senior Coverage',
        value: 'Medicare and Senior Coverage',
      },
    ],
  },
]

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    type: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<boolean | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    console.log('ContactForm mounted')
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(null)
    setErrorMessage(null)
    console.log('Form submitted', formData)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const responseData = await res.json()
      console.log('API response', res.status, responseData)

      if (res.ok) {
        setSuccess(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          type: '',
        })
      } else {
        setSuccess(false)
        setErrorMessage(responseData.message || 'An error occurred while submitting the form.')
      }
    } catch (error) {
      console.error('Error submitting form', error)
      setSuccess(false)
      setErrorMessage('An unexpected error occurred. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-md mx-auto p-4 m-6 bg-white rounded-md shadow-md"
    >
      {formFields.map((field) => (
        <div key={field.fieldId} className="mb-4">
          <label
            htmlFor={field.fieldId}
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            {field.fieldName}
          </label>

          {field.inputType === 'select' ? (
            <select
              id={field.fieldId}
              value={formData[field.fieldId as keyof ContactFormData]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [field.fieldId as keyof ContactFormData]: e.target.value,
                })
              }
              required={field.required}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select {field.fieldName}</option>
              {field.type.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.title}
                </option>
              ))}
            </select>
          ) : field.inputType === 'textarea' ? (
            <textarea
              id={field.fieldId}
              value={formData[field.fieldId as keyof ContactFormData]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [field.fieldId as keyof ContactFormData]: e.target.value,
                })
              }
              required={field.required}
              placeholder={field.placeholder}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows={4}
            />
          ) : (
            <input
              id={field.fieldId}
              type={field.inputType}
              value={formData[field.fieldId as keyof ContactFormData]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [field.fieldId as keyof ContactFormData]: e.target.value,
                })
              }
              required={field.required}
              placeholder={field.placeholder}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={loading}
        className="bg-custom-blue hover:bg-custom-green text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {loading ? 'Sending...' : 'Send'}
      </button>
      {success !== null && (
        <p className={`mt-4 ${success ? 'text-green-600' : 'text-red-600'}`}>
          {success
            ? 'Message sent successfully, we will be in touch soon!'
            : errorMessage || 'Failed to send message, please try again.'}
        </p>
      )}
    </form>
  )
}
