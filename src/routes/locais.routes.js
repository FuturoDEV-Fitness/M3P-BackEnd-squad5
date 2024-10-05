const { Router } = require("express");
const LocalController = require("../controllers/LocalController");
const MapController = require("../controllers/MapController");
const auth = require("../middlewares/auth");

const locaisRoutes = new Router();

locaisRoutes.post(
  "/",
  auth,
  LocalController.cadastrarLocal
  /*
#swagger.tags = ['Locais'],
#swagger.description = 'Endpoint para cadastra novo local',
#swagger.parameters['cadastrarLocal']= {
    in: 'body',
    description: 'Detalhes do local a ser cadastrado',
    required: true,
    schema: {
    $nomeLocal: 'Praça do lazer',
    $descricao: 'Área com pista de caminha e quadras poliesportivas',
    $localidade: 'Passeio dos Guararapes',
    $cep: '88000111',
    $praticasPermitidas: 'Caminha, corrida, futebol, basquete'
    }

},
*/
);
// 'cadastrarLocal'
locaisRoutes.get(
  "/",
  LocalController.listarLocais
  /*
    #swagger.tags = ['Locais'],
    #swagger.description = 'Endpoint para listar todos os locais cadastrados',
    #swagger.responses[200] = {
        description: 'Lista de todos os locais cadastrados',
        schema: {
            type: 'array',
            items: {
                $nomeLocal: 'Praça do lazer',
                $descricao: 'Área com pista de caminha e quadras poliesportivas',
                $localidade: 'Passeio dos Guararapes',
                $cep: '88000111',
                $praticasPermitidas: 'Caminha, corrida, futebol, basquete'
            }
        }
    }
    */
);
// 'listarTodos'
locaisRoutes.get(
  "/:id",
  auth,
  LocalController.listarUmLocal
  /*
    #swagger.tags = ['Locais'],
    #swagger.description = 'Endpoint para mostrar um local específico',
    #swagger.parameters['local_id']= {
      in: 'path',
        description: 'ID do local buscado',
        required: true,
        schema: {
            type: 'integer'           
        }
    }

    */
);
// 'listarEspecífico
locaisRoutes.delete(
  "/:local_id",
  auth,
  LocalController.deletarLocal
  /*
    #swagger.tags = ['Locais'],
    #swagger.description = 'Endpoint para deletar um local específico',
    #swagger.parameters['local_id']= {
      in: 'path',
        description: 'ID do local a ser deletado',
        required: true,
        schema: {
            type: 'integer'
        }
    }

    */
);
//'deletarEspecífico'
locaisRoutes.put(
  "/:id",
  auth,
  LocalController.atualizarLocal
  /*
    #swagger.tags = ['Locais']
    #swagger.description = 'Endpoint para atualizar um local específico baseado no ID fornecido.'
    #swagger.parameters['local_id'] = {
        in: 'path',
        description: 'ID do local a ser atualizado.',
        required: true,
        schema: {
            type: 'integer'
        }
    }
    #swagger.parameters['atualizarLocal'] = {
        in: 'body',
        description: 'Detalhes a serem atualizados do local',
        required: true,
        schema: {
            $nomeLocal: 'Praça do lazer',
            $descricao: 'Área com pista de caminhada e quadras poliesportivas',
            $localidade: 'Passeio dos Guararapes',
            $cep: '88000111',
            $praticasPermitidas: 'Caminhada, corrida, futebol, basquete'
        }
    }
    */
);
//'atualizar'

locaisRoutes.get(
  "/maps/:local_id",
  auth,
  MapController.listarLinK

  /*
    #swagger.tags = ['Link'],
    #swagger.description = 'Endpoint para gerar link do Google Maps',
    #swagger.parameters['local_id']= {
      in: 'path',
        description: 'ID do local buscado',
        required: true,
        schema: {
            type: 'integer'           
        }
    }

    */
);
//'obterLink'

module.exports = locaisRoutes;
