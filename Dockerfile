# ============================================================
# RetireOS CFP - Multi-stage Dockerfile
# ============================================================

# Stage 1: Build client
FROM node:20-alpine AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci --silent
COPY client/ ./
RUN NODE_OPTIONS="--max-old-space-size=1536" npm run build

# Stage 2: Build server
FROM node:20-alpine AS server-builder
WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci --silent
COPY server/ ./
RUN npx tsc

# Stage 3: Production
FROM node:20-alpine AS production
RUN apk add --no-cache dumb-init
WORKDIR /app

# Copy server dist + node_modules
COPY --from=server-builder /app/server/dist ./server/dist
COPY --from=server-builder /app/server/node_modules ./server/node_modules
COPY --from=server-builder /app/server/package.json ./server/package.json

# Copy Prisma schema and client
COPY prisma ./prisma
RUN cd /app/server && npx prisma generate

# Copy built React client
COPY --from=client-builder /app/client/dist ./client/dist

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Migrate DB and start
CMD ["sh", "-c", "cd /app/server && npx prisma migrate deploy --schema=/app/prisma/schema.prisma && node dist/index.js"]
