# Use Node.js 18 Alpine image
FROM node:18-alpine

# Install dependencies
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app

# Enable corepack for Yarn
RUN corepack enable

# Copy package files
COPY package.json yarn.lock ./
COPY .yarnrc.yml ./.yarnrc.yml
COPY .yarn ./.yarn

# Install dependencies
RUN yarn install --immutable

# Copy source code
COPY . .

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Build the application
RUN yarn build

# Expose port
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]
