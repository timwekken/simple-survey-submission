import { JSX, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Box, Button, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import Home from "./pages/Home";
import Login from "./pages/Login";

import "./App.css";

// Protected route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = localStorage.getItem("authToken") !== null;
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for authentication on component mount and updates
    const token = localStorage.getItem("authToken");
    const userStr = localStorage.getItem("currentUser");

    if (token && userStr) {
      const userData = JSON.parse(userStr);
      setCurrentUser(userData.email || "User"); // Use email or fallback to "User"
      setIsAuthenticated(true);
    } else {
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  return (
    <>
      <Box pb={4}>
        <Box as="header" py={8} px={8} bg="gray.50" boxShadow="sm">
          <Flex align="center">
            <Heading>Simple Survey Submission System</Heading>
            <Spacer />
            {isAuthenticated && (
              <>
                <Text fontSize="md" color="gray.600">
                  Welcome, <strong>{currentUser}</strong>
                </Text>
                <Button
                  colorPalette="red"
                  variant="outline"
                  ml="4"
                  size="sm"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}
          </Flex>
        </Box>
      </Box>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
