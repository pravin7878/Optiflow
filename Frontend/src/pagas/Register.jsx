import { registerUser } from "../app/actions/user";
import {
  Button,
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

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const [data, setData] = useState({
    name: "",
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
    if (!data.name || !data.email || !data.password) {
      setValidationError("All fields are required.");
      return;
    }
    if (data.password.length < 6) {
      setValidationError("Password must be at least 6 characters.");
      return;
    }
    setValidationError("");

    const result = await dispatch(registerUser(data));
    if (result.payload?.NewMember) {
      setData({
        name: "",
        email: "",
        password: "",
      });
      navigate("/signin");
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
              Register Now
            </Text>
            <Text color="gray.500" _dark={{ color: "gray.400" }}>
              Please provide your details below.
            </Text>
          </Stack>

          {error && (
            <Text fontSize="sm" color="red.500">
              {error?.errors?.[0] || error?.message}
            </Text>
          )}
          {validationError && (
            <Text fontSize="sm" color="red.500">
              {validationError}
            </Text>
          )}

          <Fieldset.Root size="lg" as="form" onSubmit={handelSubmit}>
            <Fieldset.Content>
              <Field.Root>
                <Field.Label>Name</Field.Label>
                <Input
                  value={data.name}
                  onChange={handelChange}
                  name="name"
                  placeholder="Enter your name"
                />
              </Field.Root>

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
              colorScheme="blue"
              w="full"
              mt={4}
              onClick={handelSubmit}
              loading={loading}
            >
              Sign Up
            </Button>
          </Fieldset.Root>

          <HStack justify="center">
            <Text fontSize="sm" color="gray.500">
              Already have an account?
            </Text>
            <Text
              as={Link}
              to="/signin"
              fontSize="sm"
              color="blue.500"
              _hover={{ textDecoration: "underline" }}
            >
              Sign In
            </Text>
          </HStack>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Register;
