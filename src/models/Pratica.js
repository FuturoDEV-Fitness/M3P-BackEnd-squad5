const { DataTypes } = require("sequelize");
const connection = require("../database/connection");
const Local = require("./Local");

const Pratica = connection.define(
  "praticas",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    nome: {
      type: DataTypes.ARRAY(DataTypes.STRING), 
      allowNull: false,
    },
    id_local: {
      type: DataTypes.INTEGER,
      references: {
        model: "locais", 
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      allowNull: false,
    },
  },
  {
    paranoid: true, 
  }
);

Pratica.belongsTo(Local, {
  foreignKey: "id_local",
  as: "local",
});

module.exports = Pratica;