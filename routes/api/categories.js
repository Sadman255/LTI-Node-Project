const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Category = require("../../models/Category");
const validateCategoryInput = require("../../validation/categories");


// const searchCategories = ( category) =>{
//     if (req.body.category && req.body.type && req.body.testCase){
//         category.category
//           .toLowerCase()
//           .includes(req.body.category.toLowerCase());
//     }
      
    
// }

router.post("/search", (req, res) => {

    const {errors, isValid} = validateCategoryInput(req.body)

    if(!isValid){
        return res.status(400).json(errors);
    }

    if (req.body.category == "Common" && req.body.type == null) {
      Category.find({ category: req.body.category})
        .then((categories) => res.json(categories))
        .catch((err) =>
          res.status(404).json({ nocategoriesfound: "No Categories found" })
        );
    } else if (req.body.category == "Common" && req.body.type) {
      Category.find({ category: req.body.category, type: req.body.type })
        .then((categories) => res.json(categories))
        .catch((err) =>
          res.status(404).json({ nocategoriesfound: "No Categories found" })
        );
    } else if (req.body.category == "LOB" && req.body.type == null) {
      Category.find({ category: req.body.category, lob: req.body.lob })
        .then((categories) => res.json(categories))
        .catch((err) =>
          res.status(404).json({ nocategoriesfound: "No Categories found" })
        );
    } else if (req.body.category == "LOB" && req.body.type) {
      Category.find({
        category: req.body.category,
        lob: req.body.lob,
        type: req.body.type,
      })
        .then((categories) => res.json(categories))
        .catch((err) =>
          res.status(404).json({ nocategoriesfound: "No Categories found" })
        );
    } else if (req.body.category == "PRODUCT" && req.body.type == null) {
      Category.find({
        category: req.body.category,
        product: req.body.product,
        
      })
        .then((categories) => res.json(categories))
        .catch((err) =>
          res.status(404).json({ nocategoriesfound: "No Categories found" })
        );
    } else if (req.body.category == "PRODUCT" && req.body.type) {
      Category.find({
        category: req.body.category,
        product: req.body.product,
        type: req.body.type,
      })
        .then((categories) => res.json(categories))
        .catch((err) =>
          res.status(404).json({ nocategoriesfound: "No Categories found" })
        );
    }
  
  
    
});


module.exports = router;