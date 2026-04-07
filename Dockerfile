# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
COPY server/package.json server/
COPY client/package.json client/

# Install dependencies
RUN npm ci

# Build client
WORKDIR /app/client
RUN npm ci
RUN npm run build

# Build server
WORKDIR /app/server
RUN npm ci

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy server files
COPY --from=builder /app/server /app/server
COPY --from=builder /app/server/node_modules /app/server/node_modules

# Copy built client
COPY --from=builder /app/client/dist /app/client/dist

# Copy prisma schema and migrations
COPY prisma /app/prisma

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app/server

# Run migrations and start server
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
