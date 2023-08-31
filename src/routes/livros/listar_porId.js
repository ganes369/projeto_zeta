const LivroError = require("../../error/livros");

class ListarPorId {
    constructor(router, servico) {
        this.router = router;
        this.servico = servico;

        this.router.get('/porid', this.listarPorId.bind(this));
    }

    async listarPorId(req, res) {
        try {
            const id = +req.query.id || 1;

            const livro = await this.servico.listarPorId(id);
            return res.status(200).json(livro);
        } catch (error) {
            const err = new LivroError(error.message, error.errorCode || 500);
            return res
                .status(err.errorCode)
                .json(JSON.parse(JSON.stringify(err, null, 2)));
        }
    }
}

module.exports = ListarPorId;