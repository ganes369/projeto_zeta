/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.createTable('livros', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            titulo: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            autor: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            generos: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            status: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    isIn: [['livre', 'ocupado']], // Valores permitidos
                },
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down(queryInterface, Sequelize) {
        return queryInterface.dropTable('livros');
    },
};
