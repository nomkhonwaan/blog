FROM node:8-alpine

WORKDIR /opt/app-root
ADD . .

RUN apk add --no-cache curl g++ gcc git make python

RUN npm install --all && \
    npm run build

RUN apk del --purge curl g++ gcc git make python

ENTRYPOINT [ "/usr/local/bin/npm" ]
CMD [ "start" ]
