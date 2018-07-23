const mongoose = require('mongoose')
const config = require('../../config/config.default')

const options = {
  autoIndex: false,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  poolSize: 10,
  bufferMaxEntries: 0,
  keepAlive: true
};

function connectDB() {
  return mongoose.connect(config.YLC_DB_URL, options)
}

function disconnnectDB() {
  return mongoose.disconnect()
}

module.exports = {
  connectDB,
  disconnnectDB
}

