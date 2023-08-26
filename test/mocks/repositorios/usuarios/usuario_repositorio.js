const Usuarios = require("../../../../src/entities/usuarios");
const UsuarioRepositorio = require("../../../../src/repositories/usuarios");

class MockRepositorioUsuario extends UsuarioRepositorio {
    login(...args) {
        return new Usuarios({
            id: 1,
            nome: 'admin',
            senha: '123',
            email: 'aras@gmail.com',
            permissao: 63,
            created: new Date(2023,8,26),
            updated: new Date(2023,8,26),
        });
    }

    cadastrar(...args) {
        return new Usuarios({
            id: 2,
            nome: 'usuario',
            senha: '123',
            email: 'usuario@gmail.com',
            permissao: 1,
            created: new Date(2023,8,26),
            updated: new Date(2023,8,26),
        });
    }
}

module.exports = MockRepositorioUsuario