// localValidation.js
const yup = require('yup');

// Definindo o schema de validação para o Local
const localSchema = yup.object().shape({
  name: yup
    .string()
    .required('O nome do local é obrigatório.')
    .min(3, 'O nome deve ter no mínimo 3 caracteres.'),
  address: yup
    .string()
    .required('O endereço é obrigatório.'),
  city: yup
    .string()
    .required('A cidade é obrigatória.'),
  state: yup
    .string()
    .required('O estado é obrigatório.')
    .oneOf(
      ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'],
      'O estado deve ser um dos seguintes: AC, AL, AP, AM, BA, CE, DF, ES, GO, MA, MT, MS, MG, PA, PB, PR, PE, PI, RJ, RN, RS, RO, RR, SC, SP, SE, TO.'
    ),
  zipCode: yup
    .string()
    .required('O CEP é obrigatório.')
    .matches(/^[0-9]{5}-[0-9]{3}$|^[0-9]{8}$/, 'O CEP deve estar no formato 00000-000 ou 00000000.'),
});

module.exports = localSchema;
