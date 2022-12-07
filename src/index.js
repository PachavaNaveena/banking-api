const userOperations = require('./User')
const transaction = require('./Transaction')
const {v4} = require("uuid");
const {getUser} = require("./User");
/*
userOperations.addUser({
     firstName: "Chaitanya",
     lastName: "papala",
     accountNumber: v4(),
     balance: 0,
     address: "11700 luna rd",
     city: "Dallas",
     state: "TX"
 }); */

//-----------updateUser
//let user = userOperations.getUser("93c770f3-af01-40e7-b148-238a1f7be005")
//console.log(user)
//user.firstName = "bhavana"
//userOperations.updateUser("93c770f3-af01-40e7-b148-238a1f7be005",user)

 //--------- getUser
//let user = userOperations.getUser("c64a2604-bdbe-4ccd-9d16-37f0e251bc60")
//console.log(user.firstName)


//----------- searchUser
//let user1 = userOperations.searchUser("chaitanya")
//console.log(user1)

//userOperations.getUsers();

//---------deposit
//let deposit = transaction.deposit("9ac37059-1aa6-48ce-81b8-40d9a117fd57st", 500);
//console.log(deposit)

//------transaction
let transfer = transaction.transfer("9ac37059-1aa6-48ce-81b8-40d9a117fd57","93c770f3-af01-40e7-b148-238a1f7be005",100)
console.log(transfer)
