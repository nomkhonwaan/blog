#!/bin/sh

sleep 10

mongo --host mongo_primary --port 27017 <<EOF
  rs.initiate();
  rs.reconfig({
    "_id": "nomkhonwaan_com", 
    "version": 1, 
    "members": [{
      "_id": 0,
      "host": "mongo_primary:27017", 
      "priority": 1
    }, {
      "_id": 1, 
      "host": "mongo_secondary:27017",
      "priority": 0
    }, {
      "_id": 2,
      "host": "mongo_tertiary:27017",
      "priority": 0
    }]
  }, {
    "force": true
  });
  rs.slaveOk();
EOF