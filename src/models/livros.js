const { Model, DataTypes } = require('sequelize');

class Livro extends Model {
    static init(conn) {
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                },
                titulo: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                autor: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                generos: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                status: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        isIn: [['livre', 'ocupado']], // Valores permitidos
                    },
                },
                created_at: {
                    type: DataTypes.DATE,
                },
                updated_at: {
                    type: DataTypes.DATE,
                },
            },
            { sequelize: conn }
        );
    }
}

module.exports = Livro;
