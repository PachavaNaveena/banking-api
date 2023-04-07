
//--------------------------------------------POSTMEN-------------------------------------------------------------------
const express = require('express')
const bodyParser = require('body-parser')
const {isDBActive} = require("./db/connection");
const routes = require('./routes')
const logger = require('./utils/logger');
const config = require('./config')

const app = express()

app.use(bodyParser.json({limit: '2mb', type: '*/json'}))
app.use( (req, res, next) => {
    logger.http(`URL: ${req.url}, METHOD: ${req.method}, BODY: ${JSON.stringify(req.body)}`);
    next()
})
app.use('/', routes)

//DATABASE STATUS
app.get('/db/status', async (req, res, next) => {
    const result = await isDBActive();
    if (result) {
        return res.json({
            message: 'DB active'
        })
    }
    res.json({
        message: 'DB Inactive'
    })
})

app.use((error, req, res, next) => {             //this is for what function?????? printing the internal server errors for all the functions & next(e) will take out the program where the path started mean mysql/script.js
    const status = error.status || 500
    console.log(status)
    res.status(status).json({
        message: error.toString()
    })
})

const PORT = config.APP_PORT || 6000
app.listen(PORT, function() {
    console.log("App running on http://localhost:"+ PORT)
})