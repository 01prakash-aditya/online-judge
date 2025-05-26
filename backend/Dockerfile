# backend/Dockerfile
FROM node:18

# Install g++
RUN apt-get update && apt-get install -y g++
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 8000
CMD ["node", "index.js"]

