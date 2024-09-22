const { Op } = require("sequelize");
const { hash } = require("bcryptjs");
const Usuario = require("../models/Usuario");
const Local = require("../models/Local");

class UsuarioService {
  async listar() {
    /*Não pode listar dados sensíveis como CPF, endereço, data de nascimento e senha de login. */
    const usuarios = await usuarioModel.findAll({
      attributes: ["id", "nome", "email", "sexo", "createdAt", "updatedAt"],
    });
    return usuarios;
  }

  async criar(body) {
    /*Não pode cadastrar pessoas com o mesmo CPF. */
    const usuarioExistente = await Usuario.findOne({
      where: {
        [Op.and]: [{ email: body.email }, { cpf: body.cpf }],
      },
    });
    if (usuarioExistente) {
      return null;
    }
    const senhaCrypto = await hash(senha, 8);
    const usuarioCriado = await Usuario.create({
      nome,
      email,
      sexo,
      CPF,
      endereco,
      dataNascimento,
      senha: senhaCrypto,
    });
    return usuarioCriado;
  }

  async atualizar(id, body) {
    /*Não pode editar o CPF. */
    const usuarioEncontrado = await Usuario.findByPk(id);
    if (!usuarioEncontrado) return null;
    

    const senhaCrypto = await hash(body.senha, 8);
    usuarioEncontrado.nome = body.nome;
    usuarioEncontrado.email = body.email;
    usuarioEncontrado.sexo = body.sexo;
    //usuarioEncontrado.cpf = body.cpf
    usuarioEncontrado.endereco = body.endereco
    usuarioEncontrado.senha = senhaCrypto

    usuarioEncontrado.save();

    const usuarioAtualizado = await Usuario.findByPk(id);
    return usuarioAtualizado

  }

  async deletar(id) {
    /*Não pode deletar usuários com locais para atividade física associados */
    const usuarioExistente = await Usuario.findByPk(id); //usuarios.find((usuario) => usuario.id === id);

    if (!usuarioExistente) return false;

    const usuarioComLocal = await Usuario.findByPk(id, {
      include: [
        {
          model: Local,
          attributes: [],
          where: { idUsuario: id },
        },
      ],
    });

    if(usuarioComLocal) return null

    await usuarioExistente.destroy();
    return true;
  }
}

module.exports = new UsuarioService();