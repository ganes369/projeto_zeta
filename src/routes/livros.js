const LivrosErro = require('../error/livros');
const LivrosService = require('../service/livros');
const {
    DecoratorHttpInterceptor,
} = require('../middleware/decorations/decoratorHttpInterceptor');
const {
    DecoratorResponse,
} = require('../middleware/decorations/decoratorResponse');

DecoratorResponse();
DecoratorHttpInterceptor();
class LivrosRotas {
    constructor(router, jwt, repositorio) {
        this.router = router;
        this.jwt = jwt;
        this.repositorio = new LivrosService(repositorio);

        this.router.get('/listar', this.listarLivros.bind(this));

        this.router.get('/porid', this.listarPorId.bind(this));
    }

    async listarLivros(req, res) {
        try {
            const pagina = +req.query.pagina || 1;

            const livro = await this.repositorio.listarLivros(pagina);
            return res.status(200).json(livro);
        } catch (error) {
            const err = new LivrosErro(error.message, error.errorCode || 500);
            return res
                .status(err.errorCode)
                .json(JSON.parse(JSON.stringify(err, null, 2)));
        }
    }

    async listarPorId(req, res) {
        try {
            const id = +req.query.id || 1;

            const livro = await this.repositorio.listarPorId(id);
            return res.status(200).json(livro);
        } catch (error) {
            console.log(error);
            const err = new LivrosErro(error.message, error.errorCode || 500);
            return res
                .status(err.errorCode)
                .json(JSON.parse(JSON.stringify(err, null, 2)));
        }
    }
}

module.exports = LivrosRotas;
