
//--------------------------------------------POSTMEN-------------------------------------------------------------------
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const {isDBActive} = require("./db/connection");
const routes = require('./routes')
const logger = require('./utils/logger');
const config = require('./config')

const app = express()

//users to transmit information to the react application
app.use(cors())

// app.use((req, res, next) => {
//     res.header(`Access-Control-Allow-Origin`, `http://localhost:63342`);       // without an imported package cors we use this
//     res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
//     res.header(`Access-Control-Allow-Headers`, `Content-Type,Authorization`);
//     next();
// });

app.use(bodyParser.json({limit: '2mb', type: '*/json'}))

//Logger method to logg events performing
app.use( (req, res, next) => {
    logger.http(`URL: ${req.url}, METHOD: ${req.method}, BODY: ${JSON.stringify(req.body)}`);
    next()
})

//navigates to routes when API call starts with path:'/'
app.use('/', routes)

/*DATABASE STATUS------
// when API call starts with path:'/db/status', --> firstly search in routus ,if path dosen`t match then try to match with below path
 */
app.get('/db/status', async (req, res, next) => {
    try {
        const result = await isDBActive();
        if (result) {
            return res.json({
                message: 'DB active'
            })
        }
        res.json({
            message: 'DB Inactive'
        })
    } catch (e) {
        next(e)
    }
})


//if any unspecified error occurs at any levelof code by using error handling method and next() fuction the API routes to there directly
app.use((error, req, res, next) => {
    const status = error.status || 500
    console.log(status)
    res.status(status).json({
        message: error.toString()
    })
})


//the API users the below port number for running the application
const PORT = config.APP_PORT || 6000
app.listen(PORT, function() {
    console.log("App running on http://localhost:"+ PORT)
})