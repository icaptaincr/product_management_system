import { Box } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";

function App() {
  return (
    <Box minH="100vh" bg="gray.100">
      <Navbar />
      <ProductList />
    </Box>
  );
}

export default App;