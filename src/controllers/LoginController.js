const { sign } = require("jsonwebtoken");
const Usuario = require("../models/Usuario");
const Encryption = require("../utils/Encryption");

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

      /*query*/
      const usuario = await Usuario.findOne({
        where: {
          email: dados.email,
        },
      });
      const senhaComparada = await Encryption.compare(
        dados.senha,
        usuario.senha
      );

      if (!usuario || senhaComparada != true) {
        return response
          .status(404)
          .json({ mensagem: "Conta não encontrada para este email ou senha" });
      }

      const token = sign(
        { id: usuario.id, nome: usuario.nome, CEP: usuario.cep },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      response.status(201).json({
        token: token,
        id: usuario.id,
      });
    } catch (error) {
      response.status(500).json({ mensagem: "Houve erro ao realizar login" });
    }
  }
}

module.exports = new LoginController();
