const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Despesa = sequelize.define('Despesa', {
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Outros', // Valor padrão
  },
}, {
  tableName: 'despesas', // Especifica explicitamente o nome correto da tabela
  timestamps: true, // Mantém createdAt e updatedAt
});

module.exports = Despesa;
