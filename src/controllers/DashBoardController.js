const DashBoardService = require("../services/dashboard.service");

class DashBoardController {


async listarUsuarios(request, response) {
    try {
      const listaUsuarios = await DashBoardService.listarUsuarios();
      return response.json(listaUsuarios);
    } catch (error) {
      return response
        .status(500)
        .json({ mensagem: "Não foi possível listar usuários" });
    }
  }

  async listarUmUsuario(request, response) {
    try {
      const { id } = request.params;
      const { idAutenticado } = request.usuarioId;

      const usuarioBuscado = await DashBoardService.listarUmUsuario(id, idAutenticado);
      if (!usuarioBuscado) {
        return response
          .status(400)
          .json({ mensagem: "Não foi possível exibir o usuário ou não possui permissão" }); //}
      }
      return response.status(200).json(usuarioBuscado); //
    } catch (error) {
      return response.status(500).json({ mensagem: "Erro ao exibir usuário" });
    }
}
}

  module.exports = DashBoardController()