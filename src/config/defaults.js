import config from 'cloud-env'

export default {
  PORT: process.env.PORT || 8080,
  IP:  '0.0.0.0',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/test',
  REDIS_URL: process.env.REDIS_URL || 'edis://localhost:6379',
  REDIS_SECRET: process.env.REDIS_SECRET || 'redisSecretString'
}