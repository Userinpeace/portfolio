import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    console.log('Received contact form data:', { name, email, message })

    // Validate required fields
    if (!name || !email || !message) {
      console.log('Validation failed: Missing required fields')
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log('Validation failed: Invalid email format')
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    console.log('Validation passed, processing message...')

    // Here you would integrate with your email service
    // Examples:
    
    // Option 1: Nodemailer with Gmail/SMTP
    // const nodemailer = require('nodemailer')
    // const transporter = nodemailer.createTransporter({...})
    // await transporter.sendMail({...})
    
    // Option 2: SendGrid
    // const sgMail = require('@sendgrid/mail')
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    // await sgMail.send({...})
    
    // Option 3: Resend
    // const { Resend } = require('resend')
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({...})

    // Option 4: EmailJS (client-side, but can be server-side too)
    // await emailjs.send(...)

    // For demo purposes, we'll just log the data
    console.log('Contact form submission processed:', {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    })

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000))

    // In a real implementation, you would:
    // 1. Send email to yourself with the contact details
    // 2. Send a confirmation email to the user
    // 3. Store the message in a database
    // 4. Integrate with a CRM system

    console.log('Sending success response...')
    return NextResponse.json(
      { 
        success: true, 
        message: 'Message sent successfully!' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
