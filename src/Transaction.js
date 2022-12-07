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
function transfer(toAccountNumber, fromAccountNumber, amount) {


}

function withdraw(accountNumber, amount) {

}

function readTransactions(accountNumber) {

}

module.exports = {
    deposit,
    transfer,
    withdraw
}