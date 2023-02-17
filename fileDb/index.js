// const userOperations = require('./User')
// const transaction = require('./Transaction')
// const {v4} = require("uuid");
// const {getUser} = require("./User");

//--------------- USER OPERATIONS -----------------------------------------------------

//----------ADD USER------
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

//---------------------------------------------------POSTMAN------------------------------------------------------------

const express = require('express')
const bodyParser = require('body-parser')
const userOps = require('./User')
const transactionOps = require('./Transaction')
const {static, response} = require("express");
const {deposit, withdraw} = require("./Transaction");

//const {deposit, withdraw} = require("./Transaction");
//const {updateUser} = require("./User");
 

const app = express()

app.use(bodyParser.json({limit: '2mb', type: '*/json'}))

//-----------GET USERS-----------
app.get('/users', function(req, res, next){
 const x = userOps.getUsers();
 if(x == null)
  res.send({message: "empty users list"})
 else
  res.send(x) // we can use res.json(users)
})


//-----------GET USER------------
app.get("/users/accountNumber/:accountNumber", function (req,res,next){
 const accountNumber = req.params.accountNumber
 const users = userOps.getUser(accountNumber)
 if(users==null)
  res.status(400).send({message: "User with account number "+ accountNumber + " dosent exist"})
 else
  res.send(users)
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
 } else {
  userOps.addUser(body)
  res.send(body)
     // if(false)
     //  res.status(400).send({message : "user alredy exist with same accountNUmber"})
     // else
     //  res.send(body)
 }
})


//---------UPDATE USERS----------//
app.put("/users/accountNumber/:accountNumber",function (req,res,next){
 const accountNumber = req.params.accountNumber
 const body = req.body
 let user = userOps.getUser(accountNumber)
 const givenFields = Object.keys(body)
 const requiredFields = ["firstName","lastName","address","city","state"]

 for (let i=0; i<givenFields.length; i++) {
  const field = givenFields[i]
  if (requiredFields.indexOf(field) > -1) {
   user[field] = body[field]
  }
 }
 user = userOps.updateUser(accountNumber,user)
 res.send(user)
})


//------- SEARCH USER-------------
app.get('/users/name/:name',function (req,res,next){
 const name = req.params.name
 const users = userOps.searchUser(name)
 if(users.length==0)
  res.send({message:"no user found with name "+name})
 else
  res.json({users, message: "number of users with name "+name+" are "+users.length })
 //res.send({message: "number of users with name "+name+" are "+users.length})
})


//----------------------------------------------------------------------------------------------------------------------

//----DEPOSIT/WITHDRAW--------------------//account number dosent exist
app.patch('/transactions/accountNumber/:accountNumber/type/:type',function (req,res,next) {
 const accountNumber = req.params.accountNumber
 const type = req.params.type
 const body = req.body
 const amount = body.amount
 let result

 if(type === "deposit"){
  result = transactionOps.deposit(accountNumber, amount)
 } else if (type === "withdraw"){
  result = transactionOps.withdraw(accountNumber, amount)
 } else{
  return res.status(400).send({message: "wrong request type entered"})
 }

 let user = userOps.getUser(accountNumber)
 if(result === false) {
  res.status(400).send({message: "Account Number " + accountNumber + " dosent exist/insufficient balance " + user.balance + " /provide amount"})
 } else {
  res.send({message: `Balance Amount :${user.balance} ,${type} amount :${amount}`})
 }
})


//-----TRANSFER------------------
app.patch('/transactions/fromAccount/toAccount/:fromAccount/:toAccount',function (req,res,next){
 const fromAccount = req.params.fromAccount
 const toAccount = req.params.toAccount
 const body = req.body
 const amount = body.amount

 if (amount === 0)
  res.status(400).send({message: "provide amount"})

 const transfers = transactionOps.transfer(fromAccount,toAccount,amount)

 if(transfers==false)
  res.status(400).send({message: "invalied account numbers / insufficient amount"})
 else
 res.send(transfers)
})

//------JUST WITHDRAW-----------------
app.patch('/transactions/accountNumber/:accountNumber',function (req,res,next){
 const accountNumber = req.params.accountNumber
 const body = req.body
 const amount = body.amount

 if (amount == 0)
  res.status(400).send({message: "provide amount"})

 const withdraw = transactionOps.withdraw(accountNumber,amount)

 if(withdraw==false)
  res.status(400).send({ message :"invalied account number(or)amount/ insufficient amount"})
 else
 res.send(withdraw)
})


//--- READ TRANSACTIONS --------
app.get('/transactions/accountNumber/:accountNumber',function (req,res,next){
 const accountNumber = req.params.accountNumber
 const transactionList =transactionOps.readTransactions(accountNumber)
 if(transactionList.length===0)
  res.send({message: "no transactions registred with account number :"+accountNumber})
 else
  res.send(transactionList)
});


app.listen(6001, function() {
 console.log("App running on http://localhost:6001")
})



