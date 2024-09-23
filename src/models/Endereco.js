const { DataTypes } = require("sequelize");
const connection = require("../database/connection");

const Endereco = connection.define("enderecos", {
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
    allowNull: false,
  },
  usuarioId: {
    //allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: "usuarios",
      key: "id",
    },
  },
});

module.exports = Endereco;
