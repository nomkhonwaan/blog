import config from 'cloud-env'

export default {
  PORT: process.env.PORT || 8080,
  IP:  '0.0.0.0',
  MONGODB_URI: `mongodb://${process.env.MONGO_PORT_27017_TCP_ADDR}:${process.env.MONGO_PORT_27017_TCP_PORT}/nomkhonwaan_com`,
  REDIS_URL: `redis://${process.env.REDIS_PORT_6379_TCP_ADDR}:${process.env.REDIS_PORT_6379_TCP_PORT}`,
  REDIS_SECRET: process.env.REDIS_SECRET || 'redisSecretString'
}