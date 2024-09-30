const { where } = require("sequelize");
const Local = require("../models/Local");
const Usuario = require("../models/Usuario");

class LocalServices {
  async listarLocais() {
    const locaisGeral = await Local.findAll({
      attributes: ["nomeLocal", "descricao", "cep", "latitude", "longitude"],
      include: [{ model: Praticas, attributes: ["nome"] }],
    });
    return locaisGeral;
  }
  async listarUmLocal(local_id, idAutenticado) {
    const local = await Local.findByPk(local_id, {
      include: [{ model: Praticas, attributes: ["nome"] }],
    });
    if (!local || local.id_usuario !== idAutenticado) {
      return null;
    }
    return local;
  }

  async cadastrarLocal(dados, idAutenticado) {
    if (!idAutenticado) {
      throw new Error("Ação não permitida: usuário não autenticado.");
    }
    const { praticasPermitidas, ...dadosLocal } = dados;

    const localNovo = await Local.create({
      ...dadosLocal,
      id_usuario: idAutenticado,
    });
    // if (praticasPermitidas && praticasPermitidas.length > 0) ???
    const praticasCriadas = await praticasPermitidas.map((pratica) =>
      Praticas.create({ nome: pratica, id_local: localNovo.id })
    );
    /*SE MAP DER PROBLEMAS COM PROMISES:  
    for (const pratica of praticasEsportivas){
        await Praticas.create({nome: pratica, id_local: local.id});}*/

    return { localNovo, praticasCriadas };
  }

  async atualizarLocal(dados, local_id, idAutenticado) {
    const localEncontrado = await Local.findByPk(local_id);

    if (!localEncontrado || localEncontrado.id_usuario !== idAutenticado) {
      return null;
    }

    const { praticasPermitidas, ...dadosAtualizados } = dados;

    // Atualizando os dados do local
    localEncontrado.nomeLocal = dadosAtualizados.nomeLocal;
    localEncontrado.descricao = dadosAtualizados.descricao;
    localEncontrado.cep = dadosAtualizados.cep;
    localEncontrado.latitude = dadosAtualizados.latitude;
    localEncontrado.longitude = dadosAtualizados.longitude;

    await localEncontrado.save();

    // Gerenciar as práticas (remover antigas e adicionar novas)
    if (praticasPermitidas && praticasPermitidas.length > 0) {
      // Remover práticas que não estão mais associadas ao local
      await Praticas.destroy({
        where: {
          id_local: local_id,
          nome: { [Op.notIn]: praticasPermitidas },
        },
      });

      // Criar ou manter as práticas associadas ao local
      for (const pratica of praticasPermitidas) {
        await Praticas.findOrCreate({
          where: { nome: pratica, id_local: local_id },
        });
      }
    }

    const localAtualizado = await Local.findByPk(local_id, {
      include: [{ model: Praticas, attributes: ["nome"] }],
    });

    return { localEncontrado, localAtualizado };
  }

  async deletarLocal(local_id, idAutenticado) {
    const localUsuario = await Local.findByPk(local_id);

    if (!localUsuario || localUsuario.id_usuario !== idAutenticado) {
      return null;
    }

    await localUsuario.destroy();
    return true;
  }
}

module.exports = new LocalServices();
