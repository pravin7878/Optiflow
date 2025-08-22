import { AvatarIcon, Badge, Box, Flex, Heading, HStack, Icon, Image, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import { FaCommentAlt } from 'react-icons/fa';
import { IoLogoUsd } from 'react-icons/io';
import { AiOutlineTeam } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { MdAddTask } from 'react-icons/md';
import { FcLeave } from "react-icons/fc";
import { Tooltip } from '../ui/tooltip';


const Stats = () => {
  const { userallUsersLoading, allUsers } = useSelector(state => state.user)
  const { error, loading, tasks } = useSelector(state => state.tasks)

  const activeEmploy = allUsers.filter((user) => user.isActive).length
  const inActiveEmploy = allUsers.filter((user) => !user.isActive).length
  const openTasks = tasks.filter(task => task.status === "complete").length
  const closeTasks = tasks.filter(task => task.status === "incomplete").length


  console.log(allUsers);

  console.log("task", tasks);

  const statsData = [
    {
      id: 1,
      label: 'Team',
      value: allUsers.length,
      badge: [{
        text: "Active Employ",
        value: activeEmploy
      },
      {
        text: "Inactive Employ",
        value: inActiveEmploy
      }
      ],
      icon: <AiOutlineTeam />,
      bgGradient: "linear-gradient(160deg, #0583ce 0%, #59b5ac 100%)",
      bg: '#0093E9',
    },
    {
      id: 2,
      label: 'Tasks',
      value: tasks.length ?? 0,
      badge : [
      {
        text: "Close Tasks",
        value: closeTasks
      },
{
        text: "Open Tasks",
        value: openTasks
      }
      ],
      icon: <MdAddTask />,
      bgGradient: 'linear-gradient(147deg, #dc0cf9 0%, #0e47c4 80%)',
      bg: '#21D4FD'
    },
    {
      id: 3,
      label: 'Message',
      value: '320',
      badge: [{
        text: "Seen Message",
        value: 7
      },
      {
        text: "Un Seen Message",
        value: 3
      }
      ],
      icon: <FaCommentAlt />,
      bgGradient: 'linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)',
      bg: '#dc0cf9',
    },
    {
      id: 4,
      label: 'Leave ',
      value: '15',
     badge: [{
        text: "Approve Leave",
        value: 5
      },
      {
        text: "Requested Leave",
        value: 2
      }
      ],
      icon: <FcLeave />,
      bgGradient: 'linear-gradient(315deg, #08AEEA 31%, #2AF598 97%)',
      bg: '#08AEEA',
    },
  ]

  return (
    <SimpleGrid columns={{ base: "2", md: "3", lg: "4" }} gap={5}>
      {statsData?.map((stat, idx) => (
        <Flex
          direction={{ base: "column", sm: "row", md: "column" }}
          justify={{ sm: "space-between" }}
          align={"center"}
          w="auto"
          color={"white"}
          bgColor={stat?.bg}
          bgGradient={stat?.bgGradient}
          key={idx}
          px={{ base: "3", md: "7" }} py={4}
          rounded={"md"}
        >
          <Text fontSize={{ base: "md", md: "xl" }} fontWeight={"bold"}>{stat?.label}</Text>
          <HStack gap={{ base: "1", md: "3" }} zIndex={10}>
            {stat?.icon}
            <Heading fontSize={{ base: "sm", md: "lg" }}>{stat?.value}</Heading>
          </HStack>
          <HStack>
            {
              stat.badge.map((ele,ind)=>(
 <Tooltip content={ele?.text}>
              <Badge colorPalette={ind === 0 ? "green" : "red"} >{ele?.value}</Badge>
            </Tooltip>
              ))
            }
           
          </HStack>
          
        </Flex>
      ))}

    </SimpleGrid>
  );
};

export default Stats;