// src/app/api/contact/route.js

import nodemailer from 'nodemailer'
import { client } from '@/sanity/lib/client'
import { token, writeToken } from '@/sanity/lib/token'

export async function POST(request: Request) {
  try {
    const { name, email, phone, message, type } = await request.json()
    const clientWithWriteToken = client.withConfig({ token: writeToken })
    const result = await clientWithWriteToken.create({
      _type: 'contact',
      name,
      email,
      phone,
      message,
      type,
    })

    console.log('Sanity create result:', result)
    
    // Send email
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT!) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        ciphers: 'SSLv3'
      }
    })

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: 'New contact form submission',
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}\nType: ${type}`,
    }

    await transporter.sendMail(mailOptions)

    return new Response(
      JSON.stringify({ message: 'Thank you, we will be in touch soon!' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error) {
    console.error('Error in POST /api/contact:', error)
    return new Response(
      JSON.stringify({
        message: 'Error submitting form, please try again',
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
}
