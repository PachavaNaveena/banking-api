const {Router} = require('express')
const userOperations = require("../services/user");
const transactionOperations = require("../services/transaction");

const privateRouter = Router()
const publicRouter = Router()

//---------ADD USER
publicRouter.post('/',async function(req,res,next){
    try{
        const body = req.body
        // const requiredFields = ['firstname', 'lastname', 'email', 'address1', 'address2', 'city', 'state', 'zipcode','password']
        // const givenFields = Object.keys(body)
        // const missing = []
        // requiredFields.forEach(function (value){
        //     if(givenFields.indexOf(value) == -1)
        //         missing.push(value)
        // })
        // if(missing.length > 0)
        //     res.status(400).send({message:"missing required fields are "+missing.join(",")})

        const user = await userOperations.addUser(body)
        res.status(200).json(user)

        // if(adduser == "same_email")
        //     res.status(400).send({message:"email "+body.email+" alredy in use"})
        // else{
        //     res.status(200).json(adduser)
        // }
    }catch (e) {
        next (e)
    }
})

//---------GET USERS
privateRouter.get('/list',  async function (req,res,next){
    try{
        const users = await userOperations.getUsers()
        res.send(users)
    }catch (e) {
        next (e)
    }
})


//---------GET USER
privateRouter.get('/' ,async function(req,res,next){
    try {
        const id = req.id
        const user = await userOperations.getUser(id)
        // if (user == null) {
        //     res.status(400).send({message: "user with id : " + id + " dosent exist"})
        // } else {
        //     res.send(user)
        // }
        res.send(user)
    } catch (e) {
        console.error(e.toString())
        next(e)                                               // prints the caught error in the postmen
    }
})

//-------UPDATE USER
privateRouter.put('/id/:id',async function(req,res,next){
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

//-----------SEARCH USER
privateRouter.get('/name/:name',async function (req,res,next){
    const name = req.params.name
    const users = await userOperations.searchUser(name)
    if(users.length == 0)
        res.status(400).send({message:"user dose`t exist with name:"+name})
    else
        res.json(users)
})

module.exports = {
    privateRouter,
    publicRouter
}