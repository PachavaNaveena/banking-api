const mysql = require('mysql2/promise');
const InternalError = require('../errors/InternalError')
const config = require('../config')
const logger = require('../utils/logger')

let pool = null;
async function CreateConnection() {
    try {
        // return mysql.createConnection({
        //     host: config.DB_HOST_NAME,
        //     user: config.DB_HOST_USERNAME,
        //     database: config.DB_NAME,
        //     password: config.DB_PASSWORD
        // });

        if (!pool) {
            pool = mysql.createPool({
                host: config.DB_HOST_NAME,
                user: config.DB_HOST_USERNAME,
                database: config.DB_NAME,
                password: config.DB_PASSWORD,
                waitForConnections: true,
                connectionLimit: 10,
            });
        }
        return pool
    } catch (e) {
        console.log(e)
        throw new InternalError("Db failed")
    }
}

async function isDBActive() {
    try {
        let connection = await CreateConnection()
        return !!connection;
    } catch (e) {
        console.log(e)
        return false
    }
}


async function performQuery(connection, query) {
    logger.info(query);
    return connection.query(query);
}
module.exports = {
    CreateConnection,
    isDBActive,
    performQuery
}
