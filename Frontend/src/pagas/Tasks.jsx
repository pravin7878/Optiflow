import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, deleteTask, updateTask, addNoteToTask } from '../app/actions/task';
import { fetchAllUsers } from '../app/actions/user';
import { Text, Button, VStack, HStack, Flex, SimpleGrid, IconButton, Checkbox, useDisclosure, Center, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { LuDelete } from 'react-icons/lu';
import { AiFillDelete } from 'react-icons/ai';
import { FaEdit, FaRegStickyNote } from 'react-icons/fa';
import { EditTaskModal } from '../components/custom/EditModal';
import NotesModal from '../components/custom/NotesModal';
import { RiArrowRightLine } from 'react-icons/ri';
import NoTasks from '../components/custom/NoTasks';
import TaskList from '../components/custom/TaskList';


const Tasks = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

console.log("tasks from task ja",tasks);


  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <Flex direction={"column"}>
      <Center>
        <Heading>Manage Your Tasks</Heading>
      </Center>

      <div className='flex justify-end py-3'>
        <Link to={"/tasks/add"}>
          <Button fontWeight={"bold"} mb={4}>
            Add New
            <RiArrowRightLine />
          </Button>
        </Link>
      </div>

      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Your Tasks
        </Text>

        <TaskList tasks={tasks} 
        />
      </VStack>


    </Flex>
  );
};

export default Tasks;