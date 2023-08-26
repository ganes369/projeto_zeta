// const { expect, describe, test, jest, beforeEach } = require('@jest/globals');
const LivroService = require('../../../../src/service/livros');
const MockRepositorioLivro = require('../../../mocks/repositorios/livros/livro_repositorio');
const LivrosEntidade = require('../../../../src/entities/livros');

describe('Servico de Cadastro de livros', () => {
    let instanciaLivro;
    let repository;

    beforeEach(() => {
        jest.clearAllMocks();
        repository = new MockRepositorioLivro();
        instanciaLivro = new LivroService(repository);
    });

    test('Deverá Cadastra um novo livro e captalizar a primeira letra das palavras', async () => {
        const resultado = await instanciaLivro.cadatrar({
            titulo: 'titulo do livro',
            autor: 'autor do livro',
            generos: 'generos',
            status: 'livre',
        });
        expect(resultado).toBeInstanceOf(LivrosEntidade);
        expect(resultado).toEqual({
            id: 1,
            titulo: 'Titulo Do Livro',
            autor: 'Autor Do Livro',
            generos: 'Generos',
            status: 'Livre',
            created: new Date(2023, 8, 26),
            updated: new Date(2023, 8, 26),
        });
    });

    test('Deverá repassar a exeption', async () => {
        jest.spyOn(repository, 'cadatrar').mockRejectedValueOnce(
            new Error('violação de constrain de banco de dados')
        );

        await expect(
            instanciaLivro.cadatrar({
                titulo: 'titulo do livro',
                autor: 'autor do livro',
                generos: 'generos',
                status: 'livre',
            })
        ).rejects.toThrow(Error);
    });
});
