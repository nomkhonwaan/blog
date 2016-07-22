#!/bin/sh

sleep 10

mongo --host mongo-primary --port 27017 <<EOF
  rs.initiate();
  rs.reconfig({
    "_id": "nomkhonwaan_com", 
    "version": 1, 
    "members": [{
      "_id": 0,
      "host": "mongo-primary:27017", 
      "priority": 1
    }, {
      "_id": 1, 
      "host": "mongo-secondary:27017",
      "priority": 0
    }]
  }, {
    "force": true
  });
  rs.slaveOk();
EOF