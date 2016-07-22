export default {
  // Express.js
  PORT:              process.env.PORT || 8080,
  SESSION_SECRET:    process.env.SECRET || 'sessionSecretString',

  // MongoDB
  MONGODB_URI:       process.env.MONGODB_URI || 'mongodb://mongo/nomkhonwaan_com',

  // Elasticsearch
  // ELASTICSEARCH_URI: process.env.ELASTICSEARCH_URI || 'http://elasticsearch:9200'
}