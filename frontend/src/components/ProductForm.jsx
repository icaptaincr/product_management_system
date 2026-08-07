import {
  Button,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductForm({ editingProduct, onSuccess }) {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    image: "",
    rating: "",
  });

  useEffect(() => {
    if (editingProduct) {
      setProduct(editingProduct);
    } else {
      setProduct({
        title: "",
        price: "",
        image: "",
        rating: "",
      });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (editingProduct) {
        await axios.put(
          `http://localhost:3000/products/${editingProduct._id}`,
          product
        );
        alert("Product Updated Successfully");
      } else {
        await axios.post(
          "http://localhost:3000/products",
          product
        );
        alert("Product Added Successfully");
      }
      setProduct({
  title: "",
  price: "",
  image: "",
  rating: "",
});
      onSuccess();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Stack spacing={4}>
      <Input
        placeholder="Product Title"
        name="title"
        value={product.title}
        onChange={handleChange}
      />

      <Input
        placeholder="Price"
        name="price"
        type="number"
        value={product.price}
        onChange={handleChange}
      />

      <Input
        placeholder="Image URL"
        name="image"
        value={product.image}
        onChange={handleChange}
      />

      <Input
        placeholder="Rating"
        name="rating"
        type="number"
        value={product.rating}
        onChange={handleChange}
      />

      <Button colorScheme="teal" onClick={handleSubmit}>
        {editingProduct ? "Update Product" : "Add Product"}
      </Button>
    </Stack>
  );
}

export default ProductForm;