FROM node:20 AS server

RUN mkdir -p /usr/src/server
RUN chmod -R 777 /usr/src/server

WORKDIR /usr/src/server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4004


CMD [ "npm", "run", "dev" ]