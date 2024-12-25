# Use Node.js base image
FROM node:18-alpine

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory in the container
WORKDIR /app

# Copy package files
COPY package*.json ./

# install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3001

# Start the application
CMD ["pnpm", "start"]
