const yup = require("yup");

const createUserSchema = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório"),
  sexo: yup
    .string()
    .oneOf(["Masculino", "Feminino", "Outro"], "Sexo inválido")
    .required("Sexo é obrigatório"),
  cpf: yup
    .string()
    .matches(/^\d{11}$/, "CPF deve ter 11 dígitos")
    .required("CPF é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  senha: yup
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .required("Senha é obrigatória"),
  dataNascimento: yup
    .date()
    .max(new Date(), "Data de nascimento não pode ser no futuro")
    .required("Data de Nascimento é obrigatória"),
  logradouro: yup.string().required("Logradouro é obrigatório"),
  numero: yup
    .number()
    .typeError("Número deve ser numérico")
    .required("Número é obrigatório"),
  bairro: yup.string().required("Bairro é obrigatório"),
  cidade: yup.string().required("Cidade é obrigatória"),
  estado: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, "Estado deve conter apenas letras")
    .max(150, "Estado pode ter no máximo 150 caracteres")
    .required("Estado é obrigatório"),
  cep: yup
    .string()
    .matches(/^\d{8}$/, "CEP deve ter 8 dígitos")
    .required("CEP é obrigatório"),
  complemento: yup.string().optional(),
});

module.exports = { createUserSchema };
