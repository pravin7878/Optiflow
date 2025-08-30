import React from 'react';
import { Box, Heading, Text, Button, VStack, Icon } from '@chakra-ui/react';
import { FiAlertCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box minH="68vh" display="flex" alignItems="center" justifyContent="center" >
      <VStack spacing={6} p={8}  rounded="xl" shadow="lg">
        <Icon as={FiAlertCircle} boxSize={12} color="red.400" />
        <Heading size="lg" >
          404 - Page Not Found
        </Heading>
        <Text  textAlign="center" maxW="md">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </Text>
        <Button colorScheme="teal" onClick={() => navigate('/')}>
          Go Home
        </Button>
      </VStack>
    </Box>
  );
}