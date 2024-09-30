class DashboardController {

    static async getOverview(req, res) {
      try {
        const overviewData = await DashboardService.getOverviewData();
        res.status(200).json(overviewData);
      } catch (error) {
        res.status(500).json({ message: 'Erro ao obter visão geral do dashboard', error });
      }
    }
  
    static async getUsersStatistics(req, res) {
      try {
        const usersStatistics = await DashboardService.getUsersStatistics();
        res.status(200).json(usersStatistics);
      } catch (error) {
        res.status(500).json({ message: 'Erro ao obter estatísticas de usuários', error });
      }
    }
  
    static async getActivityLogs(req, res) {
      try {
        const activityLogs = await DashboardService.getActivityLogs();
        res.status(200).json(activityLogs);
      } catch (error) {
        res.status(500).json({ message: 'Erro ao obter logs de atividade', error });
      }
    }
  }
  
  module.exports = DashboardController;
  