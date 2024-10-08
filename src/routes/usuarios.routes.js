const { Router } = require("express");
const UsuarioController = require("../controllers/UsuarioController");
const auth = require("../middlewares/auth");
const validateCreateUser = require("../middlewares/yup/createUserValidate");
const validateUpdateUser = require("../middlewares/yup/updateUserValidate");

const usuariosRoutes = new Router();

usuariosRoutes.get(
  "/",
  UsuarioController.listar
  /*
  #swagger.tags = ['Usuário']
  #swagger.description = 'Endpoint para listar todos os usuários'
  #swagger.responses[200] = {
    description: 'Usuários listados com sucesso',
    schema: {
      nome: 'Lima Barreto',
      email: 'lima@barreto.com',
      sexo: 'masculino',
    }
  }
    #swagger.responses[500] = {
    description: 'Erro ao listar usuários'
  }
  */
);

usuariosRoutes.get(
  "/:id",
  auth,
  UsuarioController.listarUm
  /*
  #swagger.tags = ['Usuário']
  #swagger.description = 'Endpoint para listar um usuário'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID do usuário',
    required: true,
    type: 'integer',
    format: 'int64'
  }
  #swagger.responses[200] = {
    description: 'Usuário encontrado com sucesso',
    schema: {
      nome: 'Lima Barreto',
      email: 'lima@barreto.com',
      sexo: 'masculino',
      logradouro: 'Avenida das Acácias',
      numero: '666',
      bairro: 'Centro',
      cidade: 'Rio de Janeiro',
      estado: 'RJ',
      cep: '20040-002',
      complemento: 'Apto 301'
    }
  }
  #swagger.responses[404] = {
    description: 'Usuário não encontrado ou não possui permissão'
  }
  #swagger.responses[500] = {
    description: 'Erro ao exibir usuário'
  }
  */
);

usuariosRoutes.put(
  "/:id",
  auth,
  validateUpdateUser,
  UsuarioController.atualizar
  /*
  #swagger.tags = ['Usuário']
  #swagger.description = 'Endpoint para atualizar um usuário'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID do usuário',
    required: true,
    type: 'integer',
    format: 'int64'
  }
  #swagger.parameters['atualizarUsuario'] = {
    in: 'body',
    description: 'Atualização de dados',
    required: true,
    schema: {
      nome: 'Lima Barreto',
      email: 'lima@barreto.com',
      sexo: 'masculino',
      cpf: '11122233344',
      dataNascimento: '1999-03-31',
      senha: 'novaSenha123',
      logradouro: 'Rua Nova',
      numero: '789',
      bairro: 'Copacabana',
      cidade: 'Rio de Janeiro',
      estado: 'RJ',
      cep: '22030-001',
      complemento: 'Casa'
    }
  }
  #swagger.responses[201] = {
    description: 'Usuário atualizado com sucesso',
  }
  #swagger.responses[404] = {
    description: 'Usuário não encontrado ou sem permissão'
  }
  #swagger.responses[500] = {
    description: 'Erro ao atualizar o usuário'
  }
  */
);

usuariosRoutes.delete(
  "/:id",
  auth,
  UsuarioController.deletar
  /*
  #swagger.tags = ['Usuário']
  #swagger.description = 'Endpoint para excluir um usuário'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID do usuário',
    required: true,
    type: 'integer',
    format: 'int64'
  }
  #swagger.responses[204] = {
    description: 'Usuário excluído com sucesso'
  }
  #swagger.responses[400] = {
    description: 'Não foi possível excluir o usuário ou não possui permissão'
  }
  #swagger.responses[500] = {
    description: 'Erro ao excluir o usuário'
  }
  */
);

usuariosRoutes.post(
  "/",
  validateCreateUser,
  UsuarioController.criar
  /*
  #swagger.tags = ['Usuário']
  #swagger.description = 'Endpoint para cadastrar um usuário'
  #swagger.parameters['cadastraUsuario'] = {
    in: 'body',
    description: 'Dados do usuário',
    required: true,
    schema: {
      $nome: 'Lima Barreto',
      $sexo: 'masculino',
      $cpf: '11122233344',
      $email: 'lima@barreto.com',
      $senha: '1w89!jhdy1',
      $dataNascimento: '1999-03-31',
      $logradouro: 'Avenida das Acácias',
      $numero: '666',
      $bairro: 'Centro',
      $cidade: 'Rio de Janeiro',
      $estado: 'RJ',
      $cep: '20040-002',
      complemento: 'Apto 301'
    }
  }
  #swagger.responses[201] = {
    description: 'Usuário cadastrado com sucesso',
    schema: {
      nome: 'Lima Barreto',
      email: 'lima@barreto.com',
      sexo: 'masculino'
    }
  }
  #swagger.responses[400] = {
    description: 'Não foi possível cadastrar'
  }
  #swagger.responses[500] = {
    description: 'Erro ao cadastrar o usuário'
  }
  */
);

module.exports = usuariosRoutes;
