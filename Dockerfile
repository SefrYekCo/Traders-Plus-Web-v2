# --------------------------
# Stage 1: Build React App
# --------------------------
FROM node:14.19.3-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (npm 6.14.17 compatible)
RUN npm install

# Copy all source files
COPY . .

# Build React app (output in /app/build)
RUN npm run build

# --------------------------
# Stage 2: Serve with Nginx
# --------------------------
FROM nginx:alpine

# Remove default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built React files from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Optional: Copy custom Nginx config (for SPA routing / HTTPS)
 COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copy SSL certificates into container
#COPY ./certs/fullchain.pem /etc/ssl/certs/fullchain.pem
#COPY ./certs/privkey.pem /etc/ssl/private/privkey.pem

# Expose HTTP and HTTPS ports
EXPOSE 80 443

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]

