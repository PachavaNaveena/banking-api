
const connectionOps = require('./connection.js')
const utlOps = require('./util')
const moment = require("moment/moment");
const {v4} = require("uuid");
const util = require("util");
const {getCurrentDate} = require("./util");

async function addUser(user){
    const email = await email_check(user.email)
    const currentDate = getCurrentDate();
    if(email) {
        return "same_email"
    }
    let id = v4()
    let connection = await  connectionOps.CreateConnection()
    let query =  "INSERT INTO `bank`.`users` (`id`, `firstname`, `lastname`, `email`, `address1`, `address2`, `city`, `state`, `zipcode`, `balance`,`createddate`,`updateddate`)" +
        "VALUES ('"+id+"', '"+user.firstname+"', '"+user.lastname+"', '"+user.email+"', '"+user.address1+"','"+user.address2+"', '"+user.city+"', '"+user.state+"', '"+user.zipcode+"', '0','"+currentDate+"','"+currentDate+"');"
    let [rows, fields] = await connection.execute(query);
    console.log(rows)
    return getUser(id)
}

async function updateUser(user){
    if(user.email){
        const email = await email_check(user.email, user.id)
        console.log(email)
        if(email) {
            return "same_email"
        }
    }
    const currentDate = getCurrentDate();
    let connection = await  connectionOps.CreateConnection()
    let query = "UPDATE `bank`.`users` SET `firstname` = '"+user.firstname+"', `lastname` = '"+user.lastname+"', `email` = '"+user.email+"', `address1` = '"+user.address1+"'," +
        "`address2` = '"+user.address2+"', `city` = '"+user.city+"', `state` = '"+user.state+"', `zipcode` = '"+user.zipcode+"', `balance` = '"+user.balance+"',`updateddate` = '"+currentDate+"' WHERE (`id` = '"+user.id+"');"
    let [rows, fields] =  await connection.execute(query);
    console.log(rows)
    return getUser(user.id)
}

async function getUser(id){
let connection = await connectionOps.CreateConnection()
    let query = "SELECT * FROM `bank`.`users` WHERE id ='"+id+"';"
    let[rows, fields] = await connection.execute(query);
    return rows[0];
}



async function searchUser(name){
    let connection = await connectionOps.CreateConnection()
    let query = "select * from `bank`.`users` where firstname = '"+name+"' || lastname = '"+name+"';"
    let[rows, fields] = await connection.execute(query);
    console.log(rows)
    return rows
}

async function getUsers(){
    let connection = await connectionOps.CreateConnection()
    let query = "SELECT * FROM `bank`.`users`;"
    let[rows, fields] = await connection.execute(query);
    console.log(rows)
    return rows
}

async function email_check(email, id = '') {
    let connection = await connectionOps.CreateConnection()
    let email_query = "SELECT email, id FROM `bank`.`users` where email = '"+ email +"'"
    let [email_rows] = await connection.execute(email_query)
    console.log(email_rows)
    for (let i=0; i<email_rows.length; i++) {
        if (email_rows[i].id !== id) {
            return true;
        }
    }
    return false;
}

module.exports = {
    addUser: addUser,
    updateUser: updateUser,
    getUser: getUser,
    searchUser: searchUser,
    getUsers: getUsers
}
