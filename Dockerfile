FROM node:20.18.1-alpine3.19

LABEL authors="maires"

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3333

ENTRYPOINT [ "npm", "run" ]

CMD [ "dev" ]