const { validationResult } = require('express-validator');
const { ValidateError, ServerError } = require('../utils/AppError');
const loginSchema = require('../validationSchemas/userSchema');

const validateLoginField = async (req, res, next) => {
  try {
    await loginSchema.run(req);

    const result = validationResult(req);
    if (result.isEmpty()) {
      return next();
    }

    const errorsArray = result
      .formatWith(({ msg, value }) => ({ value, msg }))
      .array();
    const errorData = {
      status: 'fail',
      msg: errorsArray[0]?.msg,
      validatorErrors: errorsArray,
    };
    next(new ValidateError(errorData.msg, errorsArray));
  } catch (err) {
    next(new ServerError(err));
  }
};

module.exports = { validateLoginField };
