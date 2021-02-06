const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRequestInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.article = !isEmpty(data.article) ? data.article : "";
  data.quantity = !isEmpty(data.quantity) ? data.quantity : "";
  data.unitcost = !isEmpty(data.unitcost) ? data.unitcost : "";

  // Article checks
  if (Validator.isEmpty(data.article)) {
    errors.name = "Article field is required";
  }

  // Quantity checks
  if (Validator.isEmpty(data.quantity)) {
    errors.email = "Quantity field is required";
  } else if (!Validator.isNumeric(data.quantity)) {
    errors.email = "Quantity is invalid";
  }

  // Unitcost checks
  if (Validator.isEmpty(data.unitcost)) {
    errors.email = "Unit cost field is required";
  } else if (!Validator.isNumeric(data.unitcost)) {
    errors.email = "Unit cost is invalid";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
