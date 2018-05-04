FROM node:10

WORKDIR /shared
COPY ./shared/package*.json ./
RUN npm install
COPY ./shared/ .

WORKDIR /client
COPY ./client/package*.json ./
RUN npm install
COPY ./client/ .

EXPOSE 1138
CMD ["npm", "start"]
