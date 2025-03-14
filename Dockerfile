FROM node:alpine3.20

EXPOSE 3000
WORKDIR /app

COPY package.json .
RUN yarn

COPY . .

RUN chmod +x bin/*.sh


# RUN npm run build

CMD [ "bin/start.sh" ]