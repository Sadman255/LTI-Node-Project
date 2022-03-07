const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Category = require("../../models/Category");
const validateCategorySearchInput = require("../../validation/categorySearch");
const validateCategoryCreateInput = require("../../validation/categoryCreate");


// const searchCategories = ( category) =>{
//     if (req.body.category && req.body.type && req.body.testCase){
//         category.category
//           .toLowerCase()
//           .includes(req.body.category.toLowerCase());
//     }
      
    
// }

router.post("/search", (req, res) => {

    const {errors, isValid} = validateCategorySearchInput(req.body)

    if(!isValid){
        console.log('entered error')
        return res.status(400).json(errors);
    }

    if (req.body.category.toLowerCase() === "common" && !req.body.type) {
        //console.log("entered category=common but no type")
      Category.find({ category: {$regex: new RegExp(req.body.category, "i") }})
        .then((categories) => res.json(categories))
        .catch((err) =>
          res.status(404).json({ nocategoriesfound: "No Categories found" })
        );
    } else if (req.body.category.toLowerCase() === "common" && req.body.type) {
        console.log("entered")
      Category.find({
        category: { $regex: new RegExp(req.body.category, "i") },
        type: { $regex: new RegExp(req.body.type, "i") },
      })
        .then((categories) => res.json(categories))
        .catch((err) =>
          res.status(404).json({ nocategoriesfound: "No Categories found" })
        );
    } else if (req.body.category.toLowerCase() === "lob" &&  req.body.lob && !req.body.type) {
      Category.find({
        category: { $regex: new RegExp(req.body.category, "i") },
        lob: { $regex: new RegExp(req.body.lob, "i") },
      })
        .then((categories) => res.json(categories))
        .catch((err) =>
          res.status(404).json({ nocategoriesfound: "No Categories found" })
        );
    } else if (req.body.category.toLowerCase() === "lob" && req.body.lob && req.body.type) {
      Category.find({
        category: { $regex: new RegExp(req.body.category, "i") },
        lob: { $regex: new RegExp(req.body.lob, "i") },
        type: { $regex: new RegExp(req.body.type, "i") },
      })
        .then((categories) => res.json(categories))
        .catch((err) =>
          res.status(404).json({ nocategoriesfound: "No Categories found" })
        );
    } else if (req.body.category.toLowerCase() === "product" && req.body.product && !req.body.type) {
        console.log("entered product")
      Category.find({
        category: { $regex: new RegExp(req.body.category, "i") },
        product: { $regex: new RegExp(req.body.product, "i") },
      })
        .then((categories) => res.json(categories))
        .catch((err) =>
          res.status(404).json({ nocategoriesfound: "No Categories found" })
        );
    } else if (req.body.category.toLowerCase() === "product" && req.body.product && req.body.type) {
      Category.find({
        category: { $regex: new RegExp(req.body.category, "i") },
        product: { $regex: new RegExp(req.body.product, "i") },
        type: { $regex: new RegExp(req.body.type, "i") },
      })
        .then((categories) => res.json(categories))
        .catch((err) =>
          res.status(404).json({ nocategoriesfound: "No Categories found" })
        );
    }
  
  
    
});

router.post("/create",(req, res) => {
    const { errors, isValid } = validateCategoryCreateInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

     Category.init();

    const newCategory = new Category({
    _id: new mongoose.Types.ObjectId(),
      category: req.body.category,
      lob: req.body.lob,
      product: req.body.product,
      type: req.body.type,
      testCase: req.body.testCase
    },{ collection: 'TestScenarios' });

    newCategory.save().then((category) => res.json(category));
  }
);


module.exports = router;