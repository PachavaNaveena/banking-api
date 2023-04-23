const {Router} = require('express')
const transactionOperations = require("../services/transaction");

const router = Router()

//------------------------------------------------TRANSACTION OPERATIONS------------------------------------------------

//----------DEPOSIT
//if API call path: is '/transaction/deposit' , method:'patch' then the below code executes, if not matched then follows the next sequential route API in this file
router.patch('/deposit',async function(req,res,next){
    try{
        const id = req.id
        const body = req.body
        const amount = body.amount
        let result = await transactionOperations.deposit(id,amount)
        res.status(200).json({message: `successfully deposited & user ID: ${result.id} with current balance ${result.balance}`})
    }catch (e) {
     console.log(e.toString())
     next(e)                         // if error catched next(e)--> follows to main origin i.e middle ware ->app.use('/', routes) in index.js file and executes the next middleWare app.use((error, req, res, next) in index.js file
    }
})

//----------TRANSFER
////if API call path: is '/transaction/transfer' , method:'patch' then the below code executes, if not matched then follows the next sequential route API in this file
router.patch('/transfer',async function(req,res,next){
    try {
        const fromID = req.id
       // const toID = req.params.id
        const body = req.body
        const amount = body.amount
        const toID = body.id
        const result = await transactionOperations.transfer(fromID,toID,amount)
        res.json({message:`${amount} successfully debited from ${result[0].firstname} with ID:${result[0].id} to ${result[1].firstname} with ID:${result[1].id} & CURRENT BALANCE:${result[0].balance}`})
    }catch (e) {
        console.log(e.toString())
        next(e)                        // if error catched next(e)--> follows to main origin i.e middle ware ->app.use('/', routes) in index.js file and executes the next middleWare app.use((error, req, res, next) in index.js file
    }
})

//WITHDRAW
////if API call path: is '/transaction/withdraw' , method:'patch' then the below code executes, if not matched then follows the next sequential route API in this file
router.patch('/withdraw',async function(req,res,next){
    try {
        const id = req.id
        const body = req.body
        const amount = body.amount
        const result = await transactionOperations.withdraw(id, amount)
        res.json({message: `${amount} successfully withdrawn & CURRENT BALANCE:${result.balance} for UserID: ${result.id}`})
    } catch (e) {
        next(e)         // if error catched next(e)--> follows to main origin i.e middle ware ->app.use('/', routes) in index.js file and executes the next middleWare app.use((error, req, res, next) in index.js file
    }
})

//READ TRANSACTIONS
//if API call path: is '/transaction/' , method:'get' then the below code executes, if not matched then follows the next sequential route API in this file
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
        next(e)                         // if error catched next(e)--> follows to main origin i.e middle ware ->app.use('/', routes) in index.js file and executes the next middleWare app.use((error, req, res, next) in index.js file
    }

})

module.exports = router