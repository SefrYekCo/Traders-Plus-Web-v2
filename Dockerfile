# --------------------------
# Stage 1: Build React App
# --------------------------
FROM node:14.19.3 AS builder

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

# Expose HTTP and HTTPS ports
EXPOSE 3002

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]

