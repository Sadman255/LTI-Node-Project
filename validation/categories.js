const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateCategoryInput(data) {
  let errors = { text:""};

  data.text = validText(data.text) ? data.text : "";

  if (!Validator.isLength(data.category, { min: 3, max: 140 })) {
    errors.text += "Category must be between 3 and 140 characters ";
  }

  if (Validator.isEmpty(data.category)) {
    errors.text += " Category field is required ";
  }

  if(!Validator.isEmpty(data.lob) && !Validator.isLength(data.lob, {min: 3, max: 140}) ){
      errors.text += " Lob must be between 3 and 140 characters "
  }
   if(!Validator.isEmpty(data.product) && !Validator.isLength(data.product, {min: 3, max: 140}) ){
      errors.text =" Product must be between 3 and 140 characters "
  }

  if(data.category == "LOB" && Validator.isEmpty(data.lob)){
      errors.text = " Lob field is required if the category is lob "
  }

  if (data.category == "product" && Validator.isEmpty(data.product)) {
    errors.text = " product field is required if the category is product " ;
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
