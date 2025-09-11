import { clearErrors } from "@/app/slices/userSlice";
import { loginUser } from "../app/actions/user";
import {
  Button,
  Field,
  Fieldset,
  Input,
  Stack,
  Text,
  Box,
  Flex,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

  const [requestedUrl] = useState(localStorage.getItem("requestedUrl") || "/");
  const [data, setData] = useState({ email: "", password: "" });
  const [validationError, setValidationError] = useState("");
  const [activeButton, setActiveButton] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setValidationError("");
    dispatch(clearErrors());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      setValidationError("Email and password required.");
      return;
    }

    setValidationError("");
    setActiveButton("normal");
    const result = await dispatch(loginUser(data));
    setActiveButton("normal");

    if (result.payload?.accessToken) {
      setData({ email: "", password: "" });
      navigate(requestedUrl || "/");
    }
  };

  // 👇 Guest login handlers
  const handleGuestLogin = async (role) => {
    setActiveButton(role);
    const guestCredentials =
      role === "admin"
        ? { email: "admin@gmail.com", password: "admin@123" }
        : { email: "pravin@gmail.com", password: "123456" };

    const result = await dispatch(loginUser(guestCredentials));
    setActiveButton(null);
    if (result.payload?.accessToken) {
      navigate("/");
    }
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bgGradient="linear(to-r, gray.800, gray.900)"
      px={4}
    >
      <Box
        w="full"
        maxW="md"
        bg="white"
        _dark={{ bg: "gray.800" }}
        rounded="2xl"
        shadow="lg"
        p={8}
      >
        <Stack spacing={4}>
          <Stack textAlign="center">
            <Text fontSize="2xl" fontWeight="bold">
              Login Now
            </Text>
            <Text color="gray.500" _dark={{ color: "gray.400" }}>
              Please provide your details below.
            </Text>
          </Stack>

          {error && <Text fontSize="sm" color="red.500">{error?.message}</Text>}
          {validationError && (
            <Text fontSize="sm" color="red.500">{validationError}</Text>
          )}
          {user && <Text fontSize="sm">Welcome, {user.name}!</Text>}

          {/* Normal Login Form */}
          <Fieldset.Root size="lg" as="form">
            <Fieldset.Content>
              <Field.Root>
                <Field.Label>Email address</Field.Label>
                <Input
                  value={data.email}
                  onChange={handleChange}
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>Password</Field.Label>
                <Input
                  value={data.password}
                  onChange={handleChange}
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </Field.Root>
            </Fieldset.Content>

            <Button
              type="button"
              onClick={handleSubmit}
              loading={loading && activeButton === "normal"}
              colorScheme="blue"
              w="full"
              mt={4}
            >
              Sign In
            </Button>
          </Fieldset.Root>

          {/* Guest Login Buttons */}
          <VStack spacing={3} mt={6}>
            <Button
              type="button"
              loading={loading && activeButton === "user"}
              colorScheme="green"
              w="full"
              onClick={() => handleGuestLogin("user")}
            >
              Login as Guest User
            </Button>
            <Button
              type="button"
              loading={loading && activeButton === "admin"}
              colorScheme="purple"
              w="full"
              onClick={() => handleGuestLogin("admin")}
            >
              Login as Guest Admin
            </Button>
          </VStack>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Login;
