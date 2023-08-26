const LivrosEntidade = require('../entities/livros');

class LivroRepositorio {
    constructor(conn) {
        this.conn = conn;
        this.tamanho_pagina = 10;
    }

    async listar(pagina) {
        const livros = await this.conn.findAll({
            limit: this.tamanho_pagina,
            offset: (pagina - 1) * this.tamanho_pagina,
        });
        if (!livros) return undefined;
        const result = livros.map(
            (item) =>
                new LivrosEntidade({
                    id: item.id,
                    titulo: item.titulo,
                    autor: item.autor,
                    generos: item.generos,
                    status: item.status,
                    created: item.created_at,
                    updated: item.updated_at,
                }).capitalizeAfterSpace()
        );

        return result;
    }

    async listarPorId(id) {
        const livro = await this.conn.findByPk(id);
        if (!livro) return undefined;
        return new LivrosEntidade({
            id: livro.id,
            titulo: livro.titulo,
            autor: livro.autor,
            generos: livro.generos,
            status: livro.status,
            created: livro.created_at,
            updated: livro.updated_at,
        });
    }

    async cadatrar({ titulo, autor, generos, status }){
        const livro = await this.conn.create({ titulo, autor, generos, status });
        if (!livro) return undefined;
        return new LivrosEntidade({
            id: livro.id,
            titulo: livro.titulo,
            autor: livro.autor,
            generos: livro.generos,
            status: livro.status,
            created: livro?.created_at,
            updated: livro?.updated_at,
        });
    }
}

module.exports = LivroRepositorio;
