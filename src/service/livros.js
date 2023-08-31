const LivrosError = require('../error/livros');

class LivroService {
    constructor(repository) {
        this.repository = repository;
    }

    async listarLivros(pagina) {
        return this.repository.listar(pagina);
    }

    async listarPorId(id) {
        const livro = await this.repository.listarPorId(id);
        if (!livro) throw new LivrosError('Not Found id', '404');
        return livro.capitalizeAfterSpace();
    }

    async cadastrar({ titulo, autor, generos, status }) {
        const livro = await this.repository.cadastrar({
            titulo,
            autor,
            generos,
            status,
        });
        return livro?.capitalizeAfterSpace();
    }
}
module.exports = LivroService;

/**
 * o uso de await em uma expressão de retorno é redundante. Isso ocorre porque, ao usar await em uma expressão de retorno, você está aguardando a resolução de uma promessa antes de retornar o valor, o que pode não ser necessário em alguns casos.
 */
