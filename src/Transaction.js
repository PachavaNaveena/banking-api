const userOperations = require('./User')
const fileOperations = require("./db");
const {v4} = require("uuid");
const fileName = "t"
function deposit(accountNumber, amount) {
    let user = userOperations.getUser(accountNumber)
    if (!user) {
        console.log("User not found")
        return false;
    } else{
        user.balance = user.balance + amount
        userOperations.updateUser(accountNumber, user)
        transferData(accountNumber,"",amount,"deposit")
        console.log("Successfully deposited");
        return true;
    }
}


function transfer(fromAccountNumber, toAccountNumber, amount) {
    let fromUser = userOperations.getUser(fromAccountNumber)
    let toUser = userOperations.getUser(toAccountNumber)

    if(!fromUser){
        console.log("sender dosent exist")
        return false }
    else if(!toUser){
        console.log("recepient dosent exist")
        return false }

    if (fromUser.balance < amount){
        console.log("insufficient balance " + fromUser.balance)
        return false }

    fromUser.balance = fromUser.balance - amount
    toUser.balance = toUser.balance + amount

    let accountNumber = [fromAccountNumber, toAccountNumber]
    let user = [fromUser, toUser]
    for (let i = 0; i < accountNumber.length; i++) {
        userOperations.updateUser(accountNumber[i], user[i])
    }
    transferData(fromAccountNumber,toAccountNumber,amount,"Transfer")
    console.log("amount "+amount+" successfully debted from " + fromUser.firstName + " and credited to " + toUser.firstName)
    return true
}


function withdraw(accountNumber, amount) {
    let user = userOperations.getUser(accountNumber)

    if (!user){
        console.log("invalid account number")
        return false }
    else if(user.balance < amount){
        console.log("insufficient balance")
        return false }
    else if(amount<=0){
        console.log("amount should be greater than 0")
        return false }
    else{
        user.balance = user.balance - amount
        userOperations.updateUser(accountNumber, user)
        transferData(accountNumber, "", amount, "withdraw")
        console.log("Balance Amount :"+ user.balance +" ,withdraw amount :"+ amount)
        return true }
}

function readTransactions(accountNumber) {
    let transactions = fileOperations.readFromFile(fileName)
    return transactions.filter(function(x) {
        return x.fromAccount === accountNumber || x.toAccount === accountNumber
    })
}


//add transaction data to t.json file
function transferData (fromAccount, toAccount, amount, type) {
    let transactions = fileOperations.readFromFile(fileName)
    const transaction = {
        fromAccount,
        toAccount,
        amount,
        type
    }
    if (transactions) {
        transactions.push(transaction)
    } else {
        transactions = [transaction]
    }
    fileOperations.writeToFile(fileName, transactions)
}

module.exports = {
    deposit,
    transfer,
    withdraw,
    readTransactions
}