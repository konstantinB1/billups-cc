FROM node:alpine
WORKDIR /app

COPY packages/api/package.json ./

RUN npm install

COPY . .

# Server
EXPOSE 8000


CMD ["npm", "run", "api:dev"]