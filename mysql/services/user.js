const connectionOps = require('../db/connection.js');
const {v4} = require("uuid");
const {getCurrentDate} = require("../utils/util");
const atob = require("atob");
const InvalidDataError = require("../errors/InvalidDataError");
const DefaultError = require("../errors/DefaultError");
const {performQuery} = require("../db/connection");

async function addUser(user){
    try{
        const id = v4();
        const currentDate = getCurrentDate();
        let connection = await  connectionOps.CreateConnection()
        let query =  "INSERT INTO `bank`.`users` (`id`, `firstname`, `lastname`, `email`, `address1`, `address2`, `city`, `state`, `zipcode`, `balance`,`createddate`,`updateddate`,`password`)" +
            "VALUES ('"+id+"', '"+user.firstname+"', '"+user.lastname+"', '"+user.email+"', '"+user.address1+"','"+user.address2+"', '"+user.city+"', '"+user.state+"', '"+user.zipcode+"', '0','"+currentDate+"','"+currentDate+"','"+user.password+"');"
        let [rows, fields] = await connection.query(query);
        console.log(rows)
        return getUser(id)
    }catch (e) {
        console.error(e.toString())
        throw e
    }
}

async function updateUser(user){
    try{
        console.log(user)
        const currentDate = getCurrentDate();
        let connection = await connectionOps.CreateConnection()
        let query = "UPDATE `bank`.`users` SET `firstname` = '"+user.firstname+"', `lastname` = '"+user.lastname+"', `email` = '"+user.email+"',`password` = '"+user.password+"', `address1` = '"+user.address1+"'," +
            "`address2` = '"+user.address2+"', `city` = '"+user.city+"', `state` = '"+user.state+"', `zipcode` = '"+user.zipcode+"', `balance` = "+user.balance+",`updateddate` = '"+currentDate+"' WHERE (`id` = '"+user.id+"');"
        let [rows, fields] =  await performQuery(connection, query);
        console.log(rows)
        return getUser(user.id)
    }catch (e) {
        console.log(e.toString())
        throw e
    }
}

async function getUser(id){
    try{
        let connection = await connectionOps.CreateConnection()
        // let query = "SELECT firstname, lastname, id, balance, email FROM `bank`.`users` WHERE id ='"+id+"';"
        let query = "SELECT * FROM `bank`.`users` WHERE id ='"+id+"';"
        let[rows, fields] = await connection.query(query);
        return rows[0];
    }catch (e){
        console.error(e.toString())
        throw e
    }
}

async function searchUser(name){
    try{
        let connection = await connectionOps.CreateConnection()
        let query = "select id,firstname,lastname,email,address1,address2,city,state,zipcode from `bank`.`users` where firstname = '"+name+"' || lastname = '"+name+"' order by firstname ASC;"
        let[rows, fields] = await connection.query(query);
        if(!rows[0]){
            throw new DefaultError(`user doset exist with name : ${name}`)   // call the DefaultError function
        }
            console.log(rows)
            return rows
    }catch (e) {
        console.log(e.toString())
        throw e
    }
}

async function getUsers(){
    try{
        let connection = await connectionOps.CreateConnection()
        let query = "SELECT firstname, lastname, id, email FROM `bank`.`users` order by lastname ASC;"
        let[rows, fields] = await connection.query(query);
        if(!rows){
            throw new DefaultError("empty users list")            // call the DefaultError function
        }
        return rows
    }catch (e){
        console.error(e.toString())
        throw e
    }
}
/*
async function getUsers1(callback){
    try{
        let connection = await connectionOps.CreateConnection()
        let query = "SELECT * FROM `bank`.`users` order by lastname ASC;"
        let[rows, fields] = await connection.execute(query);
        if (!rows) {
            return callback(new DefaultError("empty users list"))
        }
        callback(null, rows)
    }catch (e){
        console.error(e.toString())
        throw e
    }
}
*/


async function email_check(email, id = '') {
    try{
        email = email.trim()
        let i = email.includes('@gmail.com', email.length-10)
        if(i == false || email.split(' ').length > 1){
            throw new InvalidDataError(`email:${email} incorrect format`)
        }
        let connection = await connectionOps.CreateConnection()
        let email_query = "SELECT email FROM `bank`.`users` where email = '"+ email +"'"
        let [email_rows] = await connection.query(email_query)
        console.log(email_rows)
        if(email_rows[0]){
            throw new DefaultError("same email-id exists")               //call the DefaultError function
        }
    }catch (e) {
        console.error(e.toString())
        throw e
    }
}

function password_check(password){
    try{
        let j = password.includes(' ')
        if( j == true){
            throw new InvalidDataError("password")          //call the InvalidDataError function
        }
        if(password.length<5 || password.length>20){
            throw new InvalidDataError(`password:${password} should be 6 to 20 characters`)             //call the InvalidDataError function
        }
    }catch (e) {
        console.log(e.toString())
        throw e
    }
}

const login = async (email, password) => {
    try {
        let connection = await connectionOps.CreateConnection()
        let query = `SELECT email, id FROM bank.users where email = TRIM('${email}') and password = '${password}'`
        const [rows,fields] = await connection.query(query);
        if(rows.length === 0){
            const [email_verify,field_values] = await connection.query("SELECT email FROM `bank`.`users` where email = '"+ email +"'")
            console.log(email_verify.length)
            if(email_verify.length === 0){
                throw new InvalidDataError(`email : ${email}`)          //call the InvalidDataError function
            }else {
                throw new InvalidDataError("password")                  //call the InvalidDataError function
            }
        }
        return rows[0]
    }catch (e){
        console.error(e.toString())
        throw e
    }
}

const isTokenValid = async (authorization) => {     // authorization we received as ex: Basic a2F2eWFAZ21haWwuY29tOmthdnlhMTIz contains email,password

    try {
        authorization = authorization.split(" ")    // splits authorization as 2 words ex:Basic , a2F2eWFAZ21haWwuY29tOmthdnlhMTIz as array
        let auth = '';
        if (authorization.length === 2) {
            auth = atob(authorization[1])           // converting the password to normal alphabets using atob ex: a2F2eWFAZ21haWwuY29tOmthdnlhMTIz <---> kavya@gmail.com:kavya123
            auth = auth.split(":")         // splits authorization as 2 words as array ex:[kavya@gmail.com, kavya123]
            return login(auth[0], auth[1])
        }
    } catch (e) {
        console.error(e.toString())
        return false
    }
}

module.exports = {
    addUser: addUser,
    updateUser: updateUser,
    getUser: getUser,
    searchUser: searchUser,
    getUsers: getUsers,
    //getUsers1: getUsers1,
    isTokenValid,
    email_check,
    password_check,
    login
}
