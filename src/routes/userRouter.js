const {Router} = require('express')
const userOperations = require("../services/user");
const MissingDataError = require("../errors/MissingDataError");
const {login} = require("../services/user");
const bota = require("btoa")

const privateRouter = Router()
const publicRouter = Router()

//---------ADD USER
//if API call path: is '/user/' , method:'post' then the below code executes, if not matched then follows the next sequential PublicRoute API
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
        await userOperations.email_check(body.email)
        userOperations.password_check(body.password)
        const user = await userOperations.addUser(body)
        res.status(200).json(user)
    }catch (e) {
        next(e)             // if error catched next(e)--> follows to main origin i.e middle ware ->app.use('/', routes) in index.js file and executes the next middleWare app.use((error, req, res, next) in index.js file
    }
})

//--------LOGIN
//if API call path: is '/user/login' , method:'post' then the below code executes, if not matched then go back to origin point 'userPublicRoute' in routes/index.js
publicRouter.post('/login', async (req, res, next) => {
    try{
        const email = req.body.email
        const password = req.body.password
        await login(email, password);
        res.json({ message: 'Login successful', token: bota(`${email}:${password}`) })
    }catch (e) {
        console.log(e.toString())
        next(e)                         // if error catched next(e)--> follows to main origin i.e middle ware ->app.use('/', routes) in index.js file and executes the next middleWare app.use((error, req, res, next) in index.js file
    }
})


//---------GET USERS
//if API call path: is '/user/list' , method:'get' then the below code executes, if not matched then follows the next sequential PrivateRoute API
privateRouter.get('/list',  async function (req,res,next){
    try{
        const users = await userOperations.getUsers()
        res.json(users)
    }catch (e) {
        console.log(e.toString())
        next(e)                         // if error catched next(e)--> follows to main origin i.e middle ware ->app.use('/', routes) in index.js file and executes the next middleWare app.use((error, req, res, next) in index.js file
    }
})

//---------GET USER (USING PROMISE)
/* privateRouter.get('/list',  async function (req,res,next){
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
*/

//---------GET USER
//if API call path: is '/user/' , method:'get' then the below code executes, if not matched then follows the next sequential PrivateRoute API
privateRouter.get('/' ,async function(req,res,next){
    try {
        const id = req.id
        const user = await userOperations.getUser(id)
        res.send(user)
    } catch (e) {
        console.error(e.toString())
        next(e)                       // if error catched next(e)--> follows to main origin i.e middle ware ->app.use('/', routes) in index.js file and executes the next middleWare app.use((error, req, res, next) in index.js file
    }
})

//-------UPDATE USER
//if API call path: is '/user/' , method:'put' then the below code executes, if not matched then follows the next sequential PrivateRoute API
privateRouter.put('/',async function(req,res,next){
    try{
        const id = req.id
        const body = req.body
        let user = await userOperations.getUser(id)
        const givenFields = Object.keys(body)
        console.log(givenFields)
        const requiredFields = ['firstname', 'lastname', 'email', 'address1', 'address2', 'city', 'state', 'zipcode','password']
        for (let i=0; i< givenFields.length; i++){
            let field = givenFields[i]
            if(requiredFields.indexOf(field) > -1){
                user[field] = body[field]
            }
        }
        await userOperations.email_check(user.email)
        userOperations.password_check(user.password)
        let result = await userOperations.updateUser(user)
        res.send(result)
    }catch (e) {
        console.log(e.toString())
        next(e)                     // if error catched next(e)--> follows to main origin i.e middle ware ->app.use('/', routes) in index.js file and executes the next middleWare app.use((error, req, res, next) in index.js file
    }
})

//-----------SEARCH USER
//if API call path: is '/name/:name' , method:'get' then the below code executes, if not matched then go back to origin point 'userPrivateRoute' in routes/index.js
privateRouter.get('/name/:name',async function (req,res,next){
    try{
        const name = req.params.name.trim()
        const users = await userOperations.searchUser(name)
            res.json(users)
    }catch (e) {
        console.log(e.toString())
        next(e)                     // if error catched next(e)--> follows to main origin i.e middle ware ->app.use('/', routes) in index.js file and executes the next middleWare app.use((error, req, res, next) in index.js file
    }
})

module.exports = {
    privateRouter,
    publicRouter
}