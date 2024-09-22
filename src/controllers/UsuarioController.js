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

  async criar(request, response) {
    try {
      const { body } = request;
      const usuario = await UsuarioService.criar(body);
      if (!usuario)
        return response
          .status(400)
          .json({ message: "email ou CPF já cadastrados!" });

      return response.status(201).json(usuario);
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
      const usuarioAtualizado = await UsuarioService.atualizar(id, body);
      if (usuarioAtualizado.id !== request.usuarioId) {
        return response.status(401).json({
          mensagem: "Você não possui permissão para atualizar o usuário",
        });
      }
      if (!usuarioAtualizado) {
        return response
          .status(404)
          .json({ mensagem: "Usuário não encontrado para o ID fornecido" });
      } 
      response.status(201).json({
        Nome: usuarioAtualizado.nome,
        Email: usuarioAtualizado.email,
        Sexo: usuarioAtualizado.sexo,
        CPF: usuarioAtualizado.cpf,
        Endereço: usuarioAtualizado.endereco,
      });
    } catch (error) {
      return response
        .status(500)
        .json({ mensagem: "Não foi possível atualizar o usuário" });
    }
  }
  async deletar(request, response) {
    try {
      const { id } = request.params;

      const apagou = await UsuarioService.deletar(id);
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