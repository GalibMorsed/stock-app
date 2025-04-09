const Joi = require("joi");

const tableValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    stock: Joi.string().required(),
    data: Joi.array().items(Joi.any()).required(), // Allow any kind of values in the array
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ message: "Validation failed", error: error.details });
  }

  const { data } = value;

  if (!Array.isArray(data) || data.length === 0) {
    return res
      .status(400)
      .json({ message: "Table data must be a non-empty array" });
  }

  next(); // All good, move on to controller
};

module.exports = {
  tableValidation,
};
