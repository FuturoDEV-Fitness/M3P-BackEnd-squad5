const Yup = require("yup");

// Definição do schema de validação com Yup
const localSchema = Yup.object().shape({
  nomeLocal: Yup.string()
    .required("O nome do local é obrigatório.")
    .max(100, "O nome do local deve ter no máximo 100 caracteres."),
  descricaoLocal: Yup.string()
    .required("A descrição do local é obrigatória.")
    .max(255, "A descrição deve ter no máximo 255 caracteres."),
  cep: Yup.string()
    .required("O CEP é obrigatório.")
    .matches(/^\d{8}$/, "O CEP deve ter 8 dígitos numéricos."),
  endereco: Yup.string()
    .required("O endereço é obrigatório.")
    .max(200, "O endereço deve ter no máximo 200 caracteres."),
  bairro: Yup.string()
    .required("O bairro é obrigatório.")
    .max(100, "O bairro deve ter no máximo 100 caracteres."),
  cidade: Yup.string()
    .required("A cidade é obrigatória.")
    .max(100, "A cidade deve ter no máximo 100 caracteres."),
  estado: Yup.string().required("O estado é obrigatório."),
  latitude: Yup.string()
    .required("A latitude é obrigatória.")
    .matches(/^-?\d+(\.\d+)?$/, "A latitude deve ser um número válido."),
  longitude: Yup.string()
    .required("A longitude é obrigatória.")
    .matches(/^-?\d+(\.\d+)?$/, "A longitude deve ser um número válido."),
  praticasEsportivas: Yup.array()
    .of(Yup.string().required("Cada prática esportiva deve ser uma string."))
    .min(1, "Deve haver pelo menos uma prática esportiva.")
    .required("As práticas esportivas são obrigatórias."),
});

module.exports = localSchema;
