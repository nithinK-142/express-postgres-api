FROM node:18-alpine

# Use Node.js base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package files
COPY package*.json ./

# install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3001

# Start the application
CMD ["node", "src/server.js"]
