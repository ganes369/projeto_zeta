const express = require('express');

const app = express();
const JwtService = require('./middleware/jwt');

const jwt = new JwtService(process.env.SECRET);
const Books = require('./routes/books');
const User = require('./routes/user');

// Middleware para analisar o corpo da requisição como JSON
app.use(express.json());

const books = new Books(express.Router(), jwt);
app.use('/', books.router);

const user = new User(express.Router(), jwt);
app.use('/', user.router);

// Resto da configuração do aplicativo...

app.listen(3000);
