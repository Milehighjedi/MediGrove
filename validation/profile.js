const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : '';

  if (!Validator.isLength(data.username, { min: 5, max: 40 })) {
    errors.username = 'Username needs to between 5 and 40 characters';
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = 'Profile Username is required';
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = 'Not a valid URL';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
