const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT || 5432,
    dialect: 'postgres',
    logging: false,
    timezone: '-03:00', // Brasília, SP (horário de Sao_Paulo)
    dialectOptions: {
      useUTC: false,
      dateStrings: true,
      typeCast: true
    }
  }
);

module.exports = sequelize;
