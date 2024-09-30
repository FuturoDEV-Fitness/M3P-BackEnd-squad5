const { Op } = require("sequelize");
const Usuario = require("../models/Usuario");
const Local = require("../models/Local");
const Endereco = require("../models/Endereco");

class UsuarioService {
  async listar() {
    return await Usuario.findAll({
      attributes: ["id", "nome", "email", "sexo", "createdAt", "updatedAt"],
    });
  }

  async listarUm(id, idAutenticado) {
    const usuarioBuscado = await Usuario.findByPk(id, {
      include: [{ model: Endereco, as: "enderecos" }],
    });

    if (!usuarioBuscado || usuarioBuscado.id !== idAutenticado) return null;

    return usuarioBuscado;
  }

  async criar(body) {
    const {
      nome,
      email,
      sexo,
      cpf,
      dataNascimento,
      senha,
      logradouro,
      numero,
      bairro,
      cidade,
      estado,
      cep,
      complemento,
    } = body;

    const usuarioExistente = await Usuario.findOne({
      where: {
        [Op.or]: [{ email }, { cpf }],
      },
    });
    if (usuarioExistente) return null;

    const usuarioCriado = await Usuario.create({
      nome,
      email,
      sexo,
      cpf,
      dataNascimento,
      senha,
    });
    await Endereco.create({
      logradouro,
      numero,
      bairro,
      cidade,
      estado,
      cep,
      complemento,
      usuario_id: usuarioCriado.id,
    });

    return usuarioCriado;
  }

  async atualizar(id, body, idAutenticado) {
    const usuarioEncontrado = await Usuario.findByPk(id);
    if (!usuarioEncontrado || usuarioEncontrado.id !== idAutenticado)
      return null;

    Object.assign(usuarioEncontrado, body);
    await usuarioEncontrado.save();

    const enderecoEncontrado = await Endereco.findOne({
      where: { usuario_id: id },
    });
    if (enderecoEncontrado) {
      Object.assign(enderecoEncontrado, body);
      await enderecoEncontrado.save();
    }

    return usuarioEncontrado;
  }

  async deletar(id, idAutenticado) {
    const usuarioExistente = await Usuario.findByPk(id);
    if (!usuarioExistente) return false;

    const usuarioComLocal = await Usuario.findByPk(id, {
      include: [{ model: Local, attributes: [], where: { idUsuario: id } }],
    });

    if (usuarioComLocal || usuarioComLocal.id !== idAutenticado) return null;

    await usuarioExistente.destroy();
    return true;
  }
}

module.exports = new UsuarioService();
