const LivrosError = require('../error/livros');

class LivroService {
    constructor(repository) {
        this.repository = repository;
    }

    async listarLivros(pagina) {
        return await this.repository.listar(pagina);
    }

    async listarPorId(id) {
        const livro = await this.repository.listarPorId(id);
        if (!livro) throw new LivrosError('Not Found id', '404');
        return livro;
    }
}
module.exports = LivroService;
