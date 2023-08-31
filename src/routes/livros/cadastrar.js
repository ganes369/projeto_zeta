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
            this.cadastrar.bind(this)
        );
    }

    async cadastrar(req, res) {
        try {
            const { titulo, autor, generos, status } = req.body;
            const livro = await this.servico.cadastrar({
                titulo,
                autor,
                generos,
                status,
            });
            return res.status(200).json(livro);
        } catch (error) {
            const err = new UsuariosErro(error.message, error.errorCode || 500);
            return res
                .status(err.errorCode)
                .json(JSON.parse(JSON.stringify(err, null, 2)));
        }
    }
}

module.exports = Cadastrar;
