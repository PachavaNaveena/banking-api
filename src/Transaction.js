const userOperations = require('./User')
const fileName = "transactions"
function deposit(accountNumber, amount) {
    let user = userOperations.getUser(accountNumber)
    if (!user) {
        console.log("User not found")
        return false;
    }
    user.balance = user.balance + amount
    if (userOperations.updateUser(accountNumber, user)) {
        console.log("Successfully deposited");
        return true;
    } else {
        console.log("Failed deposited");
        return false;
    }
}


function transfer(fromAccountNumber, toAccountNumber, amount) {
    let fromUser = userOperations.getUser(fromAccountNumber)
    let toUser = userOperations.getUser(toAccountNumber)

    if(!fromUser){
        console.log("invalied account no")
        return false }
    else if(!toUser){
        console.log("recepient dosent exist")
        return false }

    if(fromUser.balance < amount){
        console.log("insufficient balance " + fromUser.balance)
        return false
    }

    fromUser.balance = fromUser.balance - amount
    toUser.balance = toUser.balance + amount

    let accountNumber = [fromAccountNumber, toAccountNumber]
    let user = [fromUser, toUser]
    for (let i = 0; i < accountNumber.length; i++) {
        userOperations.updateUser(accountNumber[i], user[i])
    }
    console.log("amount "+amount+" successfully debted from " + fromUser.firstName + " and credited to " + toUser.firstName)
    return true
}


function withdraw(accountNumber, amount) {
    let user = userOperations.getUser(accountNumber)

    if (!user)
        console.log("invalid account number")
        else if(user.balance < amount)
            console.log("insufficient balance")
    else {
        user.balance = user.balance - amount
        userOperations.updateUser(accountNumber,user)
        console.log("Balance Amount :"+ user.balance +" ,withdraw amount :"+ amount)
    }
}


function readTransactions(accountNumber) {

// read transactions of a particular account number
}

module.exports = {
    deposit,
    transfer,
    withdraw
}