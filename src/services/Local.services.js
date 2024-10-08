const { where } = require("sequelize");
const Local = require("../models/Local");
const Usuario = require("../models/Usuario");
const Pratica = require("../models/Pratica");
const { getGoogleMapsLink } = require("../utils/GoogleLink");

class LocalServices {
  async listarLocais() {
    const locaisGeral = await Local.findAll({
      include: [
        {
          model: Pratica,
          as: "praticas",
        },
      ],
    });
    return locaisGeral;
  }
  async listarUmLocal(local_id, idAutenticado) {
    const local = await Local.findByPk(local_id, {
      include: [{ model: Pratica, as: "praticas" }],
    });
    if (!local || local.id_usuario !== idAutenticado) {
      return null;
    }
    return local;
  }

  async cadastrarLocal(dados, idAutenticado) {
    try {
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

      const link = await getGoogleMapsLink(latitude, longitude);

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
        googleLink: link,
      });
      const praticasCriadas = await Pratica.create({
        nome: praticasEsportivas,
        id_local: localNovo.id,
      });
      const data = await [localNovo, praticasCriadas];
      return { data };
    } catch (error) {
      console.error("Erro ao criar local:", error);
      response
        .status(400)
        .json({ mensagem: "Erro ao criar local", detalhes: error.message });
    }
  }
  async atualizarLocal(dados, local_id, idAutenticado) {
    try {
      const localEncontrado = await Local.findByPk(local_id, {
        include: [{ model: Pratica, as: "praticas" }],
      });

      if (!localEncontrado || localEncontrado.id_usuario !== idAutenticado) {
        throw new Error("Local não encontrado ou usuário não autorizado.");
      }

      const { praticasEsportivas, latitude, longitude, ...dadosAtualizados } =
        dados;

      const newLink = await getGoogleMapsLink(latitude, longitude);
      dadosAtualizados.googleLink = newLink;

      await localEncontrado.update(dadosAtualizados);

      await Pratica.update(
        {
          nome: praticasEsportivas,
        },
        {
          where: {
            id_local: local_id,
          },
        }
      );
      const localAtualizado = await Local.findByPk(local_id, {
        include: [{ model: Pratica, as: "praticas" }],
      });

      return { localAtualizado };
    } catch (error) {
      console.error("Erro ao atualizar local:", error);
      throw new Error("Erro ao atualizar local: " + error.message);
    }
  }
  async deletarLocal(local_id, idAutenticado) {
    const localUsuario = await Local.findByPk(local_id, {
      include: [{ model: Pratica, as: "praticas" }],
    });

    if (!localUsuario || localUsuario.id_usuario !== idAutenticado) {
      return null;
    }

    if (localUsuario.praticas.length > 0) {
      await Pratica.destroy({
        where: { id: localUsuario.praticas[0].id },
      });
    }

    await localUsuario.destroy();
    return true;
  }
}

module.exports = new LocalServices();
