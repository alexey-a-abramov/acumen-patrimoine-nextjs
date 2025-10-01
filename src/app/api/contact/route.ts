import { NextResponse } from 'next/server';
import { sheetsService } from '@/lib/sheets';

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const {
      contactCivility,
      contactName,
      contactEmail,
      contactPhone,
      contactProfile,
      contactMessage,
      recaptchaToken
    } = formData;

    // Get client IP address
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
    
    // Verify reCAPTCHA token if provided
    if (recaptchaToken && process.env.RECAPTCHA_SECRET_KEY) {
      try {
        const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            secret: process.env.RECAPTCHA_SECRET_KEY,
            response: recaptchaToken,
            remoteip: ip
          }),
        });

        const recaptchaResult = await recaptchaResponse.json();
        
        if (!recaptchaResult.success) {
          console.warn('reCAPTCHA verification failed:', recaptchaResult);
          return NextResponse.json({ 
            success: false, 
            message: 'Verification de sécurité échouée. Veuillez réessayer.' 
          }, { status: 400 });
        }
        
        // Check score (for v3) - should be > 0.5 for legitimate requests
        if (recaptchaResult.score && recaptchaResult.score < 0.5) {
          console.warn('reCAPTCHA score too low:', recaptchaResult.score);
          return NextResponse.json({ 
            success: false, 
            message: 'Verification de sécurité échouée. Veuillez réessayer.' 
          }, { status: 400 });
        }
        
        console.log('reCAPTCHA verification successful, score:', recaptchaResult.score);
      } catch (recaptchaError) {
        console.error('reCAPTCHA verification error:', recaptchaError);
        // Continue without blocking if reCAPTCHA service is down
        console.warn('Continuing without reCAPTCHA verification due to service error');
      }
    } else if (!recaptchaToken && process.env.RECAPTCHA_SECRET_KEY) {
      if (process.env.NODE_ENV === 'production') {
        console.warn('reCAPTCHA token missing in production');
        // In production, you might want to return an error here
      } else {
        console.log('reCAPTCHA token missing in development - continuing');
      }
    }

    // Create timestamp in French format
    const timestamp = new Date().toLocaleString('fr-FR', {
      timeZone: 'Europe/Paris',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });


    // Save to Google Sheets only (no email sending)
    try {
      await sheetsService.ensureHeaderRow();
      await sheetsService.appendContactFormData({
        name: `${contactCivility} ${contactName}`,
        email: contactEmail,
        phone: contactPhone || 'N/A',
        subject: `${contactProfile} - Nouveau projet patrimonial`,
        message: contactMessage,
        timestamp,
        ipAddress: ip
      });
      console.log('Contact form data saved to Google Sheets');
      
      return NextResponse.json({ 
        success: true, 
        message: 'Votre demande a bien été enregistrée. Nous vous répondrons sous 24 h ouvrées.' 
      });
    } catch (sheetsError) {
      console.error('Failed to save to Google Sheets:', sheetsError);
      return NextResponse.json({ 
        success: false, 
        message: 'Erreur lors de l\'enregistrement. Merci de réessayer ultérieurement.' 
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Erreur lors de l\'envoi. Merci de réessayer ultérieurement.' 
    }, { status: 500 });
  }
}