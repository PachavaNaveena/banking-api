
//--------------------------------------------POSTMEN-------------------------------------------------------------------
const express = require('express')
const bodyParser = require('body-parser')
const userOperations = require('./user.js')
const transactionOperations = require('./transaction.js')
const {static, response} = require("express");
const userOps = require("../src/User");

const app = express()

app.use(bodyParser.json({limit: '2mb', type: '*/json'}))

//----------GET USERS
app.get('/mysql/getUsers',  async function (req,res,next){
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
    user.updateddate = new Date().toJSON().slice(0,18)
    const givenFields = Object.keys(body)
    const requiredFields = ['firstname', 'lastname', 'email', 'address1', 'address2', 'city', 'state', 'zipcode']

    for (let i=0; i< givenFields.length; i++){
        let field = givenFields[i]
        if(requiredFields.indexOf(field) > -1){
            user[field] = body[field]
        }
    }
    user =  userOperations.updateUser(id,user)
res.send(user)
})

//---------ADD USER
app.post('/mysql/addUser',async function(req,res,next){
    const body = req.body
    const requiredFields = ['id','firstname', 'lastname', 'email', 'address1', 'address2', 'city', 'state', 'zipcode','balance','createddate','updateddate']
    const givenFields = Object.keys(body)
    const missing = []
    requiredFields.forEach(function (value){
        if(givenFields.indexOf(value) == -1)
            missing.push(value)
    })
    if(missing.length > 0)
        res.status(400).send({message:"missing required fields are "+missing.join(",")})
    else{
        userOperations.addUser(body)
        res.send(body)
    }
})

//-----------SEARCH USER
app.get('/mysql/searchUser/name/:name',async function (req,res,next){
    const name = req.params.name
    const users = await userOperations.searchUser(name)
    if(users.length == 0)
        res.status(400).send({message:"user dose`t exist with name "+name})
    else
        res.json(users)
})

//------------------------------------------------TRANSACTION OPERATIONS------------------------------------------------

//----------DEPOSIT
app.patch('/mysql/deposit/id/:id',async function(req,res,next){
    const id = req.params.id
    const body = req.body
    const amount = body.amount
    const deposit = await transactionOperations.deposit(id,amount)
    if(deposit == false)
        res.status(400).send({message:"user dosent exist with id "+id+" / Enter valid amount between 1 to 100000"})
    else
        res.send(deposit)
})

//----------TRANSFER
app.patch('/mysql/transfer/fromID/toID/:fromID/:toID',async function(req,res,next){
    const fromID = req.params.fromID
    const toID = req.params.toID
    const body = req.body
    const amount = body.amount
    const transfer = await transactionOperations.transfer(fromID,toID,amount)
    if(transfer == false)
        res.status(400).send({message:"user dosent exist with fromid "+fromID+" or toID "+toID+" / Enter valid amount between 1 to 100000/ insufficient balance"})
    else
        res.send(transfer)
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