const { DataTypes } = require("sequelize");
const connection = require("../database/connection");
const Usuario = require("./Usuario"); // Certifique-se que está sendo importado após ser exportado

const Local = connection.define(
  "locais",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    nomeLocal: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    descricaoLocal: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    cep: {
      type: DataTypes.STRING(8),
      allowNull: false,
    },
    endereco: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    bairro: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    cidade: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    googleLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      references: {
        model: "usuarios",
        key: "id",
      },
    },
  },
  {
    paranoid: true,
  }
);

// A associação precisa estar definida depois da definição do modelo

module.exports = Local;
