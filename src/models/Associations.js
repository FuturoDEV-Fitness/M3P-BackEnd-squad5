const Usuario = require("./Usuario");
const Local = require("./Local");
const Pratica = require("./Pratica");
const Endereco = require("./Endereco");

Usuario.hasMany(Local, {
  foreignKey: "id_usuario",
  as: "locais",
});
Local.belongsTo(Usuario, {
  foreignKey: "id_usuario",
  as: "usuario",
});

Local.hasMany(Pratica, {
  foreignKey: "id_local",
  as: "praticas",
});
Pratica.belongsTo(Local, {
  foreignKey: "id_local",
  as: "local",
});

Usuario.hasMany(Endereco, {
  foreignKey: "usuarioId",
  as: "enderecos",
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
