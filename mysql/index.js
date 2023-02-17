
//--------------------------------------------POSTMEN-------------------------------------------------------------------
const express = require('express')
const bodyParser = require('body-parser')
const {isDBActive} = require("./db/connection");
const routes = require('./routes')

const app = express()

app.use(bodyParser.json({limit: '2mb', type: '*/json'}))
app.use('/', routes)

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

app.use((error, req, res, next) => {
    const status = error.status || 500
    res.status(status).json({
        message: error.toString()
    })
})

app.listen(6000, function() {
    console.log("App running on http://localhost:6000")
})