const { Op } = require("sequelize");
const { hash } = require("bcryptjs");
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

  async listarUm(id, idAutenticado){

    const usuarioBuscado = await Usuario.findByPk(id);

    if(!usuarioBuscado) return null
    if (usuarioBuscado.id !== idAutenticado) return null
    //não possui "autorização"

    return usuarioBuscado
  }
  async criar(body) {
    /*Não pode cadastrar pessoas com o mesmo CPF. */
    const {
      body: nome,
      email,
      sexo,
      cpf,
      dataNascimento,
      senha,
      adress: { logradouro, numero, bairro, cidade, estado, cep, complemento },
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
        [Op.and]: [{ email: corpo.email }, { cpf: corpo.cpf }],
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
      //enderecamento
      dataNascimento: corpo.dataNascimento,
      senha: corpo.senha,
    });

    const { id: idUsuario } = usuarioCriado;

    const enderecoCriado = await Endereco.create({
      logradouro: enderecamento.logradouro,
      numero: enderecamento.numero,
      bairr: enderecamento.bairro,
      cidade: enderecamento.cidade,
      estado: enderecamento.estado,
      cep: enderecamento.cep,
      complemento: enderecamento.complemento,
      usuarioId: idUsuario, // <---
    });
    const { id: enderecoId } = enderecoCriado;
    //Usuario.hasOne(Endereco, { foreignKey: 'usuarioId' }); <-- no modelo
    return { usuarioCriado, enderecoCriado };
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
    usuarioEncontrado.endereco = body.endereco;
    usuarioEncontrado.senha = senhaCrypto;

    usuarioEncontrado.save();

    const usuarioAtualizado = await Usuario.findByPk(id);
    return usuarioAtualizado;
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

    if (usuarioComLocal) return null;

    await usuarioExistente.destroy();
    return true;
  }
}

module.exports = new UsuarioService();
