const Local = require("../models/Local");
const Usuario = require("../models/Usuario");
const { Op } = require("sequelize");

class DashBoardService {
  async listarUsuarios() {
    const listaUsuarios = await Usuario.findAll({
      attributes: ["id", "nome", "email", "sexo"],
    });

    const totalUsuarios = await Usuario.count();
    const totalHomens = await Usuario.count({ where: { sexo: "masculino" } });
    const totalMulheres = await Usuario.count({ where: { sexo: "feminino" } });
    const totalOutros = await Usuario.count({
      where: {
        sexo: {
          [Op.notIn]: ["masculino", "feminino"],
        },
      },
    });

    return {
      listaUsuarios,
      totalUsuarios,
      totalHomens,
      totalMulheres,
      totalOutros,
    };
  }
  async listarUmUsuario(id, idAutenticado) {
    const usuarioBuscado = await Usuario.findOne(idAutenticado, {
      //ou findByPk(id)
      attributes: ["id", "nome", "email", "sexo"],
    });
    if (!usuarioBuscado) return null;
    if (usuarioBuscado.id !== idAutenticado) return null;

    return usuarioBuscado;
  }

  async listarLocais() {
    const listaLocais = await Local.findAll({
      attributes: [
        "id",
        "nomeLocal",
        "descricao",
        "praticasPermitidas",
        "latitude",
        "longitude",
      ],
    });

    const totalLocais = await Usuario.count();
    return { listaLocais, totalLocais };
  }
  async listarLocaisUsuario(idAutenticado) {
    const locaisIndividuais = await Local.findAll({
        /*where: { id_usuario: idAutenticado},*/ //<--melhor assim?
      include: [
        {
          model: Usuario,
          where: {
            id: idAutenticado, //id_usuario
          },
        },
      ],
    });
    if(!locaisIndividuais) return null
    const totalLocaisIndividual = await Local.count({
        where: {
          id_usuario: idAutenticado, 
        },
      });
    return {locaisIndividuais, totalLocaisIndividual }
  }
}

module.exports = new DashBoardService();
