import React from 'react';
import { Box, Text, Button, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const TeamCard = ({ member }) => {
  return (
    <Box borderWidth={1} borderRadius="md" p={4} mb={3} boxShadow="sm">
      <Text fontWeight="bold">{member.name}</Text>
      <HStack  justify={"space-between"} wrap={"wrap"}>
        <Text>Department: {member.department}</Text>
        <Text>Position: {member.position}</Text>
        <Text>Email: {member.email}</Text>
        <Button as={Link} to={`/team/${member._id}`} size="sm" mt={2} colorScheme="blue">
          View Details
        </Button>
      </HStack>

      {/* <HStack justify={"end"}>
        <Button as={Link} to={`/team/${member._id}`} size="sm" mt={2} colorScheme="blue">
        View Details
      </Button>
      </HStack> */}
    </Box>
  );
};
