require('dotenv').config();

const errorHandler = (err, req, res, next) => {
  console.error('\n');
  console.error('--------------------START-------------------');
  console.error('--------------------ERROR-------------------');
  console.log(`---${new Date()}---`);
  console.error(err);
  console.error('-----------------ORIGINAL-ERROR-------------');
  console.error('---');
  console.log(err.originalError);
  console.error('--------------------STOP--------------------');
  console.error('\n');

  const errStatusCode = err.statusCode || 500;
  const errMsg = err.message || 'Something went wrong';

  const data = {
    status: err?.status,
    msg: errMsg,
    errorType: err?.errorType,

    ...(process.env.NODE_ENV === 'development' &&
      err && {
        errorsData: {
          code: errStatusCode,
          message: errMsg,
          isOperational: err.isOperational,
          stack: err.stack,
          validatorErrors: err.validatorErrors,
          OriginalErrors: {
            name: err.originalError?.name,
            message: err.originalError?.message,
            stack: err.originalError?.stack,
          },
        },
      }),
  };

  // We add this key only for validation errors
  if (data.errorsData && err.constructor?.name !== 'ValidateError') {
    delete data.errorsData.validatorErrors;
  }

  res.status(errStatusCode).json(data);
};

module.exports = errorHandler;
