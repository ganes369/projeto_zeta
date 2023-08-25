const UsuarioService = require('../service/usuarios');
const UsuarioError = require('../error/usuarios');
const BcryptService = require('../utils/encrypt');

const {
    DecoratorHttpInterceptor,
} = require('../middleware/decorations/decoratorHttpInterceptor');
const {
    DecoratorResponse,
} = require('../middleware/decorations/decoratorResponse');
const { permissionAdmin } = require('../middleware/permission');

DecoratorResponse();
DecoratorHttpInterceptor();
class UsuarioRota {
    constructor(router, jwt, user) {
        this.router = router;
        this.jwt = jwt;
        this.user = new UsuarioService(user, this.jwt, new BcryptService());

        this.router.post('/login', this.login.bind(this));
        this.router.post(
            '/cadastro',
            this.jwt.verify,
            permissionAdmin,
            this.cadastro.bind(this)
        );
    }

    async login(req, res) {
        try {
            const { email, senha } = req.body;
            const user = await this.user.login({ email, senha });
            return res.json(user);
        } catch (error) {
            const err = new UsuarioError(error.message, error.errorCode || 500);
            return res
                .status(err.errorCode)
                .json(JSON.parse(JSON.stringify(err, null, 2)));
        }
    }

    async cadastro(req, res) {
        try {
            const { nome, email, senha, permissao } = req.body;
            const user = await this.user.cadastrar({
                nome,
                email,
                senha,
                permissao,
            });
            return res.status(200).json(user);
        } catch (error) {
            const err = new UsuarioError(error.message, error.errorCode || 500);
            return res
                .status(err.errorCode)
                .json(JSON.parse(JSON.stringify(err, null, 2)));
        }
    }
}

module.exports = UsuarioRota;
