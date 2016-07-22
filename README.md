# Blog

[![Build Status](https://travis-ci.org/nomkhonwaan/blog.svg?branch=dev)](https://travis-ci.org/nomkhonwaan/blog)

Welcome to my project, this project is for create my personal blog website. 
I'm using Node.js entire application, the back-end and API server is Express.js 
and the front-end and renderer library is React + Redux. 

This project is written with Isomorphism concept, this concept is both of server side
and client side are using the same code just write only once. 

## Table of Contents

  - [Installation](#installation)
  - [Tests](#tests)

## Installation 

To install this project you should have Node.js and MongoDB running inside your machine.

### Manual

Run the following these commands for install all package dependencies and build scripts.

```
$ git clone https://github.com/nomkhonwaan/blog.git 
```

```
$ cd blog 
$ npm install --all
$ npm run build
```

After run the above command you will see 2 folders are created, `dist` is folder for holding
the compiled Node.js ES6/7 to ES5 and `public` is folder for holding the compiled assets from Webpack.

For running the application you should define the `MONGODB_URI` by using this command 

```
$ MONGODB_URI=mongodb://localhost/tests \
  npm start
```

But if you think this way is hard I already prepared the easy way for you.

### Docker 

To running this application very quickly (upon your internet connection), 
just using Docker. First you need to install Docker machine on your computer.

Just run this command, then the Docker will read my `docker-compose.yml` file and 
setting up all containers inside that config.

```
$ docker-compose up 
```

And use this command to destroy unused containers.

```
$ docker-compose down 
```

More information about Docker and Docker compose see at https://docs.docker.com 

## Tests 

To running the test suites I already created the UNIX script for running the Mocha suite 
(and Nightwatch in nearly future) so you need to make sure the `runUnitTests.sh` is 
allowed to execute, if not need to `chmod` that file first.

```
$ chmod a+x ./scripts/runUnitTests.sh 
```

Then using this command to run all test suites.

```
$ npm test
``` 