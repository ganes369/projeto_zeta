const express = require('express')
const  UserService  = require('./service/user_service')
const path = require('path')
const JwtService = require('./middleware/jwt')
const { authenticateAdmin } = require('./middleware/permission')
const app = express()
const jwt = new JwtService()

app.get('/', jwt.verify, authenticateAdmin, async function (req, res) {
  var result = await new UserService(path.resolve(__dirname, './../database/user.json')).getOneUser(+req.query.id)
  res.send(result)
})

app.get('/login', function (req, res) {
  var result = new UserService(path.resolve(__dirname, './../database/user.json')).createUser({
    email: 'a@gmail.com',
    id: 2,
    pass:'123',
    permission: 2**0
  })
  res.send(result)
  })
app.listen(3000)