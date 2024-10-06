import * as Yup from 'yup';

// Serviço para validação de cadastro
const createUserSchema = Yup.object().shape({
  nome: Yup.string().required('Nome é obrigatório'),
  sexo: Yup.string().oneOf(['Masculino', 'Feminino', 'Outro'], 'Sexo inválido').required('Sexo é obrigatório'),
  cpf: Yup.string()
    .matches(/^\d{11}$/, 'CPF deve ter 11 dígitos')
    .required('CPF é obrigatório'),
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  senha: Yup.string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .required('Senha é obrigatória'),
  dataNascimento: Yup.date()
    .max(new Date(), 'Data de nascimento não pode ser no futuro')
    .required('Data de Nascimento é obrigatória'),
  logradouro: Yup.string().required('Logradouro é obrigatório'),
  numero: Yup.number().typeError('Número deve ser numérico').required('Número é obrigatório'),
  bairro: Yup.string().required('Bairro é obrigatório'),
  cidade: Yup.string().required('Cidade é obrigatória'),
  estado: Yup.string()
    .matches(/^[A-Z]$/.toUpperCase(), 'Estado deve ter o nome completo')
    .required('Estado é obrigatório'),
  cep: Yup.string()
    .matches(/^\d{8}$/, 'CEP deve ter 8 dígitos')
    .required('CEP é obrigatório'),
  complemento: Yup.string().optional(),
});