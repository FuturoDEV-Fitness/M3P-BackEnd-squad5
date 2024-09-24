const EnderecoService = require("../services/endereco.service");

class EnderecoController {
  //proibido listar enderecos!!!
  async listar(request, response) {
    try {
      const listaEnderecos = await EnderecoService.listar();
      return response.json(listaEnderecos);
    } catch (error) {
      return response
        .status(500)
        .json({ mensagem: "Não foi possível listar enderecos" });
    }
  }
  async listarUm(request, response) {
    try {
      const { id: idUsuarioEnd } = request.params; //o que vem no request é id do usuário apenas
      const { idAutenticado } = request.usuarioId;

      const enderecoBuscado = await EnderecoService.listarUm(
        idUsuarioEnd,
        idAutenticado
      );
      if (!enderecoBuscado) {
        return response.status(400).json({
          mensagem:
            "Não foi possível exibir o endereço ou não possui permissão",
        });
      }
      return response.status(200).json(enderecoBuscado);
    } catch (error) {
      return response.status(500).json({ mensagem: "Erro ao exibir endereço" });
    }
  }
  async criar(request, response) {
    //Fazer isto em USUARIO CONTROLLER
    /*const { logradouro, numero, bairro, cidade, estado, cep, complemento } = request.body;
    const enderecoCriado = await EnderecoService.criar(
    logradouro, numero, bairro, cidade, estado, cep, complemento, usuarioCriado.id);*/
    try {
      const { logradouro, numero, bairro, cidade, estado, cep, complemento } =
        request.body;

      const { enderecoCriado } = await EnderecoService.criar(
        logradouro,
        numero,
        bairro,
        cidade,
        estado,
        cep,
        complemento
        //idUsuario
      );

      if (!enderecoCriado)
        return response
          .status(400)
          .json({ message: "endereço não preenchido!" });

      return response.status(201).json(enderecoCriado);
    } catch (error) {
      return response
        .status(500)
        .json({ mensagem: "Erro ao cadastrar endereço" });
    }
  }
  async atualizar(request, response) {
    try {
      const { id } = request.params;
      const { idAutenticado } = request.usuarioId;
      const body = request.body;
      const enderecoAtualizado = await EnderecoService.atualizar(
        id,
        body,
        idAutenticado
      );

      if (!enderecoAtualizado) {
        return response
          .status(404)
          .json({ mensagem: "Endereço não encontrado ou sem permissão" });
      }
      response.status(201).json(enderecoAtualizado)
    } catch (error) {
      return response
        .status(500)
        .json({ mensagem: "Não foi possível atualizar o endereço" });
    }
  }
  async deletar(request, response) {
    try {
      const { id } = request.params;
      const { idAutenticado } = request.usuarioId;
      const apagou = await EnderecoService.deletar(id, idAutenticado);
      if (!apagou) {
        return response
          .status(400)
          .json({ message: "não foi possível excluir o endereço!" });
      }
      return response.status(204).end();
    } catch (error) {
      return response
        .status(500)
        .json({ mensagem: "Erro ao excluir endereço" });
    }
  }
}

module.exports = new EnderecoController();