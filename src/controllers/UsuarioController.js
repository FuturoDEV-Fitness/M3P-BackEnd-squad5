const UsuarioService = require("../services/usuario.service");

class UsuarioController {
  async listar(request, response) {
    try {
      const listaUsuarios = await UsuarioService.listar();
      return response.json(listaUsuarios);
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ mensagem: "Não foi possível listar usuários" });
    }
  }

  async listarUm(request, response) {
    try {
      const { id } = request.params;
      const { usuarioId } = request;

      console.log("ID do usuário buscado:", id);
      console.log("ID do usuário autenticado:", usuarioId);

      const usuarioBuscado = await UsuarioService.listarUm(id, usuarioId);
      if (!usuarioBuscado) {
        return response.status(400).json({
          success: false,
          error: "Usuário não encontrado ou sem permissão",
        });
      }
      return response.status(200).json(usuarioBuscado);
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ mensagem: "Erro ao exibir usuário", error: error.message });
    }
  }

  async criar(request, response) {
    try {
      const { body } = request;
      const usuarioCriado = await UsuarioService.criar(body);

      if (!usuarioCriado) {
        return response.status(400).json("Email ou CPF já cadastrados!");
      }

      return response.status(201).json();
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ mensagem: "Erro ao cadastrar usuário" });
    }
  }

  async atualizar(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;
      const { usuarioId } = request;
      const usuarioAtualizado = await UsuarioService.atualizar(
        id,
        body,
        usuarioId
      );

      if (!usuarioAtualizado) {
        return response.status(404).json({
          mensagem: "Usuário não encontrado ou sem permissão para atualizar",
        });
      }

      return response.status(201).json();
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ mensagem: "Não foi possível atualizar o usuário" + error });
    }
  }

  async deletar(request, response) {
    try {
      const { id } = request.params;
      const { usuarioId } = request;

      const apagou = await UsuarioService.deletar(id, usuarioId);
      if (!apagou) {
        return response
          .status(400)
          .json({ message: "não foi possível excluir o usuário!" });
      }

      return response.status(204).end();
    } catch (error) {
      console.error(error);

      return response
        .status(500)
        .json({ mensagem: "Erro ao excluir usuário" + error });
    }
  }
}

module.exports = new UsuarioController();
