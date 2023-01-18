const express = require('express')
const bodyParser = require('body-parser')
const userOps = require('./User')

const app = express()


app.use(bodyParser.json({limit: '2mb', type: '*/json'}))

app.get('/users', function(req, res, next){
 const users = userOps.getUsers();
 res.send(users)
})

app.get('/users/name/:name', function(req, res, next){
 const name = req.params.name
 const size = req.query.size
 const users = userOps.searchUser(name)
 res.json(users)
})

app.post('/users', function(req, res, next) {
 const body = req.body
 const requiredFields = ["firstName", "lastName"]
 const fields = Object.keys(body)

 const missing = []
 requiredFields.forEach((value) =>{
  if (fields.indexOf(value) === -1) {
   missing.push(value)
  }
 })

 if (missing.length > 0) {
  res.status(400).json(
      {
       message: "Missing required field " + missing.join(", "),
       message1: `Missing required field ${missing.join(", ")}`
      }
  )
 } else {
  userOps.addUser(body)
  res.json(body)
 }
})

app.listen(6000, function() {
 console.log("App running on http://localhost:6000")
})