const connectionOps = require('../db/connection.js')
const userOperations = require('./user')
const {v4} = require("uuid");
const InvalidDataError = require("../errors/InvalidDataError")
const DefaultError = require("../errors/DefaultError")
const {getCurrentDate} = require("../utils/util");

async function deposit(id,amount){
    try{
        let user = await userOperations.getUser(id)
        if(amount < 1 || amount >100000){
            throw new InvalidDataError(`amount ${amount}`)
        }
        user.balance = user.balance + amount
        const result = await userOperations.updateUser(user)
        await transferData(id,id,"DEPOSIT",amount)
        return result
    }catch (e) {
        console.log("Error: Transfer: " + e.toString())
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
            throw new InvalidDataError(`amount ${amount}`)
        }
        if (user.balance < amount) {
            throw new DefaultError(`insufficient balance ${user.balance}`)
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
        let query = "SELECT * FROM `bank`.`tranactions` WHERE `from account`='"+id+"' || `to account`='"+id+"' ORDER BY date DESC;"
        let [rows,fields] = await connection.execute(query);
        return rows
    }catch (e) {
     console.log("Error:  withdraw: " + e.toString())
        throw e
    }
}

async function transferData(fromAccount,toAccount,type,amount){
    try{
        let connection = await connectionOps.CreateConnection()
        let query = "INSERT INTO `bank`.`tranactions` (`transaction-id`, `type`, `from account`, `to account`, `amount`, `date`) VALUES ('"+v4()+"', '"+type+"', '"+fromAccount+"', '"+toAccount+"', '"+amount+"', '"+getCurrentDate()+"');"
        let[rows,fields] = await connection.execute(query);
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