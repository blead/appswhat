FROM node:10

WORKDIR /shared
COPY ./shared/package*.json ./
RUN npm install
COPY ./shared/ .

WORKDIR /logger
COPY ./logger/package*.json ./
RUN npm install
COPY ./logger/ .

EXPOSE 8888
CMD ["npm", "start"]
