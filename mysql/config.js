require('dotenv').config()

module.exports = {
    APP_PORT: process.env.APP_PORT,
    LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
    DB_HOST_NAME: process.env.DB_HOST_NAME,
    DB_HOST_USERNAME: process.env.DB_HOST_USERNAME,
    DB_NAME: process .env.DB_NAME,
    DB_PASSWORD: process.env.DB_PASSWORD
}