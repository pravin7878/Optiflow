import React, { useEffect } from 'react';
import {
  Box,
  Text,
  Button,
  Stack,
  Avatar,
  Separator,
  Badge,
  HStack,
  VStack,
} from '@chakra-ui/react';

import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../app/actions/user';

export const MemberDetailPage = () => {
  const { memberId } = useParams();
  const dispatch = useDispatch();
  const { user: member } = useSelector(state => state.user);
  console.log(member)
  useEffect(() => {
    dispatch(getUsers(memberId));
  }, [dispatch, memberId]);

  if (!member) {
    return <Text>Loading member details...</Text>;
  }

  return (
    <Box
      borderWidth={1}
      borderRadius="lg"
      p={8}
      mb={6}
      boxShadow="lg"
      maxW="2xl"
      mx="auto"
    // bg="white"
    >
      <VStack spacing={4} align="stretch">
        <HStack spacing={4}>
          <Avatar.Root colorPalette="red">
            <Avatar.Fallback />
            <Avatar.Image src="https://bit.ly/broken-link" />
          </Avatar.Root>
          <Box>
            <Text fontWeight="bold" fontSize="2xl" mb={1}>
              {member.name}
            </Text>
            <Badge colorScheme={member.isActive ? "green" : "red"} fontSize="0.9em">
              {member.isActive ? "Active" : "Inactive"}
            </Badge>
          </Box>
        </HStack>

        <Separator />

        <Stack spacing={1}>
          <Text>
            <b>Email:</b> {member.email}
          </Text>
          <Text>
            <b>Phone:</b> {member.phone || "N/A"}
          </Text>
          <Text>
            <b>Department:</b> {member.department}
          </Text>
          <Text>
            <b>Position:</b> {member.position}
          </Text>
          <Text>
            <b>Joining Date:</b>{" "}
            {member.dateOfJoining ? member.dateOfJoining.slice(0, 10) : "N/A"}
          </Text>
          <Text>
            <b>Salary:</b> {member.salary ? `₹${member.salary}` : "N/A"}
          </Text>
        </Stack>

        <Separator />

        <Box>
          <Text fontWeight="semibold" mb={2}>
            Address
          </Text>
          <Stack spacing={0}>
            <Text>
              <b>Country:</b> {member.address?.country || "N/A"}
            </Text>
            <Text>
              <b>State:</b> {member.address?.state || "N/A"}
            </Text>
            <Text>
              <b>District:</b> {member.address?.district || "N/A"}
            </Text>
            <Text>
              <b>Village:</b> {member.address?.village || "N/A"}
            </Text>
            <Text>
              <b>Pin Code:</b> {member.address?.pinCode || "N/A"}
            </Text>
          </Stack>
        </Box>

        <Button
          as={Link}
          to="/team"
          mt={4}
          colorScheme="blue"
          alignSelf="flex-end"
          variant="outline"
        >
          Back to Team List
        </Button>
      </VStack>
    </Box>
  );
};
