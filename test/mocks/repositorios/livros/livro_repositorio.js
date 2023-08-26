const LivrosEntidade = require('../../../../src/entities/livros');
const LivroRepositorio = require('../../../../src/repositories/livros');

class MockRepositorioLivro extends LivroRepositorio {
    listar(...args) {
        return [
            new LivrosEntidade({
                id: 1,
                titulo: 'titulo do livro',
                autor: 'autor do Livro',
                generos: 'generos',
                status: 'livre',
                created: new Date(2023, 8, 26),
                updated: new Date(2023, 8, 26),
            }),
            new LivrosEntidade({
                id: 1,
                titulo: 'titulo do livro',
                autor: 'autor do Livro',
                generos: 'generos',
                status: 'livre',
                created: new Date(2023, 8, 26),
                updated: new Date(2023, 8, 26),
            }),
        ];
    }

    listarPorId(...args) {
        return null;
    }

    cadatrar(...args) {
        return new LivrosEntidade({
            id: 1,
            titulo: 'titulo do livro',
            autor: 'autor do Livro',
            generos: 'generos',
            status: 'livre',
            created: new Date(2023, 8, 26),
            updated: new Date(2023, 8, 26),
        });
    }
}

module.exports = MockRepositorioLivro;
