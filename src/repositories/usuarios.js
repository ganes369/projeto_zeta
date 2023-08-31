const { Sequelize } = require('sequelize');
const UsuarioEntidade = require('../entities/usuarios');
const UsuarioModel = require("./../models/usuarios");
const dbConfig = require('../../config/database');

class UsuarioRepositorio {

    async login({ email }) {
        const conn = new Sequelize(dbConfig)
        try {
            UsuarioModel.init(conn)
            const user = await UsuarioModel.findOne({ where: { email } });
            if (!user) return undefined;
            return new UsuarioEntidade({
                id: user.id,
                nome: user.nome,
                email: user.email,
                senha: user.senha,
                permissao: user.permissao,
                created: user.created_at,
                updated: user.updated_at,
            });
        } catch (error) {
            throw new Error(error)
        } finally {
            await conn.close();
        }
        
    }

    async cadastrar({ nome, email, senha, permissao }) {
        const conn = new Sequelize(dbConfig)
        try {
            UsuarioModel.init(conn)
            const user = await UsuarioModel.create({ nome, email, senha, permissao });
            return new UsuarioEntidade({
                id: user.id,
                nome: user.nome,
                email: user.email,
                senha: user.senha,
                permissao: user.permissao,
                created: user.created_at,
                updated: user.updated_at,
            });
        } catch (error) {
            throw new Error(error)
        } finally {
            await conn.close();
        }
        
    }
}

module.exports = UsuarioRepositorio;
