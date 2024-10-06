const Usuario = require('./Usuario');
const Local = require('./Local');
const Endereco = require('./Local');
const Pratica = require('./Pratica')


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

Local.hasMany(Pratica, {
  foreignKey: "id_local",
  as: "praticas",
});
Pratica.belongsTo(Local, {
  foreignKey: "id_local",
  as: "local",
});


Endereco.belongsTo(Usuario, {
  foreignKey: "usuarioId",
  as: "usuario",
});

module.exports = {
  Usuario,
  Local,
  Pratica,
  Endereco,
};
