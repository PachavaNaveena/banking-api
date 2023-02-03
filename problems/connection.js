const mysql = require('mysql2/promise');


async function  CreateConnection() {
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'bank',
        password: 'Naveena9@'
    });
     return connection
}
module.exports = {
    CreateConnection
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
