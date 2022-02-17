const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  _id: {
    type: mongoose.Schema.ObjectId,
    required: false,
  },
  category: {
    type: String,
    required: true,
  },
  lob: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: true,
  },
  testCase: {
    type: String,
    required: false,
  },
  product: {
    type: String,
    required: false,
  },
});

module.exports = Category = mongoose.model("TestScenarios", CategorySchema, "TestScenarios");
