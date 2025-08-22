import React from "react"
import {
  Box,
  Heading,
  Text,
  Badge,
  HStack,
  Wrap,
  WrapItem,
  IconButton,
  useDisclosure,
  useSelect,
} from '@chakra-ui/react';
import { LuDelete } from 'react-icons/lu';
import { AiFillDelete } from 'react-icons/ai';
import { FaEdit, FaRegStickyNote } from 'react-icons/fa';
import { Tooltip } from "../ui/tooltip";
import { EditTaskModal } from "./EditModal";
import GetAssignedUser from "./GetAssignedUser";
import { useSelector } from "react-redux";

const TaskCard = ({ task, onDelete, handleSave }) => {
  const { user } = useSelector(state => state.user)
  const {
    title,
    description,
    status,
    priority,
    tags = [],
    createdAt,
  } = task;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const statusColor = status === 'complete' ? 'green' : 'red';
  const priorityColor = {
    high: 'red',
    medium: 'orange',
    low: 'yellow',
  }[priority] || 'gray';



  const handleEdit = () => {
    onOpen();
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      // bg={useColorModeValue('white', 'gray.800')}
      shadow="sm"
      _hover={{ shadow: 'md' }}
    >
      <HStack justify="space-between" align="start" mb={2}>
        <Heading size="md" noOfLines={1}>{title}</Heading>

        <HStack>
          <Text fontSize="xs" color="gray.400">
            {new Date(createdAt).toLocaleDateString()}
          </Text>
          <Badge colorPalette={statusColor} variant="solid" px={2}>
            {status}
          </Badge>

        </HStack>

      </HStack>

      <Text fontSize="sm" color="gray.600" noOfLines={2} mb={3}>
        {description}
      </Text>

      <HStack justify="space-between">
        <Wrap mb={3}>
          {tags.map((tag, index) => (
            <WrapItem key={index}>
              <Badge colorScheme="blue" variant="subtle">{tag}</Badge>
            </WrapItem>
          ))}
          <WrapItem>
            <Badge colorPalette={priorityColor} variant="solid">
              {priority}
            </Badge>
          </WrapItem>


        </Wrap>

        <HStack>
          <Tooltip
            label="Edit Task"
            hasArrow
            content="Edit"
          >
            {/* <IconButton
              variant={"ghost"}
              size="lg"
              onClick={() => onEdit(task)}
              aria-label="Edit Task"
            >
              <FaEdit size={30} />
            </IconButton> */}


            <EditTaskModal
              task={task}
              isOpen={isOpen}
              onClose={onClose}
              onSave={handleSave}
            >
              <IconButton variant={"ghost"} size="sm" onClick={() => handleEdit(task)}>
                <FaEdit />
              </IconButton>
            </EditTaskModal>
          </Tooltip>
          <Tooltip
            label="Delete Task"
            hasArrow
            content="Delete"
          >
            <IconButton
              size="lg"
              variant={"ghost"}
              onClick={() => onDelete(task._id)}
              aria-label="Delete Task"
              colorScheme="red"
            >
              <AiFillDelete size={30} />
            </IconButton>
          </Tooltip>
        </HStack>
      </HStack>
      {
        user?.role === "admin" ?
          <GetAssignedUser
            mentionsUsers={task.mentions}
          />
          :
          ""
      }


    </Box>
  )
};

export default TaskCard;
