const { DataTypes, Model } = require('sequelize');
const sequelize = require('./server.js');

class Pet extends Model {}

Pet.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    nome: { type: DataTypes.STRING, allowNull: false },
    especie: { type: DataTypes.STRING, allowNull: false }
  },
  {
    sequelize,
    freezeTableName: true,
    createdAt: 'criada_em',
    updatedAt: 'atualizada_em'
  }
);

class Atendimento extends Model {}

Atendimento.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    data_hora: { type: DataTypes.DATE, allowNull: false },
    motivo: { type: DataTypes.TEXT, allowNull: false },
    status: {
      type: DataTypes.ENUM('agendado', 'em_atendimento', 'finalizado', 'cancelado'),
      allowNull: false,
      defaultValue: 'agendado'
    },
    pet_id: { type: DataTypes.INTEGER, allowNull: false },
    usuario_id: { type: DataTypes.INTEGER, allowNull: false }
  },
  {
    sequelize,
    freezeTableName: true,
    createdAt: 'criada_em',
    updatedAt: 'atualizada_em'
  }
);

const Usuario = require('./usuarios');

Usuario.hasMany(Atendimento, { foreignKey: 'usuario_id' });
Pet.hasMany(Atendimento, { foreignKey: 'pet_id' });

Atendimento.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Atendimento.belongsTo(Pet, { foreignKey: 'pet_id' });

/*
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Modelos sincronizados com o banco de dados.');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar modelos com o banco de dados:', error);
  });
*/

module.exports = { Pet, Atendimento, Usuario };