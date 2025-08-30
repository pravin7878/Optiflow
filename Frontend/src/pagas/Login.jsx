import { loginUser } from "../app/actions/user";
import {
  Button,
  Center,
  Field,
  Fieldset,
  HStack,
  Input,
  Stack,
  Text,
  Box,
  Flex,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [validationError, setValidationError] = useState("");

  const handelChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!data.email || !data.password) {
      setValidationError("All fields are required.");
      return;
    }
    if (data.password.length < 6) {
      setValidationError("Password must be at least 6 characters.");
      return;
    }

    setValidationError("");

    const result = await dispatch(loginUser(data)); // Dispatch login action
    if (result.payload?.accessToken) {
      setData({
        email: "",
        password: "",
      });
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
          {validationError && <Text fontSize="sm" color="red.500">{validationError}</Text>}
          {user && <Text fontSize="sm">Welcome, {user.name}!</Text>}

          <Fieldset.Root size="lg" as="form" >
            <Fieldset.Content>
              <Field.Root>
                <Field.Label>Email address</Field.Label>
                <Input
                  value={data.email}
                  onChange={handelChange}
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>Password</Field.Label>
                <Input
                  value={data.password}
                  onChange={handelChange}
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </Field.Root>
            </Fieldset.Content>

            <Button
              type="button"
              onClick={handelSubmit}
              loading={loading}
              colorScheme="blue"
              w="full"
              mt={4}
            >
              Sign In
            </Button>
          </Fieldset.Root>
{/* 
          <HStack justify="center">
            <Text fontSize="sm" color="gray.500">
              Don’t have an account?
            </Text>
            <Text
              as={Link}
              to="/signup"
              fontSize="sm"
              color="blue.500"
              _hover={{ textDecoration: "underline" }}
            >
              Sign Up
            </Text>
          </HStack> */}
        </Stack>
      </Box>
    </Flex>
  );
};

export default Login;
