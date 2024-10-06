const localSchema = require("./localschema");

const validateLocalSchema = async (data) => {
  try {
    await localSchema.validate(data, {
      abortEarly: false,
      context: { partial: true },
    });
    return { valid: true, errors: null };
  } catch (err) {
    return { valid: false, errors: err.errors };
  }
};

module.exports = validateLocalSchema;
