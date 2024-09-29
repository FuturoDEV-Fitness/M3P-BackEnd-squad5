const Endereco = require("../models/Endereco");

class EnderecoService {
  async listar() {
    const listaEnderecos = await Endereco.findAll({});
    return listaEnderecos;
  }
  async listarUm(idUsuarioEnd, idAutenticado) {
    //usuarioId na tabela endereços
    const enderecoBuscado = await Endereco.findOne({
      where: { usuarioId: idUsuarioEnd },
    });

    if (!enderecoBuscado) return null;
    if (enderecoBuscado.usuarioId !== idAutenticado) return null;

    return enderecoBuscado;
  }
  async criar(
    logradouro,
    numero,
    bairro,
    cidade,
    estado,
    cep,
    complemento,
    usuarioId
  ) {
    //<---
    const EnderecoExistente = await Endereco.findOne({
      where: { numero: numero, cep: cep },
    });
    if (EnderecoExistente) return null;

    const enderecoCriado = await Endereco.create({
      logradouro: logradouro,
      numero: numero,
      bairro: bairro,
      cidade: cidade,
      estado: estado,
      cep: cep,
      complemento: complemento,
      usuarioId: usuarioId, /// <---
    });
    return enderecoCriado;
  }
  async atualizar(id, body, idAutenticado) {
    const enderecoEncontrado = await Endereco.findOne({
      where: {
        usuarioId: id,
      },
    });
    if (!enderecoEncontrado) return null;
    if (enderecoEncontrado.id !== idAutenticado) return null;

    (enderecoEncontrado.logradouro = body.logradouro),
      (enderecoEncontrado.numero = body.numero),
      (enderecoEncontrado.bairro = body.bairro),
      (enderecoEncontrado.cidade = body.cidade),
      (enderecoEncontrado.estado = body.estado),
      (enderecoEncontrado.cep = body.cep),
      (enderecoEncontrado.complemento = body.complemento),
      (enderecoEncontrado.usuarioId = body.usuarioId);

    enderecoEncontrado.save();
    const enderecoAtualizado = await Endereco.findOne({
      where: {
        usuarioId: id,
      },
    });
    return enderecoAtualizado
  }
  async deletar(id, idAutenticado) {
    const idDoUsuario = id;
    const enderecoExistente = await Endereco.findOne({
      where: {
        usuarioId: idDoUsuario,
      },
    });
    if (!enderecoExistente) return false;
    if (enderecoExistente.usuarioId !== idAutenticado) return null;
    enderecoExistente.destroy();
    return true;
  }
}
module.exports = new EnderecoService();
