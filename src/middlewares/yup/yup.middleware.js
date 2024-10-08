module.exports.yupValidate = (schema) => async (req, res, next) => {
  try {
    // Certifique-se de que o schema foi passado corretamente
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.errors || ["Unknown validation error"],
    });
  }
};
