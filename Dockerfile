# Base image: Node LTS
FROM node:20.4.0-alpine

# Create application directory and move there
WORKDIR /app

# Copy package.json and pnpm-lock.yaml from the host to the container
COPY package.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Build the app
RUN npm run build

# Expose the port
EXPOSE 3000

CMD ["npm", "start"]
