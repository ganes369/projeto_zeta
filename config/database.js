require('dotenv').config(); 
module.exports = {
    dialect: process.env.DIALECT,
    host: process.env.HOST,
    username: process.env.USERNAMEDB,//'postgres',
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    define: {
        timestamps: true,
        underscored: true,
    },
    logging: false, // Desativa o logging das consultas

};
