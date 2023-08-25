const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(conn) {
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                },
                nome: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                permissao: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                senha: {
                    type: DataTypes.STRING,
                    allowNull: false,
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

module.exports = User;
