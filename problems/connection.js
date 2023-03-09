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
