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

export const GetAddress = ({ value, onChange }) => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);

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

    const handleChange = async (name, option) => {
        const val = option ? option.value : "";
        const updated = { ...value, [name]: val };
        onChange(updated);

        if (name === "country") {
            setStates([]);
            setDistricts([]);
            if (val) await getStates(val);
        }
        if (name === "state") {
            setDistricts([]);
            if (val) await getCities(value.country, val);
        }
    };

    useEffect(() => {
        getCountries();
    }, []);

    return (
        <VStack>
            <Select
                name="country"
                placeholder="Select country"
                options={countries}
                value={countries.find((c) => c.value === value.country) || null}
                onChange={(option) => handleChange("country", option)}
                isClearable
            />
            <Select
                name="state"
                placeholder="Select state"
                options={states}
                value={states.find((s) => s.value === value.state) || null}
                onChange={(option) => handleChange("state", option)}
                isClearable
                isDisabled={!value.country}
            />
            <Select
                name="district"
                placeholder="Select district"
                options={districts}
                value={districts.find((d) => d.value === value.district) || null}
                onChange={(option) => handleChange("district", option)}
                isClearable
                isDisabled={!value.state}
            />
        </VStack>
    );
};
