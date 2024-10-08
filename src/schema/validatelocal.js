const localSchema = require("./localschema");

const validateLocalSchema = async (req, res, next) => {
  try {
    await localSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    return res.status(400).json({ errors: err.errors });
  }
};

module.exports = validateLocalSchema;
