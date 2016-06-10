import config from 'cloud-env'

export default {
  port: config.get('PORT') || process.env.PORT || 8080,
  ip: config.get('IP') || '0.0.0.0',
  mongo: {
    url: config.get('MONGODB_DB_URL') || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/test'
  }
}