FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source and build API server
COPY . .
RUN npm run build:api

# Production image
FROM node:20-alpine AS runner

WORKDIR /app

# Copy production deps and built files
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3001

# Set production mode
ENV NODE_ENV=production
ENV PORT=3001

# Start the API server
CMD ["node", "dist/api-server.cjs"]
