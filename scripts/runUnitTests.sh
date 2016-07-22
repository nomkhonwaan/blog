#!/bin/sh 

cd ./tests/mocha && \
../../node_modules/.bin/mocha \
  --opts mocha.opts \
  $(find . -path './**/*.test.js')