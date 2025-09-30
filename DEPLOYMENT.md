# Deployment Guide

This project uses GitHub Actions for automatic deployment to Google Cloud Run.

## 🚀 Automatic Deployment

### What happens on push to `main`:
1. **Build** Docker image with Next.js app
2. **Push** image to Google Container Registry
3. **Deploy** to Cloud Run service `acumen-patrimoine`
4. **Configure** service with production settings

### Deployed URLs:
- **Main URL**: https://acumen-patrimoine-737561908545.europe-west1.run.app
- **Custom Domain**: https://beta.acumen-patrimoine.fr

---

## ⚙️ Setup GitHub Actions

### 1. Add GitHub Secret

Go to your GitHub repository → **Settings** → **Secrets and variables** → **Actions**

Add a new **Repository Secret**:
- **Name**: `GCP_SA_KEY`
- **Value**: Copy the entire JSON content from `github-actions-key.json`

### 2. Workflow Files

Two workflow files are available:

#### **Option A: Simple GCR Deployment** (Recommended)
- **File**: `.github/workflows/deploy-gcr.yml` 
- **Uses**: Google Container Registry (current setup)
- **Authentication**: Service Account JSON key

#### **Option B: Advanced GAR Deployment**
- **File**: `.github/workflows/deploy.yml`
- **Uses**: Google Artifact Registry 
- **Authentication**: Workload Identity Federation (more secure)

### 3. Manual Deployment

You can also trigger deployment manually:
1. Go to **Actions** tab in GitHub
2. Select **Deploy to Cloud Run (GCR)**
3. Click **Run workflow**

---

## 🔐 Service Account Permissions

The `github-actions-acumen` service account has:
- **Cloud Run Developer**: Deploy and manage Cloud Run services
- **Storage Admin**: Push images to Container Registry

---

## 🛠️ Local Development

### Build Docker locally:
```bash
docker build -t acumen-patrimoine .
docker run -p 3000:3000 acumen-patrimoine
```

### Deploy manually:
```bash
gcloud builds submit --config cloudbuild.yaml .
```

---

## 📊 Monitoring

### Check deployment status:
```bash
gcloud run services list --region europe-west1
gcloud run revisions list --service acumen-patrimoine --region europe-west1
```

### View logs:
```bash
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=acumen-patrimoine" --limit 50 --format="table(timestamp,textPayload)"
```

---

## 🚨 Security Notes

- **Never commit** `github-actions-key.json` to repository
- **Rotate service account keys** periodically
- **Use Workload Identity Federation** for production (see deploy.yml)
- **Review permissions** regularly

---

## 🔧 Configuration

### Environment Variables (set in workflow):
- `NODE_ENV=production`
- `NEXT_TELEMETRY_DISABLED=1`

### Service Configuration:
- **Memory**: 1Gi
- **CPU**: 1 vCPU
- **Max instances**: 10
- **Port**: 3000
- **Authentication**: Public (unauthenticated)