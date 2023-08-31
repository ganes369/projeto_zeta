const express = require('express');
const JwtServico = require('../../middleware/jwt');
const LisTarTodos = require('./listar_todos');
const LivroRepositorio = require('../../repositories/livros');
const LivroService = require('../../service/livros');
const ListarPorId = require('./listar_porId');
const Cadastrar = require('./cadastrar');

const JWT = new JwtServico();

const listar = new LisTarTodos(express.Router(), new LivroService( new LivroRepositorio() ));
const listarId = new ListarPorId(express.Router(), new LivroService( new LivroRepositorio() ))
const cadastra = new Cadastrar(express.Router(), JWT, new LivroService( new LivroRepositorio() ))

module.exports = {
    listar,
    listarId,
    cadastra
};
