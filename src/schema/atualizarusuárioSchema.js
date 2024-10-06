import * as Yup from 'yup';

// Serviço para validação de atualização
const updateUserSchema = Yup.object().shape({
  nome: Yup.string().optional(),
  sexo: Yup.string().oneOf(['Masculino', 'Feminino', 'Outro'], 'Sexo inválido').optional(),
  email: Yup.string().email('E-mail inválido').optional(),
  dataNascimento: Yup.date().max(new Date(), 'Data de nascimento não pode ser no futuro').optional(),
  logradouro: Yup.string().optional(),
  numero: Yup.number().typeError('Número deve ser numérico').optional(),
  bairro: Yup.string().optional(),
  cidade: Yup.string().optional(),
  estado: Yup.string().matches(/^[a-z]$/.toUpperCase(), 'Estado deve ter o nome completo').optional(),
  cep: Yup.string().matches(/^\d{8}$/, 'CEP deve ter 8 dígitos').optional(),
  complemento: Yup.string().optional(),
});

export { createUserSchema, updateUserSchema };
