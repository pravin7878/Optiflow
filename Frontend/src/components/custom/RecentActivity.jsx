import React, { useEffect, useState } from 'react';
import { Box, Heading, VStack, Text, HStack, Avatar, Spinner } from '@chakra-ui/react';
import api from '../../app/api'; // Your axios instance
import dayjs from 'dayjs';

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch recent activities from backend
    api.get('/activity')
      .then(res => setActivities(res.data))
      .catch(() => setActivities([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box mt={3}  p={6} rounded="lg" shadow="md" w="full">
      <Heading size="md" mb={4}>Recent Activity</Heading>
      {loading ? (
        <Spinner />
      ) : (
        <VStack align="stretch" spacing={4}>
          {activities.length === 0 ? (
            <Text color="gray.500">No recent activity.</Text>
          ) : (
            activities.map((activity, idx) => (
              <HStack key={idx} spacing={4} align="center">
              <Avatar name={activity.userId?.name || "User"} size="sm" />
                <Box flex="1">
                  <Text fontWeight="bold">{activity.userId?.name}</Text>
                  <Text fontSize="sm" color="gray.500">{activity.message}</Text>
                </Box>
                <Text fontSize="xs" color="gray.400">
                  {dayjs(activity.createdAt).format('MMM D, YYYY h:mm A')}
                </Text>
              </HStack>
            ))
          )}
        </VStack>
      )}
    </Box>
  );
};

export default RecentActivity;