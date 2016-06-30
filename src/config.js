export default {
  // Express.js
  PORT:         process.env.PORT || 8080,
  
  // Redis
  REDIS_URL:    process.env.REDIS_URL || 'redis://redis:6379',
  REDIS_SECRET: process.env.REDIS_SECRET || 'redisSecretString',

  // MongoDB
  MONGODB_URI:  process.env.MONGODB_URI || 'mongodb://mongo:27017/nomkhonwaan_com'
}