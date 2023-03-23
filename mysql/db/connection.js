const mysql = require('mysql2/promise');
const InternalError = require('../errors/InternalError')
const config = require('../config')

async function CreateConnection() {
    try {
        const connection = await mysql.createConnection({
            host: config.DB_HOST_NAME,
            user: config.DB_HOST_USERNAME,
            database: config.DB_NAME,
            password: config.DB_PASSWORD
        });
        return connection
    } catch (e) {
        throw new InternalError("Db failed")
        console.log(e)
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
module.exports = {
    CreateConnection,
    isDBActive
}

//
// const mysql = require('mysql2');
//
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'test',
//     waitForConnections: true,
//     connectionLimit: 10,
//     maxIdle: 10,
//     idleTimeout: 60000,
//     queueLimit: 0
// });
//
// module.exports = {
//     pool
// }
