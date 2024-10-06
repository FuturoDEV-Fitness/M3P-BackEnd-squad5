const { DataTypes } = require("sequelize");
const connection = require("../database/connection");
const Encryption = require("../utils/Encryption");

const Usuario = connection.define(
  "usuarios",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    sexo: {
      type: DataTypes.ENUM("Masculino", "Feminino", "Outro"),
      allowNull: true,
    },
    cpf: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dataNascimento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    paranoid: true,
    hooks: {
      beforeCreate: async (usuario) => {
        if (usuario.senha) {
          usuario.senha = await Encryption.encrypt(usuario.senha);
        }
      },
      beforeUpdate: async (usuario) => {
        if (usuario.senha) {
          usuario.senha = await Encryption.encrypt(usuario.senha);
        }
      },
    },
  }
);

module.exports = Usuario;
