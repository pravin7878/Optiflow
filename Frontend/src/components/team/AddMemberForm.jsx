import React, { useState } from "react";
import { registerUser } from "../../app/actions/user";
import { Button, Field, Fieldset, Input, Stack, Box, Text } from "@chakra-ui/react"
import { GetAddress } from "../custom/GetAddress";
import { useDispatch, useSelector } from "react-redux";
import { toaster } from "../ui/toaster";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";


const AddMemberForm = () => {
  const dispatch = useDispatch()
  const { error, loading } = useSelector(state => state.user)
  const [form, setForm] = useState({
    name: "pravin kumar",
    email: "pravinkumar787835@gmail.com",
    password: "123456",
    role: "teammember",
    department: "it",
    position: "developer",
    salary: "20000",
    dateOfJoining: "",
    address: {
      country: "",
      state: "",
      district: "",
      village: "",
      pinCode: ""
    }
  });



  console.log(useSelector(state => state.user))

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
          department: "",
          position: "",
          salary: "",
          dateOfJoining: "",
          address: {
            country: "",
            state: "",
            district: "",
            village: "",
            pinCode: ""
          }
        });
      }

    } catch (err) {
      console.log(err)
    }
  };

  return (<>
    <div
      className='flex justify-end py-3'
    >
      <Link to={"/team"}>
        <Button fontWeight={"bold"} mb={4}>
          <AiOutlineArrowLeft />
          View Team
        </Button>
      </Link>
    </div>


    <Box as="form" onSubmit={handleSubmit} p={4} borderWidth={1} borderRadius="md" boxShadow="sm">

      <Fieldset.Root size="lg" maxW="md" >
        <Stack>
          <Fieldset.Legend>Employ Details Form</Fieldset.Legend>
          <Fieldset.HelperText>
            Please provide Employ Details below.
          </Fieldset.HelperText>
        </Stack>
        {
          error?.errors ? error.errors.map((error, idx) =>
            <Text key={idx} fontSize={"sm"} m={0} mt={1} color={"red"}>{error}</Text>
          )
            :
            error?.massage || error?.message ?
              <Text fontSize={"sm"} m={0} mt={1} color={"red"}>{error?.massage || "Something Went wrong , Try after some time."} </Text>
              :
              ""
        }
        <Fieldset.Content>
          <Field.Root >
            <Field.Label>Name</Field.Label>
            <Input name="name" value={form.name} onChange={handleChange} required />
          </Field.Root>

          <Field.Root>
            <Field.Label>Email address</Field.Label>
            <Input name="email" type="email" value={form.email} onChange={handleChange} required />
          </Field.Root>

          <Field.Root>
            <Field.Label>
              Password
            </Field.Label>
            <Input name="password" type="password" value={form.password} onChange={handleChange} required />
          </Field.Root>

          <Field.Root>
            <Field.Label>
              Department
            </Field.Label>
            <Input name="department" value={form.department} onChange={handleChange} />
          </Field.Root>

          <Field.Root>
            <Field.Label>
              Position
            </Field.Label>
            <Input name="position" value={form.position} onChange={handleChange} />
          </Field.Root>

          <Field.Root>
            <Field.Label>
              Address
            </Field.Label>
          </Field.Root>
          <GetAddress value={form.address} onChange={handleAddressChange} />

          <Field.Root >
            <Field.Label>
              Joining Date
            </Field.Label>
            <Input type="date" name="dateOfJoining" value={form.dateOfJoining} onChange={handleChange} />
          </Field.Root>

          <Field.Root >
            <Field.Label>
              Salary
            </Field.Label>
            <Input type="number" name="salary" value={form.salary} onChange={handleChange} />
          </Field.Root>

        </Fieldset.Content>


        <Button type="submit" loading={loading} loadingText="Adding" spinnerPlacement="end">
          ADD
        </Button>
      </Fieldset.Root>
    </Box >
  </>

  );
};

export default AddMemberForm;