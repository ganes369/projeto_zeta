const express = require('express');
require('../database/index')

const UsuariosRotas = require('./routes/usuarios');
const LivrosRotas = require('./routes/livros');

const UserRespository = require('./repositories/usuarios');
const LivrosRepository = require('./repositories/livros');

const UsuariosModel = require('./models/usuarios');
const LivrosModel = require('../src/models/livros')

const JwtService = require('./middleware/jwt');

const app = express();
const jwt = new JwtService(process.env.SECRET);

// Middleware para analisar o corpo da requisição como JSON
app.use(express.json());

const livrosRotas = new LivrosRotas(express.Router(), jwt, new LivrosRepository(LivrosModel));
app.use('/livro', livrosRotas.router);

const usuariosRotas = new UsuariosRotas(express.Router(), jwt, new UserRespository(UsuariosModel));
app.use('/user', usuariosRotas.router);

// Resto da configuração do aplicativo...

app.listen(3000);
