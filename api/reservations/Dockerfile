FROM node:20.11.1-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npx", "nx", "reset", "&&", "npx", "nx", "serve", "schedules"]

