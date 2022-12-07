const userOperations = require('./User')
const transaction = require('./Transaction')
const {v4} = require("uuid");
const {getUser} = require("./User");
/*
userOperations.addUser({
     firstName: "Chaitanya",
     lastName: "Mannam",
     accountNumber: v4(),
     balance: 0,
     address: "11700 luna rd",
     city: "Dallas",
     state: "TX"
 }); */

/*----------- getUser
let user = userOperations.getUser("c64a2604-bdbe-4ccd-9d16-37f0e251bc60")
console.log(user.firstName)
*/

/*----------- searchUser
let user1 = userOperations.searchUser("vanteddu")
console.log(user1)
*/

//---------deposit
let deposit = transaction.deposit("9ac37059-1aa6-48ce-81b8-40d9a117fd57st", 500);
console.log(deposit)

//userOperations.getUsers();

