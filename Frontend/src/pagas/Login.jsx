import { loginUser } from "../app/actions/user";
import axios from "axios"
import {
    Button,
    Center,
    Field,
    Fieldset,
    For,
    HStack,
    Input,
    NativeSelect,
    Stack,
    Text
  } from "@chakra-ui/react"
  import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"

  const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

  const { user, loading, error } = useSelector((state) => state.user);


  
  
    const [data,setData] = useState({
      email : "",
      password : ""
    })
    const [validationError, setValidationError] = useState("");
   
    
const handelChange = (e)=>{
  
const {name,value} = e.target
setData({...data, [name] : value})
}






const handelSubmit = async(e)=>{
  e.preventDefault()
  // Frontend validation
  if (!data.email || !data.password) {
    setValidationError("All fields are required.");
    return;
  }
  if (data.password.length < 6) {
    setValidationError("Password must be at least 6 characters.");
    return;
  }

  console.log(data)
//   setValidationError("");
  const result = await dispatch(loginUser(data)); // Dispatch login action
  console.log("action is dispatched",result)
  if (result.payload?.accessToken) {
  
    setData({
      email: "",
      password: "",
    });



    navigate("/");
  }
  else{
    console.log(result)
  }
}




    return (
    <Center py={5}>
      <Fieldset.Root  size="lg" maxW="md">
       
        <Stack>
          <Fieldset.Legend>Login Now</Fieldset.Legend>
          <Fieldset.HelperText>
            Please provide your details below.
          </Fieldset.HelperText>
        </Stack>
        {error && <Text size={"sm"} color="red.500">{error?.message}</Text>}
        {validationError && <Text size={"sm"} color="red.500">{validationError}</Text>}
        {user && <p>Welcome, {user.name}!</p>}
        <Fieldset.Content >
          <Field.Root>
            <Field.Label>Email address</Field.Label>
            <Input value={data.email} onChange={handelChange} name="email" type="email" />
          </Field.Root>
  
          <Field.Root>
            <Field.Label>Password</Field.Label>
            <Input value={data.password} onChange={handelChange} name="password" type="text" />
          </Field.Root>
        </Fieldset.Content>
  
  
        <Button
          onClick={handelSubmit}
          alignSelf="flex-start"
          loading={loading}
          type="button"
        >
          SingIn
        </Button>
        <HStack>
        <Fieldset.HelperText>
            If you dontn't have a account , you can
          </Fieldset.HelperText>
          <Text _hover={{textDecoration : "underline"}}><Link  to={"/singup"}>SingUp</Link></Text>
        </HStack>
        
      </Fieldset.Root>
      </Center>
    )
  }

  export default Login
  


