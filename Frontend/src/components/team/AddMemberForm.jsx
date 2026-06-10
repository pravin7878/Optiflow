import React, { useState } from "react";
import { registerUser } from "../../app/actions/user";
import {
  Button,
  Field,
  Fieldset,
  Input,
  Stack,
  Box,
  Text,
  SimpleGrid,
  NativeSelect,
} from "@chakra-ui/react";
import { GetAddress } from "../custom/GetAddress";
import { useDispatch, useSelector } from "react-redux";
import { toaster } from "../ui/toaster";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

const departments = [
  "Engineering",
  "Human Resources",
  "Marketing",
  "Sales",
  "Finance",
  "Operations",
  "Customer Support",
  "Product Management",
];

const positions = [
  "Intern",
  "Junior Developer",
  "Software Engineer",
  "Senior Software Engineer",
  "Team Lead",
  "Project Manager",
  "HR Executive",
  "Marketing Executive",
  "Sales Executive",
];

const AddMemberForm = () => {
  const dispatch = useDispatch();

  const { error, loading } = useSelector((state) => state.user);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "teammember",
    department: "Engineering",
    position: "Software Engineer",
    salary: "",
    dateOfJoining: "",
    address: {
      country: "",
      state: "",
      district: "",
      village: "",
      pinCode: "",
    },
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddressChange = (address) => {
    setForm((prev) => ({
      ...prev,
      address,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(registerUser(form));

      if (registerUser.fulfilled.match(resultAction)) {
        toaster.create({
          description: "Member Added Successfully",
          type: "success",
        });

        setForm({
          name: "",
          email: "",
          password: "",
          role: "teammember",
          department: "Engineering",
          position: "Software Engineer",
          salary: "",
          dateOfJoining: "",
          address: {
            country: "",
            state: "",
            district: "",
            village: "",
            pinCode: "",
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex justify-end py-3">
        <Link to="/team">
          <Button fontWeight="bold" mb={4}>
            <AiOutlineArrowLeft />
            View Team
          </Button>
        </Link>
      </div>

      <Box
        as="form"
        onSubmit={handleSubmit}
        p={6}
        borderWidth={1}
        borderRadius="md"
        boxShadow="sm"
      >
        <Fieldset.Root size="lg" maxW="100%">
          <Stack mb={6}>
            <Fieldset.Legend>Employee Details Form</Fieldset.Legend>

            <Fieldset.HelperText>
              Please provide employee details below.
            </Fieldset.HelperText>
          </Stack>

          {error?.errors
            ? error.errors.map((err, idx) => (
              <Text
                key={idx}
                fontSize="sm"
                mt={1}
                color="red.500"
              >
                {err}
              </Text>
            ))
            : (error?.massage || error?.message) && (
              <Text fontSize="sm" mt={1} color="red.500">
                {error?.massage ||
                  error?.message ||
                  "Something went wrong. Please try again later."}
              </Text>
            )}

          <Fieldset.Content>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
              <Field.Root>
                <Field.Label>Name</Field.Label>
                <Input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>Email Address</Field.Label>
                <Input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>Password</Field.Label>
                <Input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>Department</Field.Label>
                <NativeSelect.Root>
                  <NativeSelect.Field
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                  >
                    {departments.map((department) => (
                      <option
                        key={department}
                        value={department}
                      >
                        {department}
                      </option>
                    ))}
                  </NativeSelect.Field>
                </NativeSelect.Root>
              </Field.Root>

              <Field.Root>
                <Field.Label>Position</Field.Label>
                <NativeSelect.Root>
                  <NativeSelect.Field
                    name="position"
                    value={form.position}
                    onChange={handleChange}
                  >
                    {positions.map((position) => (
                      <option
                        key={position}
                        value={position}
                      >
                        {position}
                      </option>
                    ))}
                  </NativeSelect.Field>
                </NativeSelect.Root>
              </Field.Root>

              <Field.Root>
                <Field.Label>Joining Date</Field.Label>
                <Input
                  type="date"
                  name="dateOfJoining"
                  value={form.dateOfJoining}
                  onChange={handleChange}
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>Salary</Field.Label>
                <Input
                  type="number"
                  name="salary"
                  value={form.salary}
                  onChange={handleChange}
                />
              </Field.Root>
            </SimpleGrid>

            <Box mt={6}>
              <Field.Root mb={3}>
                <Field.Label>Address</Field.Label>
              </Field.Root>

              <GetAddress
                value={form.address}
                onChange={handleAddressChange}
              />
            </Box>
          </Fieldset.Content>

          <Button
            mt={6}
            type="submit"
            loading={loading}
            loadingText="Adding"
            spinnerPlacement="end"
            alignSelf="flex-start"
          >
            Add Member
          </Button>
        </Fieldset.Root>
      </Box>
    </>
  );
};

export default AddMemberForm;