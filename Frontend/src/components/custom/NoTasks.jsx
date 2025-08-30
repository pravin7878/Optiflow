import React from 'react';
import { Box, Button, Center, Heading, Text, VStack, Icon } from '@chakra-ui/react';
import { FaClipboardList } from 'react-icons/fa';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const NoTasks = () => {
  const location = useLocation();

  let heading = "No Tasks Found";
  let message = "You haven’t added any tasks yet. Let’s get started!";
  let buttonText = "Add New Task";
  let buttonLink = "/tasks/add";

  if (location.pathname === "/tasks/assigned") {
    heading = "No Assigned Tasks";
    message = "You don’t have any assigned tasks yet.";
    buttonText = "View All Tasks";
    buttonLink = "/tasks";
  }

  return (
    <Center minH="50vh" px={4}>
      <VStack spacing={4} >
        <Icon as={FaClipboardList} boxSize={16}  />
        <Heading size="lg" >
          {heading}
        </Heading>
        <Text >
          {message}
        </Text>
        <Button
          as={RouterLink}
          to={buttonLink}
          colorScheme="blue"
          size="md"
        >
          {buttonText}
        </Button>
      </VStack>
    </Center>
  );
};

export default NoTasks;