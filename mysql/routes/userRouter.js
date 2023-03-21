const {Router} = require('express')
const userOperations = require("../services/user");
const transactionOperations = require("../services/transaction");
const MissingDataError = require("../errors/MissingDataError");

const privateRouter = Router()
const publicRouter = Router()

//---------ADD USER
publicRouter.post('/',async function(req,res,next){
    try{
        const body = req.body
        const requiredFields = ['firstname', 'lastname', 'email', 'address1', 'address2', 'city', 'state', 'zipcode','password']
        const givenFields = Object.keys(body)
        const missing = []
        requiredFields.forEach(function (value){
            if(givenFields.indexOf(value) == -1)
                missing.push(value)
        })
        if(missing.length > 0){
            throw new MissingDataError(missing.join(','))
        }

        userOperations.password_check(body.password)
        await userOperations.email_check(body.email)
        const user = await userOperations.addUser(body)
        res.status(200).json(user)
    }catch (e) {
        next(e)
    }
})

//---------GET USERS
privateRouter.get('/list',  async function (req,res,next){
    try{
        const action = new Promise((resolve, reject) => {
            userOperations.getUsers1((err, result) => {
                if (err) {
                    return reject(err)
                }
                resolve(result)
            })
        })

        action.then((result) => {

        }).catch(e =>{

        })

        const data = await action;
        res.send(data)

    }catch (e) {
        next (e)
    }
})


//---------GET USER
privateRouter.get('/' ,async function(req,res,next){
    try {
        const id = req.id
        const user = await userOperations.getUser(id)
        res.send(user)
    } catch (e) {
        console.error(e.toString())
        next(e)                                               // takes the error to the app.use(error) function  how???????/
    }
})

//-------UPDATE USER
privateRouter.put('/',async function(req,res,next){
    try{
        const id = req.id
        const body = req.body
        let user = await userOperations.getUser(id)
        const givenFields = Object.keys(body)
        const requiredFields = ['firstname', 'lastname', 'email', 'address1', 'address2', 'city', 'state', 'zipcode','password']
        for (let i=0; i< givenFields.length; i++){
            let field = givenFields[i]
            if(requiredFields.indexOf(field) > -1){
                user[field] = body[field]
            }
        }
        await userOperations.email_check(user.email)
        await userOperations.password_check(user.password)
        let result = await userOperations.updateUser(user)
        res.send(result)
    }catch (e) {
        console.log(e.toString())
        next(e)
    }
})

//-----------SEARCH USER
privateRouter.get('/name/:name',async function (req,res,next){
    try{
        const name = req.params.name.trim()
        const users = await userOperations.searchUser(name)
            res.json(users)
    }catch (e) {
        console.log(e.toString())
        next(e)
    }
})

module.exports = {
    privateRouter,
    publicRouter
}