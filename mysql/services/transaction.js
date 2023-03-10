const connectionOps = require('../db/connection.js')
const userOperations = require('./user')
//const {uuid} = require("uuidv4");
const {v4} = require("uuid");
const {getUser} = require("./user");
const InvalidDataError = require("../errors/InvalidDataError")
const DefaultError = require("../errors/DefaultError")
const {getCurrentDate} = require("../utils/util");

async function deposit(id,amount){
   let user = await userOperations.getUser(id)
    if(!user)
        return "no_user"
    if(amount < 1 || amount >100000)
        return "false_amount"

    user.balance = user.balance + amount
    await userOperations.updateUser(user)
    console.log("successfully deposited")

    /* ALTERNATE WAY
    let connection = await connectionOps.CreateConnection()
    let query = "UPDATE `bank`.`users` SET `balance` = '"+user.balance+"',`updateddate` = '"+new Date().toJSON().slice(0,18)+"' WHERE (`id` = '"+id+"');"
    let [rows,fields2] = await connection.execute(query); */

    await transferData(id,id,"DEPOSIT",amount)
    return userOperations.getUser(id)
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
        console.log(e.toString())
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
    let user = await userOperations.getUser(id)
    if(!user)
        return false
    let connection = await connectionOps.CreateConnection()
    let query = "SELECT * FROM `bank`.`tranactions` WHERE `from account`="+id+" || `to account`="+id+";"
    let [rows,fields] = await connection.execute(query);
    return rows
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