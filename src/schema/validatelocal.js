import { localSchema } from './src/schema/localSchema';

// Função para validar o payload de atualização
export const validateUpdate = async (data) => {
  try {
    // Utilizando o schema com a validação parcial (atualização)
    await localSchema.validate(data, { abortEarly: false, context: { partial: true } });
    return { valid: true, errors: null };
  } catch (err) {
    return { valid: false, errors: err.errors };
  }
};
