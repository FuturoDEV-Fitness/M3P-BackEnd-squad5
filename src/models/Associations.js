const Usuario = require('./Usuario');
const Local = require('./Local');


Usuario.hasMany(Local, {
  foreignKey: 'idUsuario'
   
});

Local.belongsTo(Usuario, {
  foreignKey: 'idUsuario'
   
});

module.exports = { Usuario, Local }; 