const { createUserSchema } = require("../../schema/criarusuarioSchema");

const validateCreateUser = async (req, res, next) => {
  try {
    await createUserSchema.validate(req.body, { abortEarly: false });
    next(); // Se a validação passar, continue para o controlador
  } catch (err) {
    return res.status(400).json({ errors: err.errors });
  }
};

module.exports = validateCreateUser;
