import React, { useState } from "react";
// import { Box, Select, useToast, Text, Label } from "@chakra-ui/react";
/* 
import axios from "axios";

import {
  Button,
  Field,
  Fieldset,
  For,
  Input,
  NativeSelect,
  Stack,
  Box,
  Select
} from "@chakra-ui/react"
import { GetAddress } from "../custom/GetAddress";


const AddMemberForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
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
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);



  // const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target
    // if(name === "adress"){

    // }
    setForm({ ...form, [e.target.name]: e.target.value });
  };



  const getStates = async (country) => {
    try {
      const res = await axios.post("https://countriesnow.space/api/v0.1/countries/states", {
        country,
      });

      setStates(res.data.data.states.map((s) => ({ label: s.name, value: s.name })));
    } catch (error) {
      console.error(error);
    }
  };

  //  Get cities (districts) based on selected state
  const getCities = async (country, state) => {
    try {
      const res = await axios.post("https://countriesnow.space/api/v0.1/countries/state/cities", {
        country,
        state,
      });
      setDistricts(res.data.data.map((d) => ({
        label: d,
        value: d,
      })));
    } catch (error) {
      console.error(error);
    }
  };


  const handleAddressChange = async (name, option) => {
    const value = option ? option.value : "";
    setForm((prev) => ({
      ...prev,
      address: {
        [name]: value,
      }
    }));

    if (name === "country") {
      setStates([]);
      setDistricts([]);
      if (value) await getStates(value);
    }
    if (name === "state") {
      setDistricts([]);
      if (value) await getCities(form.address.country, value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(FormData)
    // setLoading(true);
    // try {
    //   await axios.post("/api/users", form); // Adjust endpoint as needed
    //   // toast({
    //   //   title: "Member added.",
    //   //   status: "success",
    //   //   duration: 2000,
    //   //   isClosable: true,
    //   // });
    //   setForm({ name: "", email: "", password: "", department: "", position: "", role: "teammember" });
    //   if (onSuccess) onSuccess();
    // } catch (err) {
    //   // toast({
    //   //   title: "Error adding member.",
    //   //   description: err.response?.data?.message || "Something went wrong.",
    //   //   status: "error",
    //   //   duration: 3000,
    //   //   isClosable: true,
    //   // });
    // }
    // setLoading(false);
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4} borderWidth={1} borderRadius="md" boxShadow="sm">
      <Fieldset.Root size="lg" maxW="md">
        <Stack>
          <Fieldset.Legend>Employ Details Form</Fieldset.Legend>
          <Fieldset.HelperText>
            Please provide Employ Details below.
          </Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
          <Field.Root>
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
          <GetAddress countries={countries} states={states} districts={districts} address={form.address} handleAddressChange={handleAddressChange}/>


        </Fieldset.Content>

        <Button type="submit" colorScheme="blue" isLoading={loading}>
          Add Member
        </Button>
      </Fieldset.Root>
    </Box >
  );
};

export default AddMemberForm;





import React, { useEffect, useState } from "react";
import axios from "axios";
import { Select } from "chakra-react-select";
import {
    Box,
    Button,
    Field,
    NativeSelect,
    VStack,
    //   useToast,
} from "@chakra-ui/react";






export const GetAddress = ({countries,states,districts,address,handleAddressChange}) => {
   

    const [formData, setFormData] = useState({
        country: "",
        state: "",
        district: "",
        village: "",
        pinCode: "",
    });

    //   const toast = useToast();

    // Get all countries
    const getCountries = async () => {
        try {
            const res = await axios.get("https://countriesnow.space/api/v0.1/countries/positions");
            const countryList = res.data.data.map((item) => ({ label: item.name, value: item.name }));
            setCountries(countryList);
        } catch (error) {
            console.error(error);
        }
    };

    //  Get states based on selected country
    

    // const handleChange = async (e) => {
    //     const { name, value } = e.target;

    //     setFormData((prev) => ({
    //         ...prev,
    //         [name]: value,
    //     }));

    //     // Auto-fetch states or districts when parent changes
    //     if (name === "country") {
    //         setStates([]);
    //         setDistricts([]);
    //         await getStates(value);
    //     }

    //     if (name === "state") {
    //         setDistricts([]);
    //         await getCities(formData.country, value);
    //     }
    // };

    // const handleChange = async (name, option) => {
    //     const value = option ? option.value : "";
    //     setFormData((prev) => ({
    //         ...prev,
    //         [name]: value,
    //     }));

    //     if (name === "country") {
    //         setStates([]);
    //         setDistricts([]);
    //         if (value) await getStates(value);
    //     }
    //     if (name === "state") {
    //         setDistricts([]);
    //         if (value) await getCities(formData.country, value);
    //     }
    // };

    console.log("Form submitted:", address);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        // toast({
        //   title: "Address submitted",
        //   description: JSON.stringify(formData),
        //   status: "success",
        //   isClosable: true,
        // });
    };

    useEffect(() => {
        getCountries();
    }, []);

    return (
        <VStack onSubmit={handleSubmit}>
            <Select
                name="country"
                placeholder="Select country"
                options={countries}
                value={countries.find((c) => c.value === address.country) || null}
                onChange={(option) => handleAddressChange("country", option)}
                isClearable
            />
            <Select
                name="state"
                placeholder="Select state"
                options={states}
                value={states.find((s) => s.value === address.state) || null}
                onChange={(option) => handleAddressChange("state", option)}
                isClearable
                isDisabled={!address.country}
            />
            <Select
                name="district"
                placeholder="Select district"
                options={districts}
                value={districts.find((d) => d.value === address.district) || null}
                onChange={(option) => handleAddressChange("district", option)}
                isClearable
                isDisabled={!address.state}
            />

        </VStack>
    );
};

*/