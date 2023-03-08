const connectionOps = require('../db/connection.js');
const {v4} = require("uuid");
const {getCurrentDate} = require("../utils/util");
const atob = require("atob");
const InvalidDataError = require("../errors/InvalidDataError");
const DefaultError = require("../errors/DefaultError");
const MissingDataError = require("../errors/MissingDataError");

async function addUser(user){
    try{
        const requiredFields = ['firstname', 'lastname', 'email', 'address1', 'address2', 'city', 'state', 'zipcode','password']
        const givenFields = Object.keys(user)
        const missing = []
        requiredFields.forEach(function (value){
            if(givenFields.indexOf(value) == -1)
                missing.push(value)
        })
        if(missing.length > 0){
            throw new MissingDataError(missing.join(','))
        }

        // const email = await email_check(user.email)
        // if(email) {
        //     //return "same_email"
        //     throw new DefaultError("same email-id exists")
        // }

        await email_check(user.email)
        const id = v4();
        const currentDate = getCurrentDate();
        let connection = await  connectionOps.CreateConnection()
        let query =  "INSERT INTO `bank`.`users` (`id`, `firstname`, `lastname`, `email`, `address1`, `address2`, `city`, `state`, `zipcode`, `balance`,`createddate`,`updateddate`,`password`)" +
            "VALUES ('"+id+"', '"+user.firstname+"', '"+user.lastname+"', '"+user.email+"', '"+user.address1+"','"+user.address2+"', '"+user.city+"', '"+user.state+"', '"+user.zipcode+"', '0','"+currentDate+"','"+currentDate+"','"+user.password+"');"
        let [rows, fields] = await connection.execute(query);
        console.log(rows)
        return getUser(id)
    }catch (e) {
        console.error(e.toString())
        throw e
    }
}

async function updateUser(user){
    // if(user.email){
    //     const email = await email_check(user.email, user.id)
    //     console.log(email)
    //     if(email) {
    //         return "same_email"
    //     }
    // }
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
    try{
        let connection = await connectionOps.CreateConnection()
        let query = "SELECT * FROM `bank`.`users`;"
        let[rows, fields] = await connection.execute(query);
        if(!rows){
            throw new DefaultError("empty users list")
        }
        return rows
    }catch (e){
        console.error(e.toString())
        throw e
    }
}

async function email_check(email, id = '') {
    try{
        let connection = await connectionOps.CreateConnection()
        let email_query = "SELECT email, id FROM `bank`.`users` where email = '"+ email +"'"
        let [email_rows] = await connection.execute(email_query)
        console.log(email_rows)
        if(email_rows[0]){
            throw new DefaultError("same email-id exists")
        }
        // for (let i=0; i<email_rows.length; i++) {
        //     if (email_rows[i].id !== id) {
        //         return true;
        //     }
        // }
    }catch (e) {
        console.error(e.toString())
        throw e
    }
}

const login = async (email, password) => {
    try {
        let connection = await connectionOps.CreateConnection()
        email = email.trim()
        let query = `SELECT email, id FROM bank.users where TRIM(email) = '${email}' and password = '${password}'`
        const [data] = await connection.query(query);
        //if (data.length) {
         //   return data[0]
       // }
       // return false
        return data[0]
    }catch (e){
        console.error(e)
        return false
    }
}

const isTokenValid = async (authorization) => {
    try {
        authorization = authorization.split(" ")
        let auth = '';
        if (authorization.length === 2) {
            auth = atob(authorization[1])
            auth = auth.split(":")
            return login(auth[0], auth[1])
        }
       // return false
    } catch (e) {
        console.error(e)
        return false
    }
}

module.exports = {
    addUser: addUser,
    updateUser: updateUser,
    getUser: getUser,
    searchUser: searchUser,
    getUsers: getUsers,
    isTokenValid
}
