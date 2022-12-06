const userOperations = require('./User')
const transaction = require('./Transaction')
const {v4} = require("uuid");
//
// userOperations.addUser({
//     firstName: "Naveena",
//     lastName: "P",
//     accountNumber: v4(),
//     balance: 0,
//     address: "11700 Luna Rd",
//     city: "Dallas",
//     state: "TX"
// });

// let user = userOperations.getUser("5e2e6d22-1c65-4eb3-a2d0-a876d6a8f446")
let deposit = transaction.deposit("5e2e6d22-1c65-4eb3-a2d0-a876d6a8f446", 500);
console.log(deposit)

