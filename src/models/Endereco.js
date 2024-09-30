const { DataTypes } = require("sequelize");
const connection = require("../database/connection");
const Usuario = require("./Usuario");

const Endereco = connection.define("enderecos", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  logradouro: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  numero: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bairro: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  cidade: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  cep: {
    type: DataTypes.STRING(9),
    allowNull: false,
  },
  complemento: {
    type: DataTypes.STRING(150),
    allowNull: true,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    references: {
      model: "usuarios",
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
});

Endereco.belongsTo(Usuario, {
  foreignKey: "usuarioId",
  as: "usuario",
});

module.exports = Endereco;
