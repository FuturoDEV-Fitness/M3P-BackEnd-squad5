const updateUserSchema = require("../../schema/atualizarusuárioSchema");

const validateUpdateUser = async (req, res, next) => {
  try {
    await updateUserSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    return res.status(400).json({ errors: err.errors });
  }
};

module.exports = validateUpdateUser;
