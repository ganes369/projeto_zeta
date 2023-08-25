const Sequelize = require("sequelize")
const dbConfig = require("./../config/database")

const User = require('../src/models/usuarios');
const Livro = require('../src/models/livros');

const connection = new Sequelize(dbConfig);

User.init(connection);
Livro.init(connection);

module.exports = connection;