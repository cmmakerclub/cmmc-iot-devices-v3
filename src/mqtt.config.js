export default {
  host: 'mqtt.cmmc.io',
  port: 9001,
  clientId: 'CMMC_' + Math.random().toString(16).substr(2, 8),
  username: '',
  password: '',
  topic: 'CMMC/#'
}