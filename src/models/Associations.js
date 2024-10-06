const Usuario = require('./Usuario');
const Local = require('./Local');
const Endereco = require('./Local');


Usuario.hasMany(Local, {
  foreignKey: 'id_usuario'
   
});

Local.belongsTo(Usuario, {
  foreignKey: 'id_usuario'
   
});

Endereco.belongsTo(Usuario, {
  foreignKey: "id_usuario",
  as: "usuario",
});

Usuario.hasOne(Endereco, {
  foreignKey: 'id_usuario'
   
});

module.exports = { Usuario, Local }; 