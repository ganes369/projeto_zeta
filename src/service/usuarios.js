const UsuariosError = require('../error/usuarios');
const Gerador = require('../utils/gerador');

const emissorEvento = require('../emiters/emissor');

class UsuarioServico {
    constructor(servico, jwt, bcrypt) {
        this.usuarioServico = servico;
        this.jwt = jwt;
        this.bcrypt = bcrypt;
    }

    async login({ email, senha }) {
        const user = await this.usuarioServico.login({ email });
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

        const resultado = await this.usuarioServico.cadastrar({
            nome,
            email,
            senha: hash,
            permissao,
        });

        emissorEvento.emit('acessoUsuario', {
            senhaAleatoria,
            email,
            nome,
            subject: 'Acesso a conta livraria zeta',
            templatePath: './../templates/envio_acesso.ejs',
        });

        return resultado;
    }
}
module.exports = UsuarioServico;
