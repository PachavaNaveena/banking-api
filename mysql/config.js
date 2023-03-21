require('dotenv').config()

module.exports = {
    APP_PORT: process.env.APP_PORT,
    LOG_LEVEL: process.env.LOG_LEVEL || 'debug'
}