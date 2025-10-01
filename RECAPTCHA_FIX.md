# reCAPTCHA Fix Instructions

## Current Issue
You're experiencing reCAPTCHA loading errors because you're using Google's test keys, which have limitations and may not work properly on all localhost configurations.

## Quick Fix for Development

### Option 1: Get Real reCAPTCHA Keys (Recommended)

1. **Go to Google reCAPTCHA Admin Console:**
   https://www.google.com/recaptcha/admin/create

2. **Create a new reCAPTCHA v3 site:**
   - Label: "Acumen Patrimoine Development"
   - reCAPTCHA type: Select "reCAPTCHA v3"
   - Domains: Add these domains:
     - `localhost`
     - `127.0.0.1`
     - `your-production-domain.com` (if you have one)

3. **Get your keys:**
   - Site Key (starts with `6L...`) - this is public
   - Secret Key (starts with `6L...`) - this is private

4. **Update your `.env.local` file:**
   ```bash
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_new_site_key_here
   RECAPTCHA_SECRET_KEY=your_new_secret_key_here
   ```

5. **Restart your development server**

### Option 2: Disable reCAPTCHA for Development (Temporary)

If you want to continue development without reCAPTCHA for now:

1. **Comment out the reCAPTCHA keys in `.env.local`:**
   ```bash
   # NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
   # RECAPTCHA_SECRET_KEY=6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe
   ```

2. **Restart your development server**

The form will still work, but without reCAPTCHA protection.

## What I've Already Fixed

I've improved the error handling in your `RecaptchaProvider.tsx` component to:

- Detect when test keys are being used and show warnings
- Gracefully fallback when reCAPTCHA fails to load
- Provide better console logging for debugging
- Use async/defer loading to prevent blocking

## Expected Results

After implementing either fix:
- ✅ No more `logo.png14` errors in console
- ✅ No more QUIC_NETWORK_IDLE_TIMEOUT errors
- ✅ Form will work properly
- ✅ Better error handling and user experience

## Next Steps

1. Choose Option 1 (recommended) or Option 2 above
2. Restart your development server: `npm run dev` or `yarn dev`
3. Test the form submission
4. Check browser console for any remaining errors

If you continue to see issues after following these steps, please share the console output.