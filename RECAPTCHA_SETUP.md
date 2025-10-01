# Google reCAPTCHA v3 Setup Guide

## Quick Setup Steps

### 1. Create reCAPTCHA Site
1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin/create)
2. Click "Create" or "+"
3. Fill in the form:
   - **Label**: `Acumen Patrimoine Contact Form`
   - **reCAPTCHA type**: Select "reCAPTCHA v3"
   - **Domains**: Add your domains:
     - `localhost` (for development)
     - `your-production-domain.com` (your actual domain)
     - `your-cloud-run-url` (the Cloud Run URL)
   - Accept the terms
4. Click "Submit"

### 2. Get Your Keys
After creating the site, you'll see:
- **Site Key** (starts with `6L...`): This is public and goes in `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- **Secret Key** (starts with `6L...`): This is private and goes in `RECAPTCHA_SECRET_KEY`

### 3. Configure Environment Variables

#### For Local Development
Create `.env.local` in your project root:
```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here
```

#### For GitHub Actions / Cloud Run
Add these as GitHub repository secrets:
```bash
# Add site key (public)
gh secret set RECAPTCHA_SITE_KEY --body "your_site_key_here"

# Add secret key (private)
gh secret set RECAPTCHA_SECRET_KEY --body "your_secret_key_here"
```

### 4. Update GitHub Actions Workflow
The workflow already includes placeholders. Just add the secrets to your GitHub repository.

### 5. Testing
- **Development**: Test on localhost - should work immediately
- **Production**: Deploy and test on your live domain
- **Score Threshold**: Default is 0.5 (adjust in `/api/contact/route.ts` if needed)

## Understanding reCAPTCHA v3 Scores

reCAPTCHA v3 returns a score from 0.0 to 1.0:
- **1.0**: Very likely a good interaction
- **0.5**: Neutral (current threshold)
- **0.0**: Very likely a bot

## Troubleshooting

### Common Issues:
1. **Domain not registered**: Add your domain in the reCAPTCHA admin
2. **Keys not working**: Check that you're using the correct Site Key/Secret Key pair
3. **Local development issues**: Make sure `localhost` is added to allowed domains
4. **CORS errors**: Ensure your domain is properly configured

### Testing reCAPTCHA:
- Open browser developer tools
- Submit the contact form
- Check the console for reCAPTCHA scores and verification status
- Look for any error messages

## Security Notes

- Never expose the Secret Key in client-side code
- The Site Key is public and safe to include in frontend code
- Current score threshold is 0.5 (can be adjusted based on your needs)
- The system gracefully degrades if reCAPTCHA service is unavailable