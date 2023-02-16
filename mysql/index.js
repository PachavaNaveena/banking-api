
//--------------------------------------------POSTMEN-------------------------------------------------------------------
const express = require('express')
const bodyParser = require('body-parser')
const userOperations = require('./user.js')
const transactionOperations = require('./transaction.js')
const {static, response} = require("express");
const userOps = require("../src/User");
const moment = require("moment");

const app = express()

app.use(bodyParser.json({limit: '2mb', type: '*/json'}))

//----------GET USERS
app.get('/mysql/getUser/list',  async function (req,res,next){
   const users = await userOperations.getUsers()
    if(users == null)
        res.send({message:"empty user list"})
    else
        res.send(users)
})

//--------GET USER
app.get('/mysql/getUser/id/:id', async function(req,res,next){
    const id = req.params.id
    const user = await userOperations.getUser(id)
    if(user == null)
        res.status(400).send({message:"user with id : "+id+" dosent exist"})
    else
        res.send(user)
})

//-------UPDATE USER
app.put('/mysql/updateUser/id/:id',async function(req,res,next){
    const id = req.params.id
    const body = req.body
    let user = await userOperations.getUser(id)
    const givenFields = Object.keys(body)
    const requiredFields = ['firstname', 'lastname', 'email', 'address1', 'address2', 'city', 'state', 'zipcode']
    for (let i=0; i< givenFields.length; i++){
        let field = givenFields[i]
        if(requiredFields.indexOf(field) > -1){
            user[field] = body[field]
        }
    }
    let result = await userOperations.updateUser(user)
    if (result === 'same_email') {
       return  res.status(400).json({
            message: `Email: ${user.email} already exist`
        })
    }
    res.send(user)
})

//---------ADD USER
app.post('/mysql/addUser',async function(req,res,next){
    const body = req.body

    const requiredFields = ['firstname', 'lastname', 'email', 'address1', 'address2', 'city', 'state', 'zipcode']
    const givenFields = Object.keys(body)
    const missing = []
    requiredFields.forEach(function (value){
        if(givenFields.indexOf(value) == -1)
            missing.push(value)
    })
    if(missing.length > 0)
        res.status(400).send({message:"missing required fields are "+missing.join(",")})
    const adduser = await userOperations.addUser(body)
        if(adduser == "same_email")
        res.status(400).send({message:"email "+body.email+" alredy in use"})
        else{
            res.status(200).json(adduser)
        }
})

//-----------SEARCH USER
app.get('/mysql/searchUser/name/:name',async function (req,res,next){
    const name = req.params.name
    const users = await userOperations.searchUser(name)
    if(users.length == 0)
        res.status(400).send({message:"user dose`t exist with name:"+name})
    else
        res.json(users)
})

//------------------------------------------------TRANSACTION OPERATIONS------------------------------------------------

//----------DEPOSIT
app.patch('/mysql/deposit/id/:id',async function(req,res,next){
    const id = req.params.id
    const body = req.body
    const amount = body.amount
    let result = await transactionOperations.deposit(id,amount)
    if(result == "no_user")
        res.status(400).send({message:"user dosent exist with id "+id})
    else if(result == "false_amount")
        res.status(400).send({message:"provide amount between 1 to 100000"})
    else
        res.status(200).json({message: `user ID: ${result.id} with current balance ${result.balance}`})
})

//----------TRANSFER
app.patch('/mysql/transfer/fromID/:fromID/toID/:toID',async function(req,res,next){
    const fromID = req.params.fromID
    const toID = req.params.toID
    const body = req.body
    const amount = body.amount
    const transfer = await transactionOperations.transfer(fromID,toID,amount)
    if(transfer == "no_fromUser")
        res.status(400).json({message:`user dosent exist with fromid ${fromID}`})
    else if(transfer=="no_toUser")
        res.status(400).json({message:`user dosent exist with fromid ${toID}`})
    else if(transfer== "false_amount")
        res.status(400).json({message: `Enter valid amount between 1 to 100000`})
    else if(transfer=="inn_bal"){
        let from_user = await userOperations.getUser(fromID)
        res.status(400).json({message: `id :${fromID} has insufficient balance `+from_user.balance})
    }
    else
        res.json(transfer)
})

app.patch('/mysql/withdraw/id/:id',async function(req,res,next){
    const id = req.params.id
    const body = req.body
    const amount = body.amount
    const withdraw = await transactionOperations.withdraw(id,amount)
    if(withdraw == false)
        res.status(400).send({message:"user dosent exist with id "+id+" / Enter valid amount between 1 to 100000/ insufficient balance"})
    else
        res.send(withdraw)
})

app.get('/mysql/readTransactions/id/:id',async function(req,res,next){
    const id = req.params.id
    const readTransactions = await transactionOperations.readTransactions(id)
    if(readTransactions == false)
        res.status(400).send({message:"user dosent exist / No transfers with id "+id})
    else
        res.send(readTransactions)
})
app.listen(6000, function() {
    console.log("App running on http://localhost:6000")
})