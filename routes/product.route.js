const express = require("express");
const Product = require("../models/product.model");
const router = express.Router();

// Add the product
router.post("/add", async (req, res) => {
  try {
    console.log(req.body);
    const { productId, name, price, featured, rating, company } = req.body;
    const isUniqueId = await Product.find({ productId });
    console.log(isUniqueId);
    if (isUniqueId.length) {
      return res
        .status(500)
        .send({ message: "failure", error: "Enter unique ProductId" });
    }
    const product = await new Product({
      productId,
      name,
      price,
      featured,
      rating: rating == null ? null : rating,
      company,
    }).save();

    res.status(200).send({ message: "success", product_saved: product });
  } catch (error) {
    res.status(500).send(`Something went wrong ${error}`);
  }
});
//get all product
router.get("/all", async (req, res) => {
  try {
    const product = await Product.find();
    return res.status(200).send(product);
  } catch (error) {
    res.status(500).send(`Something Went Wrong: ${error}`);
  }
});
//update a product
router.post("/update/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const fieldToUpdate = req.body;
    //delete unavailable field
    for (const [key, value] of Object.entries(fieldToUpdate)) {
      if (!value) {
        delete fieldToUpdate[key];
      }
    }
    console.log(fieldToUpdate);
    const updatedProduct = await Product.findOneAndUpdate(
      { productId },
      { $set: { ...fieldToUpdate } },
      {
        new: true,
      }
    );
    if (!updatedProduct) {
      return res.send({
        message: "failure",
        product_updated: "Product Not Found",
      });
    }
    return res
      .status(200)
      .send({ message: "success", product_updated: updatedProduct });
  } catch (error) {
    res.status(500).send(`Something Went Wrong: ${error}`);
  }
});
//delete a product
router.delete("/delete/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    const deletedProduct = await Product.findOneAndDelete({ productId });
    if (!deletedProduct) {
      return res.send({
        message: "failure",
        product_updated: "Product Not Found",
      });
    }
    return res
      .status(200)
      .send({ message: "success", product_deleted: deletedProduct });
  } catch (error) {
    res.status(500).send(`Something Went Wrong: ${error}`);
  }
});
//fetch featured product
router.get("/getFeatured", async (req, res) => {
  try {
    const featuredProduct = await Product.find({ featured: true });

    return res
      .status(200)
      .send({ message: "success", product_featured: featuredProduct });
  } catch (error) {
    res.status(500).send(`Something Went Wrong: ${error}`);
  }
});
//fetch product with price less than given
router.get("/filterPrice", async (req, res) => {
  try {
    const product = await Product.find({ price: { $lte: req.body.price } });

    return res
      .status(200)
      .send({ message: "success", product_featured: product });
  } catch (error) {
    res.status(500).send(`Something Went Wrong: ${error}`);
  }
});
//fetch product with rating higher than given
router.get("/filterRating", async (req, res) => {
  try {
    const product = await Product.find({ rating: { $gte: req.body.rating } });

    return res
      .status(200)
      .send({ message: "success", product_featured: product });
  } catch (error) {
    res.status(500).send(`Something Went Wrong: ${error}`);
  }
});
module.exports = router;
