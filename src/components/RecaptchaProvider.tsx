'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { ReactNode, useEffect, useState } from 'react';

interface RecaptchaProviderProps {
  children: ReactNode;
}

export default function RecaptchaProvider({ children }: RecaptchaProviderProps) {
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const [hasError] = useState(false);

  useEffect(() => {
    // Check if we're using test keys and warn
    if (recaptchaKey === '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI') {
      console.warn('⚠️ Using Google test reCAPTCHA keys. This may cause loading errors in development.');
      console.warn('For production, replace with real keys from https://www.google.com/recaptcha/admin/create');
    }
  }, [recaptchaKey]);

  if (!recaptchaKey) {
    console.warn('NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set. reCAPTCHA will be disabled.');
    return <>{children}</>;
  }

  if (hasError) {
    console.warn('reCAPTCHA failed to load, continuing without reCAPTCHA protection.');
    return <>{children}</>;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={recaptchaKey}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: 'head',
        nonce: undefined
      }}
      useRecaptchaNet={false}
      useEnterprise={false}
      container={{
        parameters: {
          badge: 'bottomright',
          theme: 'light'
        }
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
