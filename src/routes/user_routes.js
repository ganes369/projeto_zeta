// routes/users.js
const express = require('express');
const path = require('path');
const UserService = require('../service/user_service');
const JwtService = require('./../middleware/jwt')
const { authenticateAdmin } = require('./../middleware/permission')
const jwt = new JwtService(process.env.SECRET)
const { decorator } = require('../middleware/decoratorResponse')

const router = express.Router();

router.get('/', jwt.verify, authenticateAdmin, async function (req, res) {
    decorator()

    const { id } = req.query
    var result = await new UserService(path.resolve(__dirname, './../../database/user.json')).getOneUser(+id)
    res.send(result)
  })


router.get('/login', function (req, res) {
    var result = new UserService(path.resolve(__dirname, './../../database/user.json')).createUser({
      email: 'a@gmail.com',
      id: 2,
      pass:'123',
      permission: 2**0
    }, jwt)
    res.send(result)
})

module.exports = router;

