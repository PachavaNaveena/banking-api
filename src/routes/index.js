const {Router} = require('express')
const {privateRouter: userPrivateRouter, publicRouter: userPublicRouter } = require("./userRouter");
const transactionRouter = require("./transactionRouter");
const {isTokenValid} = require("../services/user");
const router = Router()

const isValidUser = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "Missing authorization token"                  // if authorization(email, password) not provided while executing API, returns this message and stops execution
        })
    }
    const validUser = await isTokenValid(req.headers.authorization) // call isTokenValid function in '../services/user' for authorization check
    if (!validUser) {
        return res.status(401).json({
            message: "Invalid user"                                 // if provided (email,password) dose`nt match throws message and stops execution
        })
    } else {
        req.id = validUser.id
        req.email = validUser.email
    }
    next()                                                          //takes to the origin isValidUser function, next()-->executes next followed route functions sequentially
}

//if API path matches with '/user' then route to userPublicRouter, if dose`nt then follows below route functions sequentially
router.use('/user', userPublicRouter)

//executes the isValidUser function, and then follow below route functions sequentially
router.use(isValidUser)

//if API path matches with '/user' then route to userPublicRouter, if dose`nt then follows below route functions sequentially
router.use('/user', userPrivateRouter)

//if API path matches with '/transaction' then route to userPrivateRouter, if not matched then go back to origin point app.use('/', routes) in index.js main file
router.use('/transaction', transactionRouter)

module.exports = router