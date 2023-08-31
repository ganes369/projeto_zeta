const express = require('express');
const Cadastrar = require('./cadastro');
const JwtServico = require('../../middleware/jwt');
const Login = require('./login');
const Respositorio = require('../../repositories/usuarios');
const UsuarioServico = require('../../service/usuarios');
const BcryptService = require('../../utils/encrypt');

const JWT = new JwtServico();

const cadastrar = new Cadastrar(express.Router(),JWT,new UsuarioServico(
    new Respositorio(),
    JWT,
    new BcryptService()
));
const logar = new Login(express.Router(), new UsuarioServico(
    new Respositorio(),
    JWT,
    new BcryptService()
));

module.exports = {
    cadastrar,
    logar,
};
