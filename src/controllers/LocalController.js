const LocalServices = require("../services/Local.services");

class LocalController {
  async cadastrarLocal(request, response) {
    try {
      const dados = request.body;
      const usuarioId = request.usuarioId;

      const { data } = await LocalServices.cadastrarLocal(dados, usuarioId);
      if (!data) {
        return response.status(400).json({ mensagem: "Erro ao criar local" });
      }

      return response.status(201).json();
    } catch (error) {
      return response
        .status(500)
        .json({ mensagem: "erro ao cadastrar do local " + error });
    }
  }

  async listarLocais(request, response) {
    try {
      const locaisGeral = await LocalServices.listarLocais();
      console.log("Batata");
      console.log(locaisGeral);

      if (!locaisGeral.length) {
        return response
          .status(404)
          .json({ mensagem: "Não foram encontrados locais" });
      }
      return response.status(200).json(locaisGeral);
    } catch (error) {
      return response.status(500).json(error);
    }
  }

  async listarUmLocal(request, response) {
    try {
      const { id } = request.params;
      const { usuarioId } = request;
      const local = await LocalServices.listarUmLocal(id, usuarioId);

      if (!local) {
        return response.status(404).json({
          mensagem: "Local não encontrado para este ID ou não autorizado",
        });
      }
      return response.status(200).json(local);
    } catch (error) {
      return response
        .status(500)
        .json({ mensagem: "erro ao exibir o local específico" + error });
    }
  }

  async deletarLocal(request, response) {
    try {
      const { local_id } = request.params;
      const { usuarioId } = request;
      const localDeletado = await LocalServices.deletarLocal(
        local_id,
        usuarioId
      );

      if (!localDeletado) {
        return response.status(404).json({
          mensagem: "Local não encontrado para este ID ou permissão negada",
        });
      }
      return response.status(204).json();
    } catch (error) {
      response
        .status(500)
        .json({ mensagem: "Erro ao excluir o local!" + error });
    }
  }

  async atualizarLocal(request, response) {
    try {
      const { id } = request.params;
      const { usuarioId } = request;
      const dados = request.body;

      const { localAtualizado } = await LocalServices.atualizarLocal(
        dados,
        id,
        usuarioId
      );
      if (!localAtualizado) {
        return response
          .status(404)
          .json({ mensagem: "local não encontrado ou sem permissão" });
      }
      response.status(201).json();
    } catch (error) {
      response
        .status(500)
        .json({ mensagem: "Erro ao atualizar o local!" + error });
    }
  }
}

module.exports = new LocalController();
