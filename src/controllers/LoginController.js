const { sign } = require("jsonwebtoken");
const Usuario = require("../models/Usuario");
const Encryption = require("../utils/Encryption");

class LoginController {
  async acesso(request, response) {
    try {
      const { email, senha } = request.body;

      // Verificações se o email e a senha estão presentes
      if (!email || !senha) {
        return response
          .status(400)
          .json({ mensagem: "Email e senha são necessários!" });
      }

      // Consulta o usuário no banco de dados
      const usuario = await Usuario.findOne({
        where: {
          email: email,
        },
      });

      // Verifica se o usuário foi encontrado
      if (!usuario) {
        return response
          .status(404)
          .json({ mensagem: "Conta não encontrada para este email ou senha" });
      }

      // Compara a senha informada com a senha armazenada
      const senhaComparada = await Encryption.compare(senha, usuario.senha);

      // Verifica se a senha está correta
      if (!senhaComparada) {
        return response
          .status(404)
          .json({ mensagem: "Conta não encontrada para este email ou senha" });
      }

      // Gera o token JWT
      const token = sign(
        { id: usuario.id, nome: usuario.nome, cep: usuario.cep },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      // Retorna o token e o ID do usuário
      return response.status(201).json({
        token: token,
        id: usuario.id,
      });
    } catch (error) {
      console.error("Erro no login:", error);
      return response
        .status(500)
        .json({ mensagem: "Houve erro ao realizar login" });
    }
  }
}

module.exports = new LoginController();
