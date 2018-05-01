FROM node:10

WORKDIR /load-balancer
COPY ./load-balancer/package*.json ./
RUN npm install
COPY ./load-balancer/ .

EXPOSE 8008
CMD ["npm", "start"]
