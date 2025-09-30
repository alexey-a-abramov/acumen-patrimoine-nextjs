#!/bin/bash

# Set variables
PROJECT_ID="sextant-prestige-poc"
SERVICE_NAME="acumen-patrimoine"
REGION="europe-west1"

echo "🚀 Deploying Acumen Patrimoine to Cloud Run..."

# Set the project
gcloud config set project $PROJECT_ID

# Enable required APIs
echo "📦 Enabling required APIs..."
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

# Submit build to Cloud Build
echo "🔨 Building and deploying with Cloud Build..."
gcloud builds submit --config cloudbuild.yaml .

# Get the service URL
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region=$REGION --format="value(status.url)")

echo "✅ Deployment complete!"
echo "🌐 Your application is available at: $SERVICE_URL"

# Optional: Open in browser (macOS)
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🔗 Opening in browser..."
    open $SERVICE_URL
fi