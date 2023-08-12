const path = require('path');
const express = require('express');
const { authenticateAdmin } = require('../middleware/permission');
const { decoratorResponse } = require('../middleware/decoratorResponse');
const UserService = require('../service/user_service');
const JwtService = require('../middleware/jwt');

const router = express.Router();
const jwt = new JwtService(process.env.SECRET);

router.get('/', jwt.verify, authenticateAdmin, async function (req, res) {
  decoratorResponse();

  const { id } = req.query;
  const result = await new UserService(
    path.resolve(__dirname, './../../database/user.json')
  ).getOneUser(+id);
  res.send(result);
});

router.get('/login', function (req, res) {
  const result = new UserService(
    path.resolve(__dirname, './../../database/user.json')
  ).createUser(
    {
      email: 'a@gmail.com',
      id: 2,
      pass: '123',
      permission: 2 ** 0,
    },
    jwt
  );
  res.send(result);
});

module.exports = router;
