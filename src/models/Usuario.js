const { DataTypes } = require("sequelize");
const connection = require("../database/connection");
const { hashSync } = require("bcryptjs");
const Local = require("./Local");

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
      type: DataTypes.ENUM("masculino", "feminino", "outro"),
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
  }
);

Usuario.beforeSave((usuario) => {
  if (usuario.senha) {
    usuario.senha = hashSync(usuario.senha, 10);
  }
  return usuario;
});

Usuario.hasMany(Local, {
  foreignKey: "usuarioId",
  as: "locais",
});

module.exports = Usuario;
