const {Router} = require('express')
const userOperations = require("../services/user");
const transactionOperations = require("../services/transaction");

const router = Router()

//------------------------------------------------TRANSACTION OPERATIONS------------------------------------------------

//----------DEPOSIT
router.patch('/deposit',async function(req,res,next){
    try{
        const id = req.id
        const body = req.body
        const amount = body.amount
        let result = await transactionOperations.deposit(id,amount)
        res.status(200).json({message: `successfully deposited & user ID: ${result.id} with current balance ${result.balance}`})
    }catch (e) {
     console.log(e.toString())
     next(e)
    }
})

//----------TRANSFER
router.patch('/transfer/id/:id',async function(req,res,next){
    try {
        const fromID = req.id
        const toID = req.params.id
        const body = req.body
        const amount = body.amount
        const result = await transactionOperations.transfer(fromID,toID,amount)
        res.json({message:`${amount} successfully debited from ${result[0].firstname} with ID:${result[0].id} to ${result[1].firstname} with ID:${result[1].id} & CURRENT BALANCE:${result[0].balance}`})
    }catch (e) {
        console.log(e.toString())
        next(e)
    }
})

//WITHDRAW
router.patch('/withdraw',async function(req,res,next){
    try {
        const id = req.id
        const body = req.body
        const amount = body.amount
        const result = await transactionOperations.withdraw(id, amount)
        res.json({message: `${amount} successfully withdrawn & CURRENT BALANCE:${result.balance} for UserID: ${result.id}`})
    } catch (e) {
        next(e)
    }
})

//READ TRANSACTIONS
router.get('/',async function(req,res,next){
    try{
        const id = req.id
        const result = await transactionOperations.readTransactions(id)
        if(!result.length){
            res.status(400).json({message:`no transactions with ID:${id}`})
        }
        else{
            res.send(result)
        }
    }catch (e) {
        console.log(e.toString())
        next(e)
    }

})

module.exports = router