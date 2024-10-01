// validationMiddleware.js
const validationMiddleware = (schema) => {
    return async (req, res, next) => {
      try {
        await schema.validate(req.body, { abortEarly: false });
        next();
      } catch (error) {
        return res.status(400).json({
          message: 'Erro de validação',
          errors: error.errors,
        });
      }
    };
  };
  
  
  module.exports = validationMiddleware;
  