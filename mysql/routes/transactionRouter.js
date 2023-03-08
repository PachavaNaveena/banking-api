const {Router} = require('express')
const userOperations = require("../services/user");
const transactionOperations = require("../services/transaction");

const router = Router()

//------------------------------------------------TRANSACTION OPERATIONS------------------------------------------------

//----------DEPOSIT
router.patch('/deposit/id/:id',async function(req,res,next){
    const id = req.params.id
    const body = req.body
    const amount = body.amount
    let result = await transactionOperations.deposit(id,amount)
    if(result == "no_user")
        res.status(400).send({message:"user dosent exist with id "+id})
    else if(result == "false_amount")
        res.status(400).send({message:"provide amount between 1 to 100000"})
    else
        res.status(200).json({message: `successfully deposited & user ID: ${result.id} with current balance ${result.balance}`})
})

//----------TRANSFER
router.patch('/transfer/fromID/:fromID/toID/:toID',async function(req,res,next){
    const fromID = req.params.fromID
    const toID = req.params.toID
    const body = req.body
    const amount = body.amount
    const result = await transactionOperations.transfer(fromID,toID,amount)
    if(result === "no_fromUser"){
        res.status(400).json({message:`user dosent exist with fromid ${fromID}`})
    } else if(result === "no_toUser"){
        res.status(400).json({message:`user dosent exist with fromid ${toID}`})
    } else if(result === "false_amount"){
        res.status(400).json({message: `Enter valid amount between 1 to 100000`})
    } else if(result === "inn_bal"){
        let from_user = await userOperations.getUser(fromID)
        res.status(400).json({message: `id :${fromID} has insufficient balance ${from_user.balance}`})
    } else{
        res.json({message:`${amount} successfully debited from ${result[0].firstname} with ID:${result[0].id} to ${result[1].firstname} with ID:${result[1].id} & CURRENT BALANCE:${result[0].balance} with ID: ${result[0].id}`})
    }
})

//WITHDRAW
router.patch('/withdraw/id/:id',async function(req,res,next){
    try {
        const id = req.params.id
        const body = req.body
        const amount = body.amount
        const result = await transactionOperations.withdraw(id, amount)
        res.json({message: `${amount} successfully withdrawn & CURRENT BALANCE:${result.balance} with ID: ${result.id}`})
    } catch (e) {
        next(e)
    }
})

router.patch('/withdraw/id/:id',async function(req,res,next){})

//READ TRANSACTIONS
router.get('/readTransactions/id/:id',async function(req,res,next){
    const id = req.params.id
    const readTransactions = await transactionOperations.readTransactions(id)
    if(readTransactions == false)
        res.status(400).send({message:"user dosent exist / No transfers with id "+id})
    else
        res.send(readTransactions)
})

module.exports = router