const LivrosErro = require('../error/livros');
const LivrosService = require('../service/livros');
const { permissionAdmin } = require('../middleware/permission');

class LivrosRotas {
    constructor(router, jwt, repositorio) {
        this.router = router;
        this.jwt = jwt;
        this.repositorio = new LivrosService(repositorio);

        this.router.get('/listar', this.listarLivros.bind(this));

        this.router.get('/porid', this.listarPorId.bind(this));

        this.router.post('/cadastra', this.jwt.verify,
        permissionAdmin, this.cadatrar.bind(this));
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
            const err = new LivrosErro(error.message, error.errorCode || 500);
            return res
                .status(err.errorCode)
                .json(JSON.parse(JSON.stringify(err, null, 2)));
        }
    }
    async cadatrar(req, res){
        try {
            const { titulo, autor, generos, status } = req.body;
            const livro = await this.repositorio.cadatrar({ titulo, autor, generos, status });
            return res.status(200).json(livro);
        } catch (error) {
            const err = new LivrosErro(error.message, error.errorCode || 500);
            return res
                .status(err.errorCode)
                .json(JSON.parse(JSON.stringify(err, null, 2)));
        }

    }
}

module.exports = LivrosRotas;
