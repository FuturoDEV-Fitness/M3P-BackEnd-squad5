const Usuario = require("../models/Usuario");
const UsuarioService = require("../services/usuario.service");

class UsuarioController {
  async listar(request, response) {
    try {
      const listaUsuarios = await UsuarioService.listar();
      return response.json(listaUsuarios);
    } catch (error) {
      return response
        .status(500)
        .json({ mensagem: "Não foi possível listar usuários" });
    }
  }

  async listarUm(request, response) {
    try {
      const { id } = request.params;
      const { idAutenticado } = request.usuarioId; // assim é atribuído no login

      const usuarioBuscado = await UsuarioService.listarUm(id, idAutenticado);
      if (!usuarioBuscado) {
        return response
          .status(400)
          .json({ mensagem: "Não foi possível exibir o usuário ou não possui permissão" }); //}
      }
      return response.status(200).json(usuario); //
    } catch (error) {
      return response.status(500).json({ mensagem: "Erro ao exibir usuário" });
    }
  }
  async criar(request, response) {
    try {
      const { body } = request;
      const { usuarioCriado, enderecoCriado } = await UsuarioService.criar(
        body
      );

      if (!usuarioCriado)
        return response
          .status(400)
          .json({ message: "email ou CPF já cadastrados!" });
      // if(!enderecoCriado){}
      return response.status(201).json(usuarioCriado, enderecoCriado);
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json({ mensagem: "Erro ao cadastrar usuário" });
    }
  }

  async atualizar(request, response) {
    try {
      const { id } = request.params;
      const body = request.body;
      const { idAutenticado } = request.usuarioId;
      const usuarioAtualizado = await UsuarioService.atualizar(id, body, idAutenticado);
     
      if (!usuarioAtualizado) {
        return response
          .status(404)
          .json({ mensagem: "Usuário não encontrado ou sem permissão para atualizar" });
      }
      response.status(201).json(usuarioAtualizado);
    } catch (error) {
      return response
        .status(500)
        .json({ mensagem: "Não foi possível atualizar o usuário" });
    }
  }
  async deletar(request, response) {
    try {
      const { id } = request.params;
      const { idAutenticado } = request.usuarioId;

      const apagou = await UsuarioService.deletar(id, idAutenticado);
      if (!apagou) {
        return response
          .status(400)
          .json({ message: "não foi possível excluir o usuário!" });
      }
      return response.status(204).end();
    } catch (error) {
      return response.status(500).json({ mensagem: "Erro ao excluir usuário" });
    }
  }
}

module.exports = new UsuarioController();
