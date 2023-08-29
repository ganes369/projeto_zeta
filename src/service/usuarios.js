const UsuariosError = require('../error/usuarios');
const Gerador = require('../utils/gerador');

const emissorEvento = require('../emiters/emissor');

class UsuarioServico {
    constructor(repository, jwt, bcrypt) {
        this.user = repository;
        this.jwt = jwt;
        this.bcrypt = bcrypt;
    }

    async login({ email, senha }) {
        const user = await this.user.login({ email });
        if (!user) throw new UsuariosError('wrong password or email ;(', '404');

        const isMatch = await this.bcrypt.compare(senha, user.senha);

        if (!isMatch)
            throw new UsuariosError('wrong password or email ;(', '404');

        const jwt = this.jwt.sign(
            { id: user.id, permissao: user.permissao, email },
            7200
        );
        return { ...user, token: jwt };
    }

    async cadastrar({ nome, email, permissao }) {
        const senhaAleatoria = Gerador.geradorSenha();
        const hash = await this.bcrypt.hash(senhaAleatoria);

        const resultado = await this.user.cadastrar({
            nome,
            email,
            senha: hash,
            permissao,
        });

        emissorEvento.emit('acessoUsuario', { senhaAleatoria, email });

        return resultado;
    }
}
module.exports = UsuarioServico;
