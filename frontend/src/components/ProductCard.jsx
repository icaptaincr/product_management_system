import { Box, Image, Text, Button } from "@chakra-ui/react";

function ProductCard({ product, source, onEdit }) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      boxShadow="md"
      bg="white"
      transition="0.3s"
      _hover={{
        transform: "translateY(-5px)",
        boxShadow: "xl",
      }}
    >
      <Image
        src={product.image}
        alt={product.title}
        h="200px"
        w="100%"
        objectFit="contain"
        fallbackSrc="https://via.placeholder.com/200"
      />

      <Text mt={4} fontWeight="bold">
        {product.title}
      </Text>

      <Text color="green.600" fontWeight="bold">
        ₹ {Number(product.price).toLocaleString()}
      </Text>

      <Text color="orange.500" mb={4}>
        ⭐ {product.rating}
      </Text>

      {source === "mongodb" && (
        <Button
          colorScheme="blue"
          width="100%"
          onClick={() => onEdit(product)}
        >
          ✏ Edit Product
        </Button>
      )}
    </Box>
  );
}

export default ProductCard;