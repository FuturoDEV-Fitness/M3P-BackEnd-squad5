// userAddressValidation.js
const yup = require('yup');

// Schema para o endereço
const addressSchema = yup.object().shape({
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

// Schema para o usuário
const userSchema = yup.object().shape({
  username: yup
    .string()
    .required('O nome de usuário é obrigatório.')
    .min(3, 'O nome de usuário deve ter no mínimo 3 caracteres.'),
  email: yup
    .string()
    .email('O e-mail deve ser válido.')
    .required('O e-mail é obrigatório.'),
  password: yup
    .string()
    .required('A senha é obrigatória.')
    .min(6, 'A senha deve ter no mínimo 6 caracteres.'),
  age: yup
    .number()
    .optional()
    .integer('A idade deve ser um número inteiro.')
    .min(18, 'O usuário deve ter pelo menos 18 anos.'),
});

// Schema final para o Usuário + Endereço
const userAddressSchema = yup.object().shape({
  user: userSchema,        // Validação para os dados de usuário
  address: addressSchema,  // Validação para os dados de endereço
});

module.exports = userAddressSchema;
