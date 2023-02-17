const {Router} = require('express')
const {privateRouter: userPrivateRouter, publicRouter: userPublicRouter } = require("./userRouter");
const transactionRouter = require("./transactionRouter");
const {isTokenValid} = require("../services/user");
const router = Router()

const isValidUser = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "Missing authorization token"
        })
    }
    const validUser = await isTokenValid(req.headers.authorization)
    if (!validUser) {
        return res.status(401).json({
            message: "Invalid user"
        })
    } else {
        req.id = validUser.id
    }
    next()
}

router.use('/user', userPublicRouter)

router.use(isValidUser)

router.use('/user', userPrivateRouter)
router.use('/transaction', transactionRouter)

module.exports = router