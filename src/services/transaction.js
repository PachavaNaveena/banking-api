const connectionOps = require('../db/connection.js')
const userOperations = require('./user')
const {v4} = require("uuid");
const InvalidDataError = require("../errors/InvalidDataError")
const DefaultError = require("../errors/DefaultError")
const {getCurrentDate} = require("../utils/util");
const {loggers} = require("winston");
const {performQuery} = require("../db/connection");

async function deposit(id,amount){
    try{
        let user = await userOperations.getUser(id)
        if(amount < 1 || amount >100000){
            throw new InvalidDataError(`amount ${amount} , transaction limit is 1000000`)
        }
        user.balance = user.balance + amount
        const result = await userOperations.updateUser(user)
        await transferData(id,id,"DEPOSIT",amount)
        return result
    }catch (e) {
        console.log("Error: Deposit: " + e.toString())
        throw e
    }
}

async function transfer(fromID,toID,amount){
    try{
        let fromUser = await userOperations.getUser(fromID)
        let toUser = await  userOperations.getUser(toID)
        if(!toUser)
            throw new InvalidDataError(`To account ID dosent exist ${toID}`)
        if(amount < 1 || amount >100000)
            throw new InvalidDataError(`amount ${amount}`)
        if (fromUser.balance < amount){
            throw new DefaultError(`insufficient balance ${fromUser.balance}`)
        }
        fromUser.balance = fromUser.balance - amount
        toUser.balance = toUser.balance + amount
        let user = [fromUser,toUser]
        let id = [fromID,toID]
        let array = []
        for(let i=0;i<user.length;i++) {
            await userOperations.updateUser(user[i])
            array.push(await userOperations.getUser(id[i]))
        }
        await transferData(fromID,toID,"TRANSFER",amount)
        return array
    }catch (e) {
        console.log("Error: Transfer: " + e.toString())
        throw e
    }
}

async function withdraw(id,amount){
    try {
        let user = await userOperations.getUser(id)
        if (amount < 1 || amount > 100000) {
            throw new InvalidDataError(`amount ${amount}`)                       //calls InvalidDataError function
        }
        if (user.balance < amount) {
            throw new DefaultError(`insufficient balance ${user.balance}`)       //calls DefaultError function
        }
        user.balance = user.balance - amount
        const result = await userOperations.updateUser(user)
        await transferData(id, id, "WITHDRAW", amount)
        return result
    } catch (e) {
        console.error("Error:  withdraw: " + e.toString());
        throw e
    }
}

async function readTransactions(id){
    try{
        let connection = await connectionOps.CreateConnection()
        let query = ` SELECT 
                         CONCAT(fromUsers.firstname, ' ', fromUsers.lastname) as sender,
                         CONCAT(toUsers.firstname, ' ', toUsers.lastname) as receiver,
                         transaction.date,
                         transaction.amount,
                         transaction.type,
                         from_account,
                         to_account,
                         transaction_id
                         FROM \`bank\`.\`tranactions\` as transaction
                         left join \`users\` as fromUsers on fromUsers.id = from_account
                         left join \`users\` as toUsers on toUsers.id = to_account
                         WHERE \`from_account\`='${id}' || \`to_account\`='${id}' 
                         ORDER BY date DESC;
`
        let [rows,fields] = await performQuery(connection, query);
        return rows
    }catch (e) {
     console.log("Error:  withdraw: " + e.toString())
        throw e
    }
}

async function transferData(fromAccount,toAccount,type,amount){
    try{
        let connection = await connectionOps.CreateConnection()
        let query = "INSERT INTO `bank`.`tranactions` (`transaction_id`, `type`, `from_account`, `to_account`, `amount`, `date`) VALUES ('"+v4()+"', '"+type+"', '"+fromAccount+"', '"+toAccount+"', '"+amount+"', '"+getCurrentDate()+"');"
        let[rows,fields] = await performQuery(connection, query);
    }catch (e) {
        console.log(e.toString())
        return false
    }
}

module.exports = {
    deposit,
    transfer,
    withdraw,
    readTransactions
}