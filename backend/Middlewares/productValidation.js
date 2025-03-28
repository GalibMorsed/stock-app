const Joi = require("joi");

const productValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    stock: Joi.string().min(3).max(100).required(),
    date: Joi.date().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request", error });
  }
  next();
};

module.exports = { productValidation };
