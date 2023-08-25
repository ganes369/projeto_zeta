const UsuarioEntidade = require('../entities/usuarios');

class UsuarioRepositorio {
    constructor(conn) {
        this.conn = conn;
    }

    async login({ email }) {
        const user = await this.conn.findOne({ where: { email } });
        if (!user) return undefined;
        return new UsuarioEntidade({
            id: user.id,
            nome: user.nome,
            email: user.email,
            senha: user.senha,
            permissao: user.permissao,
            created: user.created_at,
            updated: user.updated_at,
        });
    }

    async cadastrar({ nome, email, senha, permissao }) {
        const user = await this.conn.create({ nome, email, senha, permissao });
        return new UsuarioEntidade({
            id: user.id,
            nome: user.nome,
            email: user.email,
            senha: user.senha,
            permissao: user.permissao,
            created: user.created_at,
            updated: user.updated_at,
        });
    }
}

module.exports = UsuarioRepositorio;
