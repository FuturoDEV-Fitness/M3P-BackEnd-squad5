const { DataTypes } = require("sequelize");
const connection = require("../database/connection");
const Usuario = require("./Usuario");
const { obterLocal, obterLink } = require('../services/geoFinder')


const Local = connection.define(
  "locais",
  {
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
    praticasEsportivas:{
      type: Sequelize.STRING,
      allowNull: false
    }, 
    id_usuario: {
      allowNull: true,
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

// Local.belongsTo(Usuario...) --> Associations.js

Local.beforeCreate(async (local) => {
  const { lat, lng } = await obterLocal(local.cep)
  local.latitude = lat;
  local.longitude = lng;
})

Local.beforeUpdate(async (local) => {
  console.log('beforeUpdate tá sendo chamado?');
    const { lat, lng } = await obterLocal(local.cep);
    console.log(`Lat: ${lat}, Lng: ${lng}`);
    local.latitude = lat;
    local.longitude = lng;
  
});
module.exports = Local;
