# Acumen Patrimoine - Next.js Migration

This repository contains the Next.js TypeScript migration of the Acumen Patrimoine PHP application, a real estate investment platform focused on LMNP property resales for wealth advisors (CGP partners).

## 🚀 Quick Start

```bash
# Install dependencies
yarn install

# Run development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API routes
│   │   ├── auth/       # Authentication endpoints
│   │   └── contact/    # Contact form handler
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── Footer.tsx
│   ├── Navigation.tsx
│   ├── HeroSection.tsx
│   ├── StatsSection.tsx
│   ├── AboutSection.tsx
│   ├── ServicesSection.tsx
│   ├── ContactSection.tsx
│   ├── RecruitmentSection.tsx
│   └── PartnersSection.tsx
└── lib/               # Utility functions
    └── email.ts       # Email configuration
```

## 🔧 Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Authentication**: NextAuth.js
- **Email**: Nodemailer
- **Package Manager**: Yarn with PnP
- **Deployment**: Google Cloud Run
- **CI/CD**: GitHub Actions

## 🔐 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Admin Credentials
ADMIN_PASSWORD=your-admin-password

# Email Configuration (SMTP)
EMAIL_HOST=smtp.your-provider.com
EMAIL_PORT=587
EMAIL_USER=your-email@domain.com
EMAIL_PASS=your-email-password
EMAIL_FROM=your-email@domain.com
EMAIL_TO=recipient@domain.com

# Google Sheets Integration
GOOGLE_SHEETS_ID=your-google-sheets-id
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account","project_id":"...","private_key_id":"..."}
```

## 📧 Email Configuration

The application uses Nodemailer for email functionality. Configure your SMTP settings in the environment variables above. The contact form sends emails using the configured SMTP server.

## 📊 Google Sheets Integration

The application automatically saves all contact form submissions to a Google Sheets spreadsheet with the following information:

- **Timestamp**: Date and time of submission (France timezone)
- **Name**: Full name with civility
- **Email**: Contact email address
- **Phone**: Phone number (if provided)
- **Subject**: Generated from user profile selection
- **Message**: User's message content
- **IP Address**: Client's IP address
- **Status**: Automatically set to "New"

### Setting up Google Sheets Integration

1. **Create a Google Cloud Service Account:**
   ```bash
   gcloud iam service-accounts create sheets-api \
     --display-name="Google Sheets API Service Account"
   ```

2. **Generate and download service account key:**
   ```bash
   gcloud iam service-accounts keys create sheets-key.json \
     --iam-account=sheets-api@YOUR_PROJECT_ID.iam.gserviceaccount.com
   ```

3. **Share your Google Sheets with the service account:**
   - Open your Google Sheets document
   - Click "Share" button
   - Add the service account email (e.g., `sheets-api@YOUR_PROJECT_ID.iam.gserviceaccount.com`)
   - Give "Editor" permissions

4. **Configure environment variables:**
   - `GOOGLE_SHEETS_ID`: Extract from your Google Sheets URL
   - `GOOGLE_SHEETS_CREDENTIALS`: Content of the service account JSON key file

## 🚢 Deployment

### GitHub Actions (Recommended)

This repository is configured with GitHub Actions for automatic deployment to Google Cloud Run.

**Prerequisites:**
1. Google Cloud Project with billing enabled
2. Enable required APIs:
   - Cloud Run API
   - Container Registry API
   - Cloud Build API

**Setup:**

1. Create a service account in Google Cloud Console:
   ```bash
   gcloud iam service-accounts create github-actions \
     --display-name="GitHub Actions Service Account"
   ```

2. Grant necessary permissions:
   ```bash
   gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
     --member="serviceAccount:github-actions@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
     --role="roles/run.admin"
   
   gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
     --member="serviceAccount:github-actions@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
     --role="roles/storage.admin"
   
   gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
     --member="serviceAccount:github-actions@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
     --role="roles/iam.serviceAccountUser"
   ```

3. Create and download service account key:
   ```bash
   gcloud iam service-accounts keys create key.json \
     --iam-account=github-actions@YOUR_PROJECT_ID.iam.gserviceaccount.com
   ```

4. Add GitHub repository secrets:
   - `GCP_SA_KEY`: Content of the key.json file

5. Update environment variables in `.github/workflows/deploy-gcr.yml`:
   - `PROJECT_ID`: Your Google Cloud Project ID
   - `SERVICE_NAME`: Your Cloud Run service name
   - `REGION`: Your preferred region (e.g., europe-west1)

**Deployment Process:**
- Push to `main` branch triggers automatic deployment
- Pull requests trigger build and test only
- Manual deployment available via GitHub Actions UI

### Manual Deployment

You can also deploy manually using the included scripts:

```bash
# Deploy to Cloud Run
./deploy.sh
```

Or using Docker directly:

```bash
# Build Docker image
docker build -t acumen-patrimoine .

# Run locally
docker run -p 3000:3000 acumen-patrimoine
```

## 🔍 Features Migrated from PHP

### Authentication System
- Simple password-based admin login
- Session management with NextAuth.js
- Protected routes for admin areas

### Contact Form
- Email sending via Nodemailer
- Form validation
- SMTP configuration support

### Content Sections
- Hero section with call-to-action
- Statistics display
- Services showcase
- About section
- Contact information
- Recruitment information
- Partner login area

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Consistent styling across all components
- Modern UI/UX improvements

## 🧪 Development

### Available Scripts

```bash
# Development
yarn dev          # Start development server
yarn build        # Build for production
yarn start        # Start production server
yarn lint         # Run ESLint
yarn lint:fix     # Fix ESLint issues

# Docker
docker build -t acumen-patrimoine .
docker run -p 3000:3000 acumen-patrimoine
```

### Code Quality

The project includes:
- ESLint configuration for code quality
- TypeScript for type safety
- Prettier integration (via ESLint)
- Git hooks for pre-commit checks

## 📝 Migration Notes

This application was migrated from a PHP-based system while preserving:
- Original design and layout
- Form functionality
- Email processing
- Authentication flow
- Content structure

Key improvements include:
- Modern React architecture
- TypeScript type safety
- Improved performance with Next.js
- Better developer experience
- Automated deployment pipeline

## 🐛 Troubleshooting

### Common Issues

1. **Yarn PnP Issues**: Make sure to use `yarn install --immutable` for consistent installs
2. **Email Not Sending**: Verify SMTP configuration in environment variables
3. **Build Failures**: Check that all environment variables are properly set
4. **Docker Issues**: Ensure Docker daemon is running and has sufficient resources

### Support

For issues and questions related to this migration, please check:
1. GitHub Issues tab
2. GitHub Actions logs for deployment issues
3. Google Cloud Console for runtime errors

## 📄 License

This project is proprietary software developed for Sextant Properties / Acumen Patrimoine.
