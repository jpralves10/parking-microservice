FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install typescript -g

COPY . .

RUN tsc

EXPOSE 8080

CMD [ "node", "./dist/src/infra/http/express.js" ]