export default {
  port: process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
  ip: process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'
}