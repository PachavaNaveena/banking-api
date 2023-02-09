const connectionOps = require('./connection.js')
const userOperations = require('./User')
const {uuid} = require("uuidv4");

async function deposit(id,amount){

    //console.log(user)

    // console.log(user.balance)
    //userOperations.updateUser(id,user)
   // let user = userOperations.getUser(id)
    //user.balance = user.balance + amount
    let connection = await connectionOps.CreateConnection()
    let query1 = "SELECT `balance` FROM `bank`.`users` where (`id`='"+id+"');"
    let  [rows1,fields1] = await connection.execute(query1);
    console.log(rows1)
    console.log(rows1[balance])
    let balance = rows1.balance+amount
    let query2 = "UPDATE `bank`.`users` SET `balance` = '"+balance+"' WHERE (`id` = '"+id+"');"
    let [rows2,fields2] = await connection.execute(query2);
    console.log(rows2)


    // transferData(id,"","DEPOSIT",amount)
    // console.log(user)
    return true
}
async function transfer(){
    let connection = connectionOps.CreateConnection()

}
async function withdraw(){
    let connection = connectionOps.CreateConnection()

}
async function readTransactions(){
    let connection = connectionOps.CreateConnection()

}

async function transferData(fromAccount,toAccount,type,amount){
    let connection = connectionOps.CreateConnection()
    let query = "INSERT INTO `bank`.`tranactions` (`transaction-id`, `type`, `from`, `to`, `amount`, `date`) VALUES ('"+uuid()+"', 'deposit', '"+id+"', '"+id+"', '"+amount+"', '"+new Date().toJSON().slice(0,18)+"');"
    let [rows,fields] = (await connection).execute(query);
}


module.exports = {
    deposit,
    transfer,
    withdraw,
    readTransactions
}