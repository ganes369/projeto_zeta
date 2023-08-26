// const { expect, describe, test, jest, beforeEach } = require('@jest/globals');
const UsuarioServico = require('../../../../src/service/usuarios');
const JwtMock = require('../../../mocks/servicos/jwt');
const MockRepositorioUsuario = require('../../../mocks/repositorios/usuarios/usuario_repositorio');
const MockEncrypt = require('../../../mocks/servicos/bcrypt');
const UsuariosErro = require('../../../../src/error/usuarios');

describe('Servico de Usuario login', () => {
    let instanciaUsuario;
    let repository;
    let bcrypt;
    let jwt;
    
    beforeEach(() => {
        jest.clearAllMocks();
        repository = new MockRepositorioUsuario();
        bcrypt = new MockEncrypt();
        jwt = new JwtMock();
        instanciaUsuario = new UsuarioServico(repository, jwt, bcrypt);
    });

    test('Deverá retornar usuario e token de login', async () => {
        const spyJwt = jest.spyOn(jwt, 'sign');
        const spyBcrypt = jest.spyOn(bcrypt, 'compare');

        const resultado = await instanciaUsuario.login({
            email: 'aras@gmail.com',
            senha: '123',
        });

        expect(spyJwt).toHaveBeenCalled();
        expect(spyBcrypt).toHaveBeenCalled();
        expect(resultado).toEqual({
            id: 1,
            nome: 'admin',
            senha: '123',
            email: 'aras@gmail.com',
            permissao: 63,
            token: 'token',
            created: new Date(2023,8,26),
            updated: new Date(2023,8,26),
        });
    });

    test('Deverá retornar erro caso a senha de usuario esteja incorreta', async () => {
        const spyJwt = jest.spyOn(jwt, 'sign');
        const spyLogin = jest.spyOn(repository, 'login')
        const spyBcrypt = jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(undefined)

        await expect(instanciaUsuario.login({ email: 'aras@gmail.com', senha: '123', }))
        .rejects.toThrow(UsuariosErro);
        expect(spyJwt).not.toHaveBeenCalled();
        expect(spyLogin).toHaveBeenCalled();
        expect(spyBcrypt).toHaveBeenCalled();
    });

    test('Deverá retornar erro caso não encontre email de usuario', async () => {
        const spyJwt = jest.spyOn(jwt, 'sign');
        const spyBcrypt = jest.spyOn(bcrypt, 'compare');

        jest.spyOn(repository, 'login').mockResolvedValueOnce(undefined)
  
        await expect(instanciaUsuario.login({ email: 'aras@gmail.com', senha: '123', }))
        .rejects.toThrow(UsuariosErro);
        expect(spyJwt).not.toHaveBeenCalled();
        expect(spyBcrypt).not.toHaveBeenCalled();
    });

  
});

describe('Servico de Usuario Cadastra', () => {
    let instanciaUsuario;
    let repository;
    let bcrypt;
    let jwt
    beforeEach(() => {
        jest.clearAllMocks();
        repository = new MockRepositorioUsuario();
        bcrypt = new MockEncrypt()
        jwt = new JwtMock();
        instanciaUsuario = new UsuarioServico(repository, jwt, bcrypt)
    });

    test('Deverá retornar usuario cadastrado e persisti-lo com a senha criptada', async () => {
        const spyBcrypt = jest.spyOn(bcrypt, 'hash');
        const spyRepositorio = jest.spyOn(repository, 'cadastrar');
        const resultado = await instanciaUsuario.cadastrar({
            email: "usuario@gmail.com",
            senha: '123',
            nome: "usuario",
            permissao: 1,
        });

        expect(spyBcrypt).toHaveBeenCalled();
        expect(spyRepositorio).toHaveBeenCalledWith({
            nome: "usuario",
            email: "usuario@gmail.com",
            permissao: 1,
            senha: 'hash',
        });
        expect(resultado).toEqual({
            id: 2,
            nome: 'usuario',
            senha: '123',
            email: 'usuario@gmail.com',
            permissao: 1,
            created: new Date(2023,8,26),
            updated: new Date(2023,8,26),
        });
    });
});

