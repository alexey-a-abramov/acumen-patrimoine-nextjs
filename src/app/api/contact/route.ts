import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const {
      contactCivility,
      contactName,
      contactEmail,
      contactPhone,
      contactProfile,
      contactMessage
    } = formData;

    // Create email transporter (you'll need to configure this with your email service)
    const transporter = nodemailer.createTransport({
      // Configure with your email service (Gmail, SendGrid, etc.)
      service: 'gmail', // or your preferred service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Prepare email content (matching PHP logic)
    const emailContent = `
Civilité       : ${contactCivility}
Nom complet    : ${contactName}
Email          : ${contactEmail}
Téléphone      : ${contactPhone}
Profil         : ${contactProfile}

Message client :
${contactMessage}
    `;

    const mailOptions = {
      from: `"${contactName}" <${contactEmail}>`,
      to: 'contact@acumen-patrimoine.fr',
      replyTo: contactEmail,
      subject: `Nouveau projet patrimonial – ${contactName}`,
      text: emailContent,
      headers: {
        'Content-Type': 'text/plain; charset=UTF-8'
      }
    };

    // For development, we'll just log the email instead of sending it
    if (process.env.NODE_ENV === 'development') {
      console.log('Email that would be sent:', mailOptions);
      return NextResponse.json({ 
        success: true, 
        message: 'Votre demande a bien été envoyée. Nous vous répondrons sous 24 h ouvrées.' 
      });
    }

    // Send email in production
    await transporter.sendMail(mailOptions);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Votre demande a bien été envoyée. Nous vous répondrons sous 24 h ouvrées.' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Erreur lors de l\'envoi. Merci de réessayer ultérieurement.' 
    }, { status: 500 });
  }
}