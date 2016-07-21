export default {
  // Express.js
  PORT:              process.env.PORT || 8080,
  SESSION_SECRET:    process.env.SECRET || 'sessionSecretString',

  // MongoDB
  MONGODB_URI:       process.env.MONGODB_URI || 'mongodb://mongo-primary:27017/nomkhonwaan_com,mongo-secondary:27017,mongo-tertiary:27017',

  // Elasticsearch
  // ELASTICSEARCH_URI: process.env.ELASTICSEARCH_URI || 'http://elasticsearch:9200'
}