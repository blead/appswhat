FROM node:10

WORKDIR /server
COPY ./server/package*.json ./
RUN npm install
COPY ./server/ .

EXPOSE 8080
CMD ["npm", "start"]
