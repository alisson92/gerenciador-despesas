module.exports = (sequelize, DataTypes) => {
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
      defaultValue: 'Outros',
    },
    userId: { // <<== Adicionado para associar à tabela de usuários
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    tableName: 'despesas',
    timestamps: true,
  });

  // Associação: cada despesa pertence a um usuário
  Despesa.associate = function(models) {
    Despesa.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Despesa;
};
