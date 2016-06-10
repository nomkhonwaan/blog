import config from 'cloud-env'

export default {
  PORT: process.env.PORT || config.get('PORT', 8080),
  IP: config.get('IP', '0.0.0.0'),
  MONGODB_URI: process.env.MONGODB_URI || config.get('MONGODB_DB_URL', 'mongodb://127.0.0.1:27017/test')
}