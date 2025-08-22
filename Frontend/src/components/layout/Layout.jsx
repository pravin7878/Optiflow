import React from 'react';
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({children}) => {
  return (
    <Flex >
      <Box hideBelow={"md"} shadow={"md"} h={"full"} w={{md:"30%",lg:"20%"}}>
        <Sidebar />
      </Box>
      <Box w={"full"}>
        <Header/>
       <Box
       p={5}
       >
       {children}
       </Box>
       <Footer/>
      </Box>
    </Flex>
  );
};

export default Layout;
