import { localSchema } from './src/schema/localSchema';

// Função para validar o payload de criação
export const validateCreate = async (data) => {
  try {
    await localSchema.validate(data, { abortEarly: false });
    return { valid: true, errors: null };
  } catch (err) {
    return { valid: false, errors: err.errors };
  }
};
