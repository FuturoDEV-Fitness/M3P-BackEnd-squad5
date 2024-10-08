const DashBoardService = require("../services/dashboard.service");

class DashBoardController {
  async obterDadosDashboard(request, response) {
    try {
      const idUsuario = request.usuarioId ? request.usuarioId : null;
      const dadosDashboard = await DashBoardService.obterDados(idUsuario);

      return response.status(200).json(dadosDashboard);
    } catch (error) {
      return response
        .status(500)
        .json({ mensagem: "Não foi possível obter os dados do dashboard" });
    }
  }
}

module.exports = new DashBoardController();
