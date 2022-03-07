const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateCategorySearchInput(data) {
  let errors = { };

  data.category = validText(data.category) ? data.category : "";
  data.lob = validText(data.lob) ? data.lob: "";
  data.product = validText(data.product) ?  data.product: "";
  data.type = validText(data.type) ? data.type: "";

  console.log(errors.text)

  if (!Validator.isLength(data.category, { min: 3, max: 140 })) {
    errors.text = "Category must be between 3 and 140 characters ";
  }

  if (Validator.isEmpty(data.category)) {
    errors.text = " Category field is required ";
  }

  if(!Validator.isEmpty(data.lob) && !Validator.isLength(data.lob, {min: 3, max: 140}) ){
      errors.text = " Lob must be between 3 and 140 characters "
  }
   if(!Validator.isEmpty(data.product) && !Validator.isLength(data.product, {min: 3, max: 140}) ){
      errors.text =" Product must be between 3 and 140 characters "
  }

  if(data.category.toLowerCase() == "lob" && Validator.isEmpty(data.lob)){
      errors.text = " Lob field is required if the category is lob "
  }

  if (data.category.toLowerCase() == "product" && Validator.isEmpty(data.product)) {
    errors.text = " product field is required if the category is product " ;
  }

  if (data.category.toLowerCase() == "common" && data.product) {
    errors.text = "Product should not exist if category is common";
    console.log("entered common validation if product provided");
  }
  if (data.category.toLowerCase() == "common" && data.lob) {
    errors.text = "Lob should not exist if category is common";
    console.log("enter common validation if lob provided");
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
