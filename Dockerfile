FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g nodemon && npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]