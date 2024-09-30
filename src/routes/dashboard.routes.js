const { Router } = require("express");
const DashBoardController = require("../controllers/DashBoardController");
const auth = require("../middlewares/auth");

const dashboardRoutes = new Router();

dashboardRoutes.get(
  "/",
  DashBoardController.obterDadosDashboard
  /*
    #swagger.tags = ['Dashboard']
    #swagger.description = 'Endpoint para obter dados do Dashboard. Retorna o número total de usuários e locais.'
    #swagger.responses[200] = {
        description: 'Dados do dashboard retornados com sucesso',
        schema: {
            usuarios: 100,
            locais: 50,
            locaisUsuario: 0
        }
    }
    #swagger.responses[500] = {
        description: 'Erro ao obter dados do dashboard'
    }
  */
);

dashboardRoutes.get(
  "/logged",
  auth,
  DashBoardController.obterDadosDashboard
  /*
    #swagger.tags = ['Dashboard']
    #swagger.description = 'Endpoint para obter dados do Dashboard com base no usuário logado. Retorna o número total de usuários, locais, e o número de locais criados pelo usuário autenticado.'
    #swagger.security = [{
      "Bearer": []
    }]
    #swagger.responses[200] = {
        description: 'Dados do dashboard para o usuário logado retornados com sucesso',
        schema: {
            usuarios: 100,
            locais: 50,
            locaisUsuario: 5 
        }
    }
    #swagger.responses[400] = {
        description: 'Usuário não autenticado ou nenhum local encontrado para o usuário'
    }
    #swagger.responses[500] = {
        description: 'Erro ao obter dados do dashboard'
    }
  */
);

module.exports = dashboardRoutes;
