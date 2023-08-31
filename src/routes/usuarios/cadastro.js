const UsuariosErro = require('../../error/usuarios');
const { permissaoAdmin } = require('../../middleware/permission');

class Cadastrar {
    constructor(router, jwt, servico) {
        this.router = router;
        this.jwt = jwt;
        this.servico = servico

        this.router.post(
            '/cadastrar',
            this.jwt.verify,
            permissaoAdmin,
            this.casdastrar.bind(this)
        );
    }

    async casdastrar(req, res) {
        try {
            const { nome, email, permissao } = req.body;
            const user = await this.servico.cadastrar({
                nome,
                email,
                permissao,
            });
            return res.status(200).json(user);
        } catch (error) {
            const err = new UsuariosErro(error.message, error.errorCode || 500);
            return res
                .status(err.errorCode)
                .json(JSON.parse(JSON.stringify(err, null, 2)));
        }
    }
}

module.exports = Cadastrar;
