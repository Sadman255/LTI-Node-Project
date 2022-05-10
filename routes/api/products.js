const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Product = require("../../models/Product");
const validateProductSearchInput = require("../../validation/productSearch");
const validateProductCreateInput = require("../../validation/productCreate");


// const searchCategories = ( category) =>{
//     if (req.body.category && req.body.type && req.body.testCase){
//         category.category
//           .toLowerCase()
//           .includes(req.body.category.toLowerCase());
//     }
      
    
// }

router.post("/search", (req, res) => {

    const {errors, isValid} = validateProductSearchInput(req.body)
  // if product = policy lob and module is required else product is not equal to policy product and module is required
  // product = policy, claims and billing. Module is required for all
  // return everything. Search by product, lob and module. Lob applicable when product is policy
    if(!isValid){
        console.log('entered error')
        return res.status(400).json(errors);
    }
     console.log("entered product search passed validation")
    if (req.body.product.toLowerCase() === "claims" && !req.body.lob) {
        //console.log("entered category=common but no type")
      Product.find({
        product: { $regex: new RegExp(req.body.product, "i") },
        module: { $regex: new RegExp(req.body.module, "i") },
      })
        .then((products) => res.json(products))
        .catch((err) =>
          res.status(404).json({ noproductsfound: "No Products found" })
        );
    } else if (req.body.product.toLowerCase() === "billing" && !req.body.lob) {
        console.log("entered")
      Product.find({
        product: { $regex: new RegExp(req.body.product, "i") },
        module: { $regex: new RegExp(req.body.module, "i") },
      })
        .then((products) => res.json(products))
        .catch((err) =>
          res.status(404).json({ noproductsfound: "No Products found" })
        );
    } 
    if (req.body.product.toLowerCase() === "claims" && req.body.lob && req.body.module) {
      //console.log("entered category=common but no type")
      Product.find({
        product: { $regex: new RegExp(req.body.product, "i") },
        lob: { $regex: new RegExp(req.body.lob, "i") },
        module: { $regex: new RegExp(req.body.module, "i") },
      })
        .then((products) => res.json(products))
        .catch((err) =>
          res.status(404).json({ noproductsfound: "No Products found" })
        );
    } else if (req.body.product.toLowerCase() === "billing" && req.body.lob && req.body.module) {
      console.log("entered");
      Product.find({
        product: { $regex: new RegExp(req.body.product, "i") },
        lob: { $regex: new RegExp(req.body.lob, "i") },
        module: { $regex: new RegExp(req.body.module, "i") },
      })
        .then((products) => res.json(products))
        .catch((err) =>
          res.status(404).json({ noproductsfound: "No Products found" })
        );
    } else if (
      req.body.product.toLowerCase() === "policy" &&
      req.body.lob &&
      req.body.module
    ) {
      Product.find({
        product: { $regex: new RegExp(req.body.product, "i") },
        lob: { $regex: new RegExp(req.body.lob, "i") },
        module: { $regex: new RegExp(req.body.module, "i") },
      })
        .then((products) => res.json(products))
        .catch((err) =>
          res.status(404).json({ noproductsfound: "No Products found" })
        );
    } 
    
});

router.post('/search/modules', (req,res) =>{
   let allModules = []
   Product.find({
        product: { $regex: new RegExp(req.body.product, "i") },
      })
      .then((products) => {
         allModules = products.map((product) =>{
           if(product.module){
             return product.module
           }
        })
        res.json(allModules)
      })
      .catch((err) =>
          res.status(404).json({ noproductsfound: "No Products found" })
      );
})

router.post("/create",(req, res) => {
    const { errors, isValid } = validateProductCreateInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

     Product.init();

    const newProduct = new Product({
    _id: new mongoose.Types.ObjectId(),
      testCaseId: req.body.testCaseId,
      lob: req.body.lob,
      product: req.body.product,
      module: req.body.module,
      testCase: req.body.testCase,
      testStep: req.body.testStep,
      expectedResult: req.body.expectedResult
    },{ collection: 'TestScenarios' });

    newProduct.save().then((product) => res.json(product));
  }
);


module.exports = router;