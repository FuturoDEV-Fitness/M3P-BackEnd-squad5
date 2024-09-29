const Usuario = require("../models/Usuario");
const Local = require("../models/Local");
const LocalServices = require("../services/Local.services");

class LocalController {
  async cadastrarLocal(request, response) {
    try {
      const dados = request.body;
      const idAutenticado = request.usuarioId;

      const {localCriado, praticasCriadas} = await LocalServices.cadastrarLocal(
        dados,
        idAutenticado
      );
      if (!localCriado) {
        return response.status(400).json({ mensagem: "Erro ao criar local" });
      }
      
      return response.status(201).json({localCriado, praticasCriadas});
    } catch (error) {
      return response
        .status(500)
        .json({ mensagem: "erro ao cadastrar do local" });
    }
  }

  async listarLocais(request, response) {
    try {
      const locaisGeral = await LocalServices.listarLocais();
      if (!locaisGeral)
        return response
          .status(404)
          .json({ mensagem: "Não foram encontrados usuários" });
      return response.status(200).json(locaisGeral);
    } catch (error) {
      return response.status(500).json({ mensagem: "erro ao listar locais" });
    }
  }

  async listarUmLocal(request, response) {
    try {
      const { local_id } = request.params;
      const { idAutenticado } = request.usuarioId;
      const local = await LocalServices.listarUm(local_id, idAutenticado);

      if (!local) {
        return response.status(404).json({
          mensagem: "Local não encontrado para este ID ou não autorizado",
        });
      }
      return response.status(200).json(local);
    } catch (error) {
      return response
        .status(500)
        .json({ mensagem: "erro ao exibir o local específico" });
    }
  }

  async deletarLocal(request, response) {
    try {
      const { local_id } = request.params;
      const { idAutenticado } = request.usuarioId;
      const localDeletado = await LocalServices.deletarLocal(
        local_id,
        idAutenticado
      );

      if (!localDeletado) {
        return response.status(404).json({
          mensagem: "Local não encontrado para este ID ou permissão negada",
        });
      }
      return response.status(204).json();
    } catch (error) {
      response.status(500).json({ mensagem: "Erro ao excluir o local!" });
    }
  }

  async atualizarLocal(request, response) {
    try {
      const { local_id } = request.params;
      const { idAutenticado } = request.params;
      const dados = request.body;

      const { localEncontrado, localAtualizado } =
        await LocalServices.atualizarLocal(dados, local_id, idAutenticado);
      if (!localEncontrado) {
        return response
          .status(404)
          .json({ mensagem: "local não encontrado ou sem permissão" });
      }
      response.status(201).json({ localEncontrado, localAtualizado });
    } catch (error) {
      response.status(500).json({ mensagem: "Erro ao atualizar o local!" });
    }
  }
}

module.exports = new LocalController();
