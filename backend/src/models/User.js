// backend/src/models/User.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    tableName: 'users', // <<< Adicione esta linha!
    timestamps: true,
  });

  // Caso precise declarar associações futuras:
  User.associate = function(models) {
    // Exemplo: User.hasMany(models.Despesa);
  };

  return User;
};
