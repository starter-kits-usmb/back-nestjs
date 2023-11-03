FROM node:lts-alpine

WORKDIR /app

COPY . .

# copy .env.prod to .env
COPY .env.prod .env

# Install dependencies and build the application
RUN npm install
RUN npm run build

# Expose the necessary port (if needed)
EXPOSE 3000
