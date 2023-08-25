const express = require('express');
require('../database/index')


const User = require('./routes/user');
const Livros = require('./routes/livros');

const UserRespository = require('./repositories/user_repository');
const LivrosRepository = require('./repositories/livros_repository');

const UserModel = require('../src/models/users');
const LivrosModel = require('../src/models/livros')

const JwtService = require('./middleware/jwt');

const app = express();
const jwt = new JwtService(process.env.SECRET);

// Middleware para analisar o corpo da requisição como JSON
app.use(express.json());

const livro = new Livros(express.Router(), jwt, new LivrosRepository(LivrosModel));
app.use('/livro', livro.router);

const user = new User(express.Router(), jwt, new UserRespository(UserModel));
app.use('/user', user.router);

// Resto da configuração do aplicativo...

app.listen(3000);
