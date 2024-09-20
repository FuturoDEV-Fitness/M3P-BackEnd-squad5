const Usuario = require("../models/Usuario");
const { Op } = require("sequelize");
const emailPattern = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const cpfPattern = new RegExp(/^\d+$/); // --> ou: !/^\d{11}$/
const dataPattern = new RegExp(/^\d{4}-\d{2}-\d{2}$/);
const sexoValido = ["masculino", "feminino", "outro"];

class UsuarioController {
  async criar(request, response) {
    try {
      const dados = request.body;
      //-->validações<--
      if (!dados.nome) {
        return response.status(400).json({ mensagem: "o nome é obrigatório!" });
      }

      if (typeof dados.nome !== "string" || dados.nome.length > 150) {
        return response.status(400).json({
          mensagem:
            "O nome deve ser uma string e conter no máximo 150 caracteres!",
        });
      }

      if (!dados.email) {
        return response
          .status(400)
          .json({ mensagem: "o email é obrigatório!" });
      }
      if (!emailPattern.test(dados.email)) {
        return response
          .status(400)
          .json({ mensagem: "formato de email inválido!" });
      }

      //a migração permite sexo nulo
      if (!sexoValido.includes(dados.sexo)) {
        return response
          .status(400)
          .json({ mensagem: "O sexo deve ser masculino, feminino ou outro!" });
      }

      if (!dados.cpf) {
        // || dados.cpf.length === 0
        return response.status(400).json({ mensagem: "o CPF é obrigatório!" });
      }

      //CONSIDERAR: const cpfString = String(dados.cpf);
      if (
        typeof dados.cpf !== "string" ||
        dados.cpf.length !== 11 ||
        !cpfPattern.test(dados.cpf)
      ) {
        return response.status(400).json({
          mensagem: "O CPF deve conter 11 caracteres e somente números (retire . e - )!",
        });
      }

      if (
        !dados.endereco ||
        dados.endereco.length > 200 ||
        typeof dados.endereco !== "string"
      ) {
        return response.status(400).json({
          mensagem:
            "O endereço é obrigatório e deve conter no máximo 200 caracteres!",
        });
      }
      //mudar para senhaHash???
      if (!dados.senha) {
        return response.status(400).json({ mensagem: "a senha é obrigatória" });
      }
      if (dados.senha.length !== 10) {
        return response.status(400).json({
          mensagem: "a senha deve conter obrigatoriamente 10 dígitos",
        });
      }
      //"dataNascimento": "1990-01-01"
      if (!dados.dataNascimento) {
        return response
          .status(400)
          .json({ mensagem: "A data de nascimento é obrigatória!" });
      }

      if (!dataPattern.test(dados.dataNascimento)) {
        return response.status(400).json({
          mensagem: "A data de nascimento deve estar no formato AAAA-MM-DD!",
        });
      }
      const dataNascimento = new Date(dados.dataNascimento);

      if (isNaN(dataNascimento.getTime())) {
        return response.status(400).json({
          mensagem:
            "A data de nascimento deve ser uma data válida no formato AAAA-MM-DD!",
        });
      }

      //QUERIES

      const usuarioCadastrado = await Usuario.findOne({
        where: {
          [Op.or]: [{ email: dados.email }, { cpf: dados.cpf }],
        },
      });
      if (usuarioCadastrado) {
        return response
          .status(401)
          .json({ mensagem: "email ou CPF já cadastrados!" });
      }

      const usuarioCriado = await Usuario.create(dados);
  
      response.status(201).json({
        mensagem: "Usuário cadastrado com sucesso!",
        nome: usuarioCriado.nome,
      });
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json({ mensagem: "Erro ao cadastrar usuário" });
    }
  }
}

module.exports = new UsuarioController();
