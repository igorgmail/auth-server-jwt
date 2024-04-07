class CustomError extends Error {
  constructor(message, statusCode, originalError = null) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    this.originalError = originalError;

    Error.captureStackTrace(this, this.constructor);
  }
}

class ServerError extends CustomError {
  constructor(err) {
    super('Server Error', 500, err);
    this.errorType = 'CatchError';
  }
}

class UnauthorizedError extends CustomError {
  constructor(message) {
    super(message, 401);
    this.errorType = 'UnauthorizedError';
  }
}

class ValidateError extends CustomError {
  constructor(message, validatorErrors, originalError) {
    super(message, 400);
    this.message = message;
    this.errorType = 'ValidateError';
    this.validatorErrors = validatorErrors;
    this.originalError = originalError;
  }
}

class BadRequestError extends CustomError {
  constructor(message, originalError = null) {
    super(message, 400, originalError);
    this.message = message;
    this.errorType = 'BadRequestError';
    this.originalError = originalError;
  }
}

class ForbiddenError extends CustomError {
  constructor(message, originalError = null) {
    super(message, 403, [], originalError);
    this.message = message;
    this.errorType = 'ForbiddenError';
    this.originalError = originalError;
  }
}

module.exports = {
  CustomError,
  ServerError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  ValidateError,
};
