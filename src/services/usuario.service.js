const { Op } = require("sequelize");
const Usuario = require("../models/Usuario");
const Local = require("../models/Local");
const Endereco = require("../models/Endereco");

class UsuarioService {
  async listar() {
    /*Não pode listar dados sensíveis como CPF, endereço, data de nascimento e senha de login. */
    const usuarios = await usuarioModel.findAll({
      attributes: ["id", "nome", "email", "sexo", "createdAt", "updatedAt"],
    });
    return usuarios;
  }

  async listarUm(id, idAutenticado) {
    const usuarioBuscado = await Usuario.findByPk(id, {
      include: [{ model: Endereco, as: "enderecos" }],
    });

    if (!usuarioBuscado) return null;
    if (usuarioBuscado.id !== idAutenticado) return null;

    return usuarioBuscado;
  }
  async criar(body) {
    const {
      body: nome,
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

    const corpo = { nome, email, sexo, cpf, dataNascimento, senha };
    const enderecamento = {
      logradouro,
      numero,
      bairro,
      cidade,
      estado,
      cep,
      complemento,
    };

    const usuarioExistente = await Usuario.findOne({
      where: {
        [Op.or]: [{ email: corpo.email }, { cpf: corpo.cpf }],
      },
    });
    if (usuarioExistente) {
      return null;
    }
    //const senhaCrypto = await hash(senha, 8); <-- está no modelo
    const usuarioCriado = await Usuario.create({
      nome: corpo.nome,
      email: corpo,
      sexo: corpo.sexo,
      cpf: corpo.cpf,
      dataNascimento: corpo.dataNascimento,
      senha: corpo.senha,
    });

    const { id: idUsuario } = usuarioCriado;

    const enderecoCriado = await Endereco.create({
      logradouro: enderecamento.logradouro,
      numero: enderecamento.numero,
      bairro: enderecamento.bairro,
      cidade: enderecamento.cidade,
      estado: enderecamento.estado,
      cep: enderecamento.cep,
      complemento: enderecamento.complemento,
      usuarioId: idUsuario,
    });
    const { id: enderecoId } = enderecoCriado;

    return { usuarioCriado, enderecoCriado };
  }

  async atualizar(id, body, idAutenticado) {
    const usuarioEncontrado = await Usuario.findByPk(id);
    if (!usuarioEncontrado) return null;
    if (usuarioEncontrado.id !== idAutenticado) return null;

    const {
      nome,
      email,
      sexo,
      cpf,
      dataNascimento,
      senha,
      logradouro, numero, bairro, cidade, estado, cep, complemento
    } = body;

    const corpo = { nome, email, sexo, cpf, dataNascimento, senha };
    const enderecamento = {
      logradouro,
      numero,
      bairro,
      cidade,
      estado,
      cep,
      complemento,
    };

    usuarioEncontrado.nome = corpo.nome;
    usuarioEncontrado.email = corpo.email;
    usuarioEncontrado.sexo = corpo.sexo;
    usuarioEncontrado.senha = corpo.senha;

    usuarioEncontrado.save();

    const usuarioAtualizado = await Usuario.findByPk(id);
    //atualizar endereço
    const idAtualizado = usuarioAtualizado.id;
    const enderecoEncontrado = await Endereco.findOne({
      where: {
        usuario_id: idAtualizado,
      },
    });

    (enderecoEncontrado.logradouro = enderecamento.logradouro),
      (enderecoEncontrado.numero = enderecamento.numero),
      (enderecoEncontrado.bairro = enderecamento.bairro),
      (enderecoEncontrado.cidade = enderecamento.cidade),
      (enderecoEncontrado.estado = enderecamento.estado),
      (enderecoEncontrado.cep = enderecamento.cep),
      (enderecoEncontrado.complemento = enderecamento.complemento),
      (enderecoEncontrado.usuario_id = enderecamento.idAtualizado);

    enderecoEncontrado.save();
    return usuarioAtualizado;
  }

  async deletar(id, idAutenticado) {
    const usuarioExistente = await Usuario.findByPk(id); 

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

    if (usuarioComLocal) return null;
    if (usuarioComLocal.id !== idAutenticado) return null;

    await usuarioExistente.destroy();
    return true;
  }
}

module.exports = new UsuarioService();
