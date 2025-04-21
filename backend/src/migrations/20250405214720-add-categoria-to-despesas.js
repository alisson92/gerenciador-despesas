'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('despesas', 'categoria', {
      type: Sequelize.STRING,    // Tipo do campo
      allowNull: false,          // Não permite valores nulos
      defaultValue: 'outros'     // Valor padrão padronizado (slug minúsculo)
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('despesas', 'categoria');
  },
};
