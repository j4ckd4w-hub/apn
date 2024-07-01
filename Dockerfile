# Stage 1: Build the Angular application
FROM node:21 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN npm run build --dev

# Stage 2: Serve the Angular application
FROM nginx:alpine

# Copy the built Angular application from the builder stage
#COPY --from=builder /app/dist/apn-exercise /usr/share/nginx/html
COPY --from=builder /app/dist/apn-exercise/browser /usr/share/nginx/html

# Expose port 79
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
