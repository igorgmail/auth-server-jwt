const { checkSchema, validationResult } = require('express-validator');

const loginSchema = checkSchema({
  email: {
    // Checking the first character of email
    custom: {
      errorMessage: 'Invalid first character',
      options: (value) => {
        if (!/^[a-zA-Z0-9]/.test(value[0])) {
          throw new Error('Invalid first character');
        }
        return true;
      },
      bail: true,
    },

    // Checking email validity
    isEmail: {
      errorMessage: 'Email field is incorrect',
    },

    // Checking for invalid characters in email
    matches: {
      options: /^[a-zA-Z0-9@$#!?-_.]+$/gm,
      errorMessage: 'The email contains invalid characters',
    },
  },

  password: {
    // Checking if the password is empty
    notEmpty: {
      errorMessage: 'The password field cannot be empty',
    },
    // Checking for invalid characters in a password
    matches: {
      options: /^[a-zA-Z0-9@$#!?]+$/gm,
      errorMessage: 'The password contains invalid characters',
    },
    // Checking Password Length
    isLength: {
      options: { min: 5, max: 20 },
      errorMessage:
        'The password must be a minimum of 5 and a maximum of 20 characters',
    },
  },
});

module.exports = loginSchema;
