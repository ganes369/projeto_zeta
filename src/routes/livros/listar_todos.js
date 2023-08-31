const LivroError = require("../../error/livros");

class LisTarTodos {
    constructor(router, servico) {
        this.router = router;
        this.servico = servico;

        this.router.get('/listar', this.listar.bind(this));
    }

    async listar(req, res) {
        try {
            const pagina = +req.query.pagina || 1;

            const livro = await this.servico.listarLivros(pagina);
            return res.status(200).json(livro);
        } catch (error) {
            const err = new LivroError(error.message, error.errorCode || 500);
            return res
                .status(err.errorCode)
                .json(JSON.parse(JSON.stringify(err, null, 2)));
        }
    }
}

module.exports = LisTarTodos;