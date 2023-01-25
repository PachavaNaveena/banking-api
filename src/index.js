const userOperations = require('./User')
const transaction = require('./Transaction')
const {v4} = require("uuid");
const {getUser} = require("./User");

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

const app = express()

app.use(bodyParser.json({limit: '2mb', type: '*/json'}))

//-----------GET USERS-----------
app.get('/users/getUsers', function(req, res, next){
 const x = userOps.getUsers();
 if(x == null)
  res.send({message: "empty users list"})
 else
  res.send(x) // we can use res.json(users)
})


//-----------GET USER------------
app.get("/users/getUser/accountNumber/:accountNumber", function (req,res,next){
 const accountNumber = req.params.accountNumber
 const users = userOps.getUser(accountNumber)
 if(users==null)
  res.status(400).send({message: "User with account number "+ accountNumber + " dosent exist"})
 else
  res.send(users)
})


//-----------ADD USERS------------
app.post('/users/addUser',function (req,res,next){
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


//---------UPDATE USERS----------
app.put("/users/updateUser/accountNumber/:accountNumber",function (req,res,next){
 const accountNumber = req.params.accountNumber
 const body = req.body
 const user = userOps.updateUser(accountNumber,body)
 res.send(user)
})


//------- SEARCH USER-------------
app.get('/users/searchUser/name/:name',function (req,res,next){
 const name = req.params.name
 const users = userOps.searchUser(name)
 if(users.length==0)
  res.send({message:"no user found with name "+name })
 else
  res.json(users)
 //res.send({message: "number of users with name "+name+" are "+users.length})
})


//----------------------------------------------------------------------------------------------------------------------

//----DEPOSIT--------------------//account number dosent exist
app.patch('/transactions/deposit/accountNumber/:accountNumber',function (req,res,next) {
 const accountNumber = req.params.accountNumber
 const amount = req.query.amount * 1 // convert string to integer -- *1 or /1 or -1 --
 // if (amount == 0)
 //  res.status(400).send({message: "provide amount"})
 const deposit = transactionOps.deposit(accountNumber, amount)
 if (deposit == false)
  res.status(400).send({message: "Account Number " + accountNumber + " dosent exist"})
 else
  res.send(deposit)
})


//-----TRANSFER------------------
app.patch('/transactions/transfer/fromAccount/toAccount/:fromAccount/:toAccount',function (req,res,next){
 const fromAccount = req.params.fromAccount
 const toAccount = req.params.toAccount
 const amount = req.query.amount * 1 //convert to integer
 const transfers = transactionOps.transfer(fromAccount,toAccount,amount)
 if(transfers==true)
 res.send(transfers)
 else if(transfers == false)
  res.status(400).send({message: "invalied account numbers / insufficient amount"})
    }
)

//------WITHDRAW-----------------
app.patch('/transactions/withdraw/accountNumber/:accountNumber',function (req,res,next){
 const accountNumber = req.params.accountNumber
 const amount = req.query.amount * 1 // converting string to number
 const withdraw = transactionOps.withdraw(accountNumber,amount)
 if(withdraw==true)
 res.send(withdraw)
 else
  res.status(400).send({ message :"invalied account number(or)amount/ insufficient amount"})
})


//--- READ TRANSACTIONS --------
app.get('/transactions/allTransactions/accountNumber/:accountNumber',function (req,res,next){
 const accountNumber = req.params.accountNumber
 const transactionList =transactionOps.readTransactions(accountNumber)
 if(transactionList.length===0)
  res.send({message: "no transactions registred with account number :"+accountNumber})
 else
  res.send(transactionList)
})


app.listen(6000, function() {
 console.log("App running on http://localhost:6000")
})



