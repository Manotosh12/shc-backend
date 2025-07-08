# Stage 1: Build the app
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .  
RUN npm run build

# Stage 2: Run the app
FROM node:22-alpine
WORKDIR /app

# Copy built output and dependencies from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.env .env

EXPOSE 3000

CMD ["node", "dist/src/main"]
