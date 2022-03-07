const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateCategoryCreateInput(data) {
  let errors = { };

  data.category = validText(data.category) ? data.category : "";
  data.lob = validText(data.lob) ? data.lob : "";
  data.product = validText(data.product) ? data.product : "";
  data.type = validText(data.type) ? data.type : "";

  if (!Validator.isLength(data.category, { min: 3, max: 140 })) {
    errors.text = "Category must be between 3 and 140 characters ";
  }

  if (Validator.isEmpty(data.category)) {
    errors.text = " Category field is required ";
  }

  if (
    data.category.toLowerCase() == "lob" &&
    Validator.isEmpty(data.lob)
  ) {
    errors.text = "A value for LOB is required if Category is LOB ";
  }
  if (data.category.toLowerCase() == "product" && Validator.isEmpty(data.product)) {
    errors.text = "A value for PRODUCT is required if Category is PRODUCT ";
  }

  if (data.category.toLowerCase() == "lob" && Validator.isEmpty(data.lob)) {
    errors.text = " Lob field is required if the category is lob ";
  }
  if(data.category.toLowerCase() == "common" && data.product){
      errors.text = "Product should not exist if category is common"
      //console.log("entered common validation if product provided")
  }
  if (data.category.toLowerCase() == "common" && data.lob) {
    errors.text = "Lob should not exist if category is common";
    //console.log("enter common validation if lob provided")
  }


  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
