FROM node:20 AS server

RUN mkdir -p /usr/src/server
RUN chmod -R 777 /usr/src/server

WORKDIR /usr/src/server

COPY package*.json ./

# install dependencies
RUN npm install

# Install redis-tools for testing
RUN apt-get update && apt-get install -y redis-tools

COPY . .

EXPOSE 4004


CMD [ "npm", "run", "dev" ]