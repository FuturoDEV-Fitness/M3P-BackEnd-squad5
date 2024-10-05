const Yup = require("yup");

const usuarioSchema = Yup.object().shape({
  nome: Yup.string()
    .max(150, "O nome deve ter no máximo 150 caracteres.")
    .required("O nome é obrigatório."),
  sexo: Yup.string()
    .oneOf(["masculino", "feminino", "outro"], "Sexo inválido."),
  cpf: Yup.string()
    .length(11, "O CPF deve ter exatamente 11 caracteres.")
    .matches(/^\d+$/, "O CPF deve conter apenas números.")
    .required("O CPF é obrigatório."),
  email: Yup.string()
    .email("Formato de email inválido.")
    .required("O email é obrigatório."),
  endereco: Yup.string()
    .max(200, "O endereço deve ter no máximo 200 caracteres.")
    .required("O endereço é obrigatório."),
  senha: Yup.string()
    .min(6, "A senha deve ter no mínimo 6 caracteres.")
    .required("A senha é obrigatória."),
  dataNascimento: Yup.date()
    .max(new Date(), "A data de nascimento não pode ser no futuro.")
    .required("A data de nascimento é obrigatória."),
});

module.exports = usuarioSchema;
