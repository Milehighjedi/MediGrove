const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateItemInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.category = !isEmpty(data.category) ? data.category : '';
  data.discription = !isEmpty(data.discription) ? data.discription : '';
  data.price = !isEmpty(data.price) ? data.price : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Item Name is required';
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = 'Item Company is required';
  }

  if (Validator.isEmpty(data.category)) {
    errors.category = 'Item Category is required';
  }

  if (Validator.isEmpty(data.discription)) {
    errors.discription = 'Item Discription is required';
  }

  if (Validator.isEmpty(data.price)) {
    errors.price = 'Item Price is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
