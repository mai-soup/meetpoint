# Build client
FROM node:19 AS client-build
WORKDIR /app
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# Build server
FROM node:19 AS server-build
WORKDIR /app
COPY server/package*.json ./
RUN npm ci
COPY server/ ./

# Final stage
FROM nginx:1.21-alpine
WORKDIR /app

# Copy built client files
COPY --from=client-build /app/build/ /app/client/build/

# Copy server files
COPY --from=server-build /app/ /app/server/

# Set up Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Start command
CMD ["sh", "-c", "nginx && cd server && npm start"]
