# -------- Base Image --------
FROM node:20-alpine AS base
WORKDIR /app 

RUN apk update && apk add git

COPY package*.json ./
RUN npm install

COPY tsconfig.json .
COPY src ./src
COPY .env . 

RUN npm run build

EXPOSE 4000
CMD ["npm", "run", "start"]
