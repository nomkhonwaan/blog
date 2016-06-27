FROM node:5.12.0-slim

RUN mkdir -p /src/nomkhonwaan.com
WORKDIR /src/nomkhonwaan.com
ADD . .

RUN npm install --all \
 && npm run build

EXPOSE 8080

CMD [ "npm", "start" ]