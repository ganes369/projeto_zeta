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
        const result = [];
        for (const livro of livros) {
            result.push(
                new LivrosEntidade({
                    id: livro.id,
                    titulo: livro.titulo,
                    autor: livro.autor,
                    generos: livro.generos,
                    status: livro.status,
                    created: livro.created_at,
                    updated: livro.updated_at,
                })
            );
        }
        return result;
    }

    async listarPorId(id) {
        const livro = await this.conn.findByPk(id);
        if (!livro) return;
        return new LivrosEntidade({
            id: livro?.id,
            titulo: livro?.titulo,
            autor: livro?.autor,
            generos: livro?.generos,
            status: livro?.status,
            created: livro?.created_at,
            updated: livro?.updated_at,
        });
    }
}

module.exports = LivroRepositorio;
