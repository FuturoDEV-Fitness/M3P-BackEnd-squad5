const { where } = require("sequelize");
const Local = require("../models/Local");
const Usuario = require("../models/Usuario");
const Pratica = require("../models/Pratica");

class LocalServices {
  async listarLocais() {
    const locaisGeral = await Local.findAll({
      attributes: ["nomeLocal", "descricao", "cep", "latitude", "longitude"],
      include: [{ model: Pratica, attributes: ["nome"] }],
    });
    return locaisGeral;
  }
  async listarUmLocal(local_id, idAutenticado) {
    const local = await Local.findByPk(local_id, {
      include: [{ model: Pratica, attributes: ["nome"] }],
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
    const {
      nomeLocal,
      descricaoLocal,
      cep,
      endereco,
      bairro,
      cidade,
      estado,
      latitude,
      longitude,
      praticasEsportivas,
    } = dados;

    const localNovo = await Local.create({
      nomeLocal,
      descricaoLocal,
      cep,
      endereco,
      bairro,
      cidade,
      estado,
      latitude,
      longitude,
      id_usuario: idAutenticado,
    });
    // if (praticasEsportivas && praticasEsportivas.length > 0) ???
    const praticasCriadas = await praticasEsportivas.map((pratica) =>
      Pratica.create({ nome: pratica, id_local: localNovo.id })
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

    const { praticasEsportivas, ...dadosAtualizados } = dados;

    // Atualizando os dados do local
    localEncontrado.nomeLocal = dadosAtualizados.nomeLocal;
    localEncontrado.descricaoLocal = dadosAtualizados.descricaoLocal;
    localEncontrado.cep = dadosAtualizados.cep;
    localEncontrado.endereco = dadosAtualizados.endereco;
    localEncontrado.bairro = dadosAtualizados.bairro;
    localEncontrado.cidade = dadosAtualizados.cidade;
    localEncontrado.estado = dadosAtualizados.estado;
    localEncontrado.latitude = dadosAtualizados.latitude;
    localEncontrado.longitude = dadosAtualizados.longitude;

    await localEncontrado.save();

    // Gerenciar as práticas (remover antigas e adicionar novas)
    if (praticasEsportivas && praticasEsportivas.length > 0) {
      // Remover práticas que não estão mais associadas ao local
      await Pratica.destroy({
        where: {
          id_local: local_id,
          nome: { [Op.notIn]: praticasEsportivas },
        },
      });

      // Criar ou manter as práticas associadas ao local
      for (const pratica of praticasEsportivas) {
        await Pratica.findOrCreate({
          where: { nome: pratica, id_local: local_id },
        });
      }
    }

    const localAtualizado = await Local.findByPk(local_id, {
      include: [{ model: Pratica, attributes: ["nome"] }],
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
