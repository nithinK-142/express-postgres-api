import joi from "joi";

const userSchema = joi.object().keys({
  name: joi.string().min(3).max(30).required(),
  email: joi.string().email().required(),
});

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error)
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  next();
};

export default validateUser;
