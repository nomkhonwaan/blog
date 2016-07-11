FROM node:5.12.0-slim

WORKDIR /home
ADD ./.babelrc /home/.babelrc
ADD ./src /home/src
ADD ./package.json /home/package.json

RUN npm install --all --silent \
 && npm run build

EXPOSE 8080

CMD [ "npm", "start" ]