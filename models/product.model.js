const mongoose = require("mongoose");

const product = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
      required: true,
    },
    rating: {
      type: Number,
      // type: mongoose.Decimal128,
      // required: true,
    },
    company: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("product", product);
module.exports = Product;
