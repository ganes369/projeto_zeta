const { Sequelize } = require('sequelize');
const LivrosEntidade = require('../entities/livros');
const Livro = require('../models/livros');
const dbConfig = require('../../config/database');

class LivroRepositorio {
    constructor(){
        this.paginaTamanho = 10
    }

    async listar(pagina) {
        const conn = new Sequelize(dbConfig)
        try {
            Livro.init(conn)
            const livros = await Livro.findAll({
                limit: this.paginaTamanho,
                offset: (pagina - 1) * this.paginaTamanho,
            });
            if (!livros) return undefined;
            const result = livros.map((item) =>
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
        } catch (error) {
            throw new Error(error)
        } finally {
            await conn.close();
        }
        
    }

    async listarPorId(id) {
        const conn = new Sequelize(dbConfig)
        try {
            Livro.init(conn)
            const livros = await Livro.findByPk(id);
            if (!livros) return undefined;
            return new LivrosEntidade({
                id: livros.id,
                titulo: livros.titulo,
                autor: livros.autor,
                generos: livros.generos,
                status: livros.status,
                created: livros.created_at,
                updated: livros.updated_at,
            });
        }  catch (error) {
            throw new Error(error)
        } finally {
            await conn.close();
        }
        
    }

    async cadastrar({ titulo, autor, generos, status }) {
        const conn = new Sequelize(dbConfig)
        try {
            Livro.init(conn)
            const livros = await Livro.create({
                titulo,
                autor,
                generos,
                status,
            });
            if (!livros) return undefined;
            return new LivrosEntidade({
                id: livros.id,
                titulo: livros.titulo,
                autor: livros.autor,
                generos: livros.generos,
                status: livros.status,
                created: livros?.created_at,
                updated: livros?.updated_at,
            });
            
        }  catch (error) {
            throw new Error(error)
        } finally {
            await conn.close();
        }
        
    }
}

module.exports = LivroRepositorio;
