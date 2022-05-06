const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateProductCreateInput(data) {
  let errors = {};

  data.product = validText(data.product) ? data.product : "";
  data.lob = validText(data.lob) ? data.lob : "";
  data.module = validText(data.module) ? data.module : "";
  // lob and module will be min 3 and max 140 characters
  // if product = policy lob and module is required else product is not equal to policy product and module is required
  // product = policy, claims and billing. Module is required for all
  if (!Validator.isLength(data.product, { min: 3, max: 140 })) {
    errors.text = "Product must be between 3 and 140 characters ";
  }


  if (Validator.isEmpty(data.product)) {
    errors.text = " Product field is required ";
  }
   if (data.product.toLowerCase() == "claims" && Validator.isEmpty(data.module)) {
     errors.text = "A value for module is required if Product is claims ";
   }
    if (
      data.product.toLowerCase() == "billing" &&
      Validator.isEmpty(data.module)
    ) {
      errors.text = "A value for module is required if Product is billing ";
    }
   
   if (data.product.toLowerCase() == "policy" && Validator.isEmpty(data.lob)) {
     errors.text = "A value for LOB is required if Product is policy ";
   }
   if (data.product.toLowerCase() == "policy" && Validator.isEmpty(data.module)) {
     errors.text = "A value for module is required if Product is policy ";
   }
   if (
     !Validator.isEmpty(data.lob) &&
     !Validator.isLength(data.lob, { min: 3, max: 140 })
   ) {
     errors.text = " Lob must be between 3 and 140 characters ";
   }

   if (
     !Validator.isEmpty(data.module) &&
     !Validator.isLength(data.module, { min: 3, max: 140 })
   ) {
     errors.text = " Module must be between 3 and 140 characters ";
   }

 

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
