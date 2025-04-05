const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE_NAME, // Nome do banco de dados
  process.env.DATABASE_USER, // Usuário
  process.env.DATABASE_PASSWORD, // Senha
  {
    host: process.env.DATABASE_HOST, // Host (ex.: "database")
    port: process.env.DATABASE_PORT || 5432, // Porta
    dialect: 'postgres', // Tipo de banco
    logging: false, // Configuração de logs (opcional)
  }
);

module.exports = sequelize;
