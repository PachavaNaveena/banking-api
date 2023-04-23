// const mysql = require('mysql2');
//
// const connection = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     database:'bank',
//     password:'Naveena9@'
// })

const mysql = require('mysql2/promise');
// create the connection

async function main(){
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'bank', password:'Naveena9@'});
// query database
    const [rows, fields] = await connection.query('SELECT * FROM `users`');
    console.log(rows,fields)

}

main()
