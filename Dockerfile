FROM node:5.12.0-slim

WORKDIR /home 
ADD src/ .
ADD package.json .

RUN npm install --all \
 && npm run build \
 && cp config.example.js config.js

EXPOSE 8080

CMD [ "npm", "start" ]