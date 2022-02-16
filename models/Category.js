const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
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
    required:true,
  },
  testCase: {
    type: String,
    required:true
  },
  product: {
    type: String,
    required:false
  },
});

module.exports = Category = mongoose.model("category", CategorySchema);
