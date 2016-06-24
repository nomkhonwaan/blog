FROM mhart/alpine-node:5

# Install libsass 
RUN apk --update add git build-base libstdc++ && \
    git clone https://github.com/sass/sassc /sassc && \
    git clone https://github.com/sass/libsass /sassc/libsass && \
    cd /sassc && \
    SASS_LIBSASS_PATH=/sassc/libsass make && \
    mv /sassc/bin/sassc /bin/sass && \
	  rm -rf /sassc && \
    apk del git build-base

# Build application
RUN mkdir -p /src/nomkhonwaan.com

WORKDIR /src/nomkhonwaan.com
ADD . .

RUN npm install --all
RUN npm run build

EXPOSE 8080

CMD [ "node", "dist/index.js" ]