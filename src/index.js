const userOperations = require('./User')
const transaction = require('./Transaction')
const {v4} = require("uuid");
const {getUser} = require("./User");

 // userOperations.addUser({
 //     firstName: "Gowtham",
 //     lastName: "pachava",
 //     accountNumber: v4(),
 //     balance: 0,
 //     address: "housing board colony",
 //     city: "ongole",
 //     state: "AP"
 // });

//-----------updateUser
//let user = userOperations.getUser("93c770f3-af01-40e7-b148-238a1f7be005")
//console.log(user)
//user.firstName = "bhavana"
//userOperations.updateUser("93c770f3-af01-40e7-b148-238a1f7be005",user)

 //--------- getUser
// let user = userOperations.getUser("93c770f3-af01-40e7-b148-238a1f7be005")
// console.log(user.firstName)


//----------- searchUser
//let user1 = userOperations.searchUser("chaitanya")
//console.log(user1)

//userOperations.getUsers();

//---------deposit
// let deposit = transaction.deposit("93c770f3-af01-40e7-b148-238a1f7be005", 500);
// console.log(deposit)

//------transaction
// let transfer = transaction.transfer("9ac37059-1aa6-48ce-81b8-40d9a117fd57","93c770f3-af01-40e7-b148-238a1f7be005",50)
// console.log(transfer)

//______withdraw
//  let withdraw = transaction.withdraw("93c770f3-af01-40e7-b148-238a1f7be005", 10)
 let transactions = transaction.readTransactions("987a223f-c492-435f-83c5-47e1d23cd023")
console.log(transactions);