import React from 'react';
import { Box, Button, Center, Heading, Text, VStack, Icon } from '@chakra-ui/react';
import { FaClipboardList } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

const NoTasks = () => {
  return (
    <Center minH="50vh" px={4}>
      <VStack spacing={4} >
        <Icon as={FaClipboardList} boxSize={16}  />
        <Heading size="lg" >
          No Tasks Found
        </Heading>
        <Text >
          You haven’t added any tasks yet. Let’s get started!
        </Text>
        <Button
          as={RouterLink}
          to="/tasks/add"
          colorScheme="blue"
          size="md"
        >
          Add New Task
        </Button>
      </VStack>
    </Center>
  );
};

export default NoTasks;
