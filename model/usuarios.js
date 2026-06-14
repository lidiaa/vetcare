const { DataTypes, Model } = require('sequelize');
const sequelize = require('./server.js');

class Usuario extends Model {}

Usuario.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    nome: { type: DataTypes.STRING, allowNull: false },
    usuario: { type: DataTypes.STRING, allowNull: false, unique: true },
    senha_hash: { type: DataTypes.STRING, allowNull: false },
    perfil: {
      type: DataTypes.ENUM('recepcao', 'admin', 'veterinario'),
      allowNull: false,
      defaultValue: 'recepcao'
    }
  },
  {
    sequelize,
    freezeTableName: true,
    createdAt: 'criada_em',
    updatedAt: 'atualizada_em'
  }
);

module.exports = Usuario;