import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [5, "Title must be at least 5 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
      trim: true,
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [1, "Price must be greater than 0"],
    },

    image: {
      type: String,
      required: [true, "Image URL is required"],
      match: [
  /^https?:\/\/.+/,
  "Please enter a valid URL",
],
    },

    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [0, "Minimum rating is 0"],
      max: [5, "Maximum rating is 5"],
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;