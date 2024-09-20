const { compareSync } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const Usuario = require("../models/Usuario");
const emailPattern = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

class LoginController {
  async acesso(request, response) {
    try {
      const dados = request.body;
      /* verificações*/
      if (!dados.email || !dados.senha) {
        return response
          .status(400)
          .json({ mensagem: "email e senha são necessários!" });
      }

      if (!emailPattern.test(dados.email)) {
        return response
          .status(400)
          .json({ mensagem: "formato de email inválido!" });
      }
      if (dados.senha.length !== 10) {
        return response.status(400).json({
          mensagem: "a senha deve conter 10 dígitos",
        });
      }
      /*query*/
      const usuario = await Usuario.findOne({
        where: {
          email: dados.email,
        },
      });

      if (!usuario) {
        return response.status(404).json({ mensagem: "usuário inexistente!" });
      }

      /*compareSync */
      const senhaComparada = compareSync(dados.senha, usuario.senha);
      if (senhaComparada === false) {
        return response
          .status(404)
          .json({
            mensagem: "Conta não encontrada para este email e/ou senha",
          });
      }

      const token = sign(
        { id: usuario.id, nome: usuario.nome, CEP: usuario.cep },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      response.status(201).json({
        token: token,
        id: usuario.id,})
    } catch (error) { response.status(500).json({mensagem: "Houve erro ao realizar login"})
  }
}
}

module.exports = new LoginController();
