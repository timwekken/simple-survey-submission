import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import Home from "./pages/Home";
import Login from "./pages/Login";

import "./App.css";

function App() {
  return (
    <>
      <Box pb={4}>
        <Box as="header" py={8} px={8} bg="gray.50" boxShadow="sm">
          <Flex align="center">
            <Heading>Simple Survey Submission System</Heading>
            <Spacer />
            <Text fontSize="md" color="gray.600">
              Welcome, <strong>{"Guest"}</strong>
            </Text>
          </Flex>
        </Box>
      </Box>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
