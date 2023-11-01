# Stage 1: Build the application
FROM node:latest as builder

WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install --omit=dev

# Copy the rest of the application source code to the container
COPY . .

# Build the NestJS application
RUN npm run build

# Stage 2: Create a production image
FROM node:14

WORKDIR /app

# Copy only the built application from the previous stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./

# Expose the port your NestJS application will run on (adjust as needed) get port from .env file
EXPOSE $PORT


# run node dist/main.js to start your NestJS application
CMD ["node", "./dist/main.js"]


