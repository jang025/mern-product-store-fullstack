import express from "express";
import Product from "../models/productModel.js";
import mongoose from "mongoose";

const router = express.Router();

//! GET all products
router.get("/", async (req, res) => {
  try {
    // fetch all products in the database
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error in fetching products", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

//! Create a product
router.post("/", async (req, res) => {
  const product = req.body; // user will send this data

  // requirements
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in creating product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

//! Delete a product

router.delete("/:id", async (req, res) => {
  // get the id
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Product" });
  }

  // check for the id in the database
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

//! Update a product

router.patch("/:id", async (req, res) => {
  const { id } = req.params;

  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Product" });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;
