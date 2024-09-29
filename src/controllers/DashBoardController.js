const DashBoardService = require("../services/dashboard.service");

class DashBoardController {
  async listarUsuarios(request, response) {
    try {
      const listaUsuarios = await DashBoardService.listarUsuarios();
      return response.status(200).json(listaUsuarios);
      //listarUmUsuario aqui dentro ou fora?

      /*const { idAutenticado } = request.usuarioId;
      let usuarioLogado = null;
      if (idAutenticado) {
        usuarioLogado = await DashBoardService.listarUmUsuario(idAutenticado);
      }
      return response.status(200).json({ listaUsuarios, usuarioLogado })*/
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
      const usuarioBuscado = await DashBoardService.listarUmUsuario(
        id,
        idAutenticado
      );
      if (!usuarioBuscado) {
        return response.status(400).json({
          mensagem: "Não foi possível exibir o usuário ou não está logado",
        });
      }
      return response.status(200).json(usuarioBuscado); //
    } catch (error) {
      return response.status(500).json({ mensagem: "Erro ao exibir usuário" });
    }
  }

  async listarLocais(request, response) {
    try {
      const { listaLocais, totalLocais } =
        await DashBoardService.listarLocais();
      //mesma lógica de exibir usuarios + usuario logado???
      return response.status(200).json(listaLocais, totalLocais);
    } catch (error) {
      return response.status(500).json({ mensagem: "Erro ao exibir locais" });
    }
  }
  async listarLocaisUsuario(request, response) {
    try {
      const { idAutenticado } = request.usuarioId;
      const { locaisIndividuais, totalLocaisIndividual } =
        await DashBoardService.listarLocaisUsuario(idAutenticado);
      if (!locaisIndividuais) {
        return response.status(400).json({
          mensagem: "Não foi possível exibir locais ou não está logado",
        });
      }
      return response
        .status(200)
        .json(locaisIndividuais, totalLocaisIndividual);
    } catch (error) {
      return response
        .status(500)
        .json({ mensagem: "Erro ao listar locais do usuário" });
    }
  }
}

module.exports = new DashBoardController();
