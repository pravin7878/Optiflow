import { Avatar, Box, Button, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { Tooltip } from '../ui/tooltip';

const Team = () => {

    const teamData = [
        {
            id: 1,
            name: "Ananya Verma",
            role: "Frontend Developer",
            avatar: "https://i.pravatar.cc/150?img=32",
            email: "ananya.verma@example.com",
        },
        {
            id: 2,
            name: "Ravi Kumar",
            role: "UI/UX Designer",
            avatar: "https://i.pravatar.cc/150?img=47",
            email: "ravi.kumar@example.com",
        },
        {
            id: 3,
            name: "Sneha Das",
            role: "Project Manager",
            avatar: "https://i.pravatar.cc/150?img=52",
            email: "sneha.das@example.com",
        },
        {
            id: 4,
            name: "Aditya Roy",
            role: "Backend Developer",
            avatar: "https://i.pravatar.cc/150?img=12",
            email: "aditya.roy@example.com",
        },
        {
            id: 5,
            name: "Pooja Sharma",
            role: "QA Engineer",
            avatar: "https://i.pravatar.cc/150?img=24",
            email: "pooja.sharma@example.com",
        }
    ];





    return (
        <Box>
            <Text fontSize={{ base: "sm", md: "xl" }} mb={3}>Team</Text>
            <HStack>
                {teamData?.map(item => (

                    <Tooltip
                        key={item.id}
                        content={item?.name}
                        showArrow={true}
                        portalled={true}
                        contentProps={{ p: 2, borderRadius: 'md' }}
                        positioning={{ placement: "top-center" }}
                    >
                        <Button
                            rounded={"full"}
                            p={0}
                            w="auto"
                        >
                            <Avatar.Root key={item?.id} shape="full" size="lg">
                                <Avatar.Fallback name={item?.name} />
                                <Avatar.Image src={item?.avatar} />
                            </Avatar.Root>
                        </Button>

                     </Tooltip>

                ))}
            </HStack>
        </Box>
    );
};

export default Team;