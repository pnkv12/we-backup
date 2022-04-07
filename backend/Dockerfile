FROM node:16.14.0
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD node src/server.js