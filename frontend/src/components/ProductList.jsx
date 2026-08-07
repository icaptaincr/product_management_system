import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Spinner,
  Center,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState("mongodb");

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchMongoProducts = async () => {
    setLoading(true);

    try {
      const res = await axios.get("http://localhost:3000/products");
      setProducts(res.data.data);
      setSource("mongodb");
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const fetchFakeProducts = async () => {
    setLoading(true);

    try {
      const res = await axios.get("https://fakestoreapi.com/products");

      const formatted = res.data.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        rating: item.rating.rate,
      }));

      setProducts(formatted);
      setSource("fake");
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchMongoProducts();
  }, []);

  const handleAdd = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
    fetchMongoProducts();
  };

  if (loading) {
    return (
      <Center mt={10}>
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box p={8}>
      <Heading mb={6}>
        {source === "mongodb"
          ? "MongoDB Products"
          : "Fake Store Products"}
      </Heading>

      <Button colorScheme="teal" mr={4} onClick={fetchMongoProducts}>
        MongoDB Products
      </Button>

      <Button colorScheme="orange" mr={4} onClick={fetchFakeProducts}>
        Fake Store Products
      </Button>

      {source === "mongodb" && (
        <Button colorScheme="green" onClick={handleAdd}>
          + Add Product
        </Button>
      )}

      {showForm && (
        <Box
          mt={8}
          p={6}
          borderWidth="1px"
          borderRadius="lg"
          bg="white"
        >
          <Heading size="md" mb={4}>
            {editingProduct ? "Edit Product" : "Add Product"}
          </Heading>

          <ProductForm
            editingProduct={editingProduct}
            onSuccess={handleSuccess}
          />
        </Box>
      )}

      {products.length === 0 ? (
        <Center mt={10}>
          <Text fontSize="xl" color="gray.500">
            No Products Found
          </Text>
        </Center>
      ) : (
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 4 }}
          spacing={6}
          mt={8}
        >
          {products.map((product) => (
            <ProductCard
              key={product._id || product.id}
              product={product}
              source={source}
              onEdit={handleEdit}
            />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}

export default ProductList;