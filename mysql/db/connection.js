const mysql = require('mysql2/promise');
const InternalError = require('../errors/InternalError')


async function  CreateConnection() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'bank',
            password: 'Naveena9@'
        });
        return connection
    } catch (e) {
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
