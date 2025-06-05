import mongoose from "mongoose";

// schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // ensures that the createdAt and updatedAt fields are there
  }
);

// model
const Product = mongoose.model("Product", productSchema);
// products collection will be created
export default Product;
