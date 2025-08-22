import React, { useEffect } from "react"

import Team from "../components/custom/Team";
import Projects from "../components/custom/Projects";
import Stats from "../components/custom/Stats";
import { Text, Box, Flex, HStack, Button, VStack } from "@chakra-ui/react";
import Settings from "../components/custom/Settings";
import { useDispatch } from "react-redux";
import { fetchAllUsers } from "../app/actions/user";
import { fetchTasks } from "@/app/actions/task";

const Dashboard = () => {
const dispatch = useDispatch()


  useEffect(()=>{
  dispatch(fetchAllUsers())
  dispatch(fetchTasks())
  },[])
  return (<>
    <Text fontSize={{ base: "sm", md: "2xl" }} fontWeight="bold" mb={4}>Welcome to Dashboard 👋</Text>
    <Flex direction={"column"} gap={3}>
      <Stats />
      <Flex direction={{ base: "column", lg: "row" }} align={"start"} gap={3}>
        <Box w={{ base: "full", lg: "70%" }}>
          <Projects />
        </Box>
        <VStack w={"full"} align={"start"} px={3}>
          <Team />
          <Settings />
        </VStack>
      </Flex>
    </Flex>
  </>);
};

export default Dashboard;
