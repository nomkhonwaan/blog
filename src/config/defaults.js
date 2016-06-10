import config from 'cloud-env'

export default {
  PORT: config.get('PORT') || process.env.PORT || 8080,
  IP: config.get('IP') || '0.0.0.0',
  MONGODB_URI: config.get('MONGODB_DB_URL') || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/test'
}