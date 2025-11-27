FROM node:20-bullseye

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ARG BACK_PORT
ENV BACK_PORT=${BACK_PORT}

EXPOSE ${BACK_PORT}

CMD ["npm", "run", "dev"]

#DOCKER PRECISA SER ALTERADO PARA PRODUÇÃO QUANDO POSSÍVEL