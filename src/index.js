// const userOperations = require('./User')
// const transaction = require('./Transaction')
// const {v4} = require("uuid");
// const {getUser} = require("./User");

//--------------- USER OPERATIONS -----------------------------------------------------

// ----------ADD USER------
// userOperations.addUser({
//  firstName: "abhi",
//  lastName: "verapaneni",
// accountNumber: v4(),
//  balance: 0,
//  address: "KMS",
//  city: "ongole",
//  state: "AP"
// });

//---------UPDATE USER---------
// let user = userOperations.getUser("19b2393a-cb4d-4a93-8bf7-11be36ed2a5e")
// console.log(user)
// user.firstName="sathhvik"
// userOperations.updateUser( "19b2393a-cb4d-4a93-8bf7-11be36ed2a5e",user)
// console.log(user)

//--------- GET USER----------
// let user = userOperations.getUser("c64a2604-bdbe-4ccd-9d16-37f0e251bc60")
// console.log(user.firstName)

//---------- GET USERS----------
// let user = userOperations.getUsers()
// console.log(user)

//----------SEARCH USER----------
// let user = userOperations.searchUser("Chaitanya")
// console.log(user)

//------------------------ TRANSACTION OPERATIONS -------------------------------------------------


//---------DEPOSIT -----------
//let deposit = transaction.deposit("19b2393a-cb4d-4a93-8bf7-11be36ed2a5d", 250)

//--------- TRANSFER ---------
//let transfer = transaction.transfer("19b2393a-cb4d-4a93-8bf7-11be36ed2a5d","19b2393a-cb4d-4a93-8bf7-11be36ed2a5c",500)

//--------- WITHDRAW ---------
//let withdraw = transaction.withdraw("19b2393a-cb4d-4a93-8bf7-11be36ed2a5c",500)

//--------- READ TRANSACTIONS
// let readTransactions = transaction.readTransactions("19b2393a-cb4d-4a93-8bf7-11be36ed2a5d")
// console.log(readTransactions)

//----------------------------------------------------------------------------------------------------------------------
//----POSTMAN---
const express = require('express')
const bodyParser = require('body-parser')
const userOps = require('./User')
const transactionOps = require('./Transaction')

const app = express()

app.use(bodyParser.json({limit: '2mb', type: '*/json'}))

//-----------GET USERS-----------
app.get('/users', function(req, res, next){
 const users = userOps.getUsers();
 res.send(users) // we can use res.json(users)
})

//-----------ADD USERS------------
app.post('/users',function (req,res,next){
 const body = req.body
 const requiredFields = ["firstName","lastName","accountNumber","balance","address","city","state"]
 const givenFields = Object.keys(body)

 const missing = []

 requiredFields.forEach(function (value){
  if(givenFields.indexOf(value) == -1){   // if one of the fields dosent exist (true)
   missing.push(value)
  }})

 if(missing.length>0){
  res.status(400).send({message : "missing required fields are : " + missing.join(",")})
 }
 // else if (userOps.getUser(givenFields.values(accountNumber)) == true){
 //  res.status(400).send({message : "user alredy exist with same accountNumber :" + accountNumber})
 // }
 else {
  const user = userOps.addUser(body)
  res.send(body)
 }
})


//--------GET USER-------------
app.get("/users/accountNumber/:accountNumber", function (req,res,next){
 const accountNumber = req.params.accountNumber
 const user = userOps.getUser(accountNumber)
 res.send(user)
})


//---------UPDATE USERS----------
app.put("/users/accountNumber/:accountNumber",function (req,res,next){
 const accountNumber = req.params.accountNumber
 const body = req.body
 const user = userOps.updateUser(accountNumber,body)
 res.send(user)
})


//--- READ TRANSACTIONS -------- was not executed
// app.get('/transactions',function (req,res,next){
//  const transactions = transactionOps.readTransactions();
//  res.send(transactions)
// })

//-----------------search users
// app.get('/users/name/:name', function(req, res, next){
//  const name = req.params.name
//  const size = req.query.size
//  const users = userOps.searchUser(name)
//  res.json(users)
// })

//----------------------add users
// app.post('/users', function(req, res, next) {
//  const body = req.body
//  const requiredFields = ["firstName", "lastName","accountNumber","balance","address","city","state"]
//  const fields = Object.keys(body)
//
//  const missing = []
//  requiredFields.forEach((value) =>{
//   if (fields.indexOf(value) === -1) {
//    missing.push(value)
//   }
//  })
//
//  if (missing.length > 0) {
//   res.status(400).json(
//       {
//       message: "Missing required field " + missing.join(", "),
//
//       }
//   )
//  } else {
//   userOps.addUser(body)
//   res.json(body)
//  }
// })
//
app.listen(6000, function() {
 console.log("App running on http://localhost:6000")
})



