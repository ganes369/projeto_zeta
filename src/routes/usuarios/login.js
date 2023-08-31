const UsuariosErro = require('../../error/usuarios');

const {
    DecoratorHttpInterceptor,
} = require('../../middleware/decorations/decoratorHttpInterceptor');
const {
    DecoratorResponse,
} = require('../../middleware/decorations/decoratorResponse');

DecoratorResponse();
DecoratorHttpInterceptor();
class Login {
    constructor(router, servico) {
        this.router = router;
        this.servico = servico

        this.router.post('/login', this.logar.bind(this));
    }

    async logar(req, res) {
        try {
            const { email, senha } = req.body;
            const user = await this.servico.login({ email, senha });
            return res.json(user);
        } catch (error) {
            console.log(error);
            const err = new UsuariosErro(error.message, error.errorCode || 500);
            return res
                .status(err.errorCode)
                .json(JSON.parse(JSON.stringify(err, null, 2)));
        } 
    }
}

module.exports = Login;
