const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  _id: {
    type: mongoose.Schema.ObjectId,
    required: false,
  },
  testCaseId: {
    type: mongoose.Schema.ObjectId,
    required: false,
  },
  product: {
    type: String,
    required: true,
  },
  lob: {
    type: String,
    required: false,
  },
  module: {
    type: String,
    required: true,
  },
  testCase: {
    type: String,
    required: false,
  },
  testStep: {
    type: Array,
    required: false,
  },
  expectedResult: {
    type: Array,
    required: false,
  }
});

module.exports = Product = mongoose.model("TestScenarios", ProductSchema, "TestScenarios");
