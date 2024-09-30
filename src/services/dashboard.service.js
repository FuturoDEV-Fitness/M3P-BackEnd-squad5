const Local = require("../models/Local");
const Usuario = require("../models/Usuario");
const { Op } = require("sequelize");

class DashBoardService {
  async obterDados(idUsuario) {
    try {
      const totalUsuarios = await Usuario.count();

      const totalLocais = await Local.count();

      let locaisUsuario;
      if (idUsuario) {
        const locaisUserId = await Local.findAll({
          where: { id_usuario: idUsuario },
          attributes: ["nomeLocal"],
        });
        locaisUsuario = locaisUserId.length;
      }

      return {
        usuarios: totalUsuarios,
        locais: totalLocais,
        locaisUsuario: locaisUsuario,
      };
    } catch (error) {
      throw new Error("Erro ao obter os dados do Dashboard: " + error.message);
    }
  }
}

module.exports = new DashBoardService();
