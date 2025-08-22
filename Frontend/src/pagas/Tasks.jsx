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
  const { allUsers } = useSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    dispatch(fetchTasks());
    // dispatch(fetchAllUsers());
  }, []);

 

  const toggleStatus = async (taskId, task) => {
    const updatedTask = { ...task, status: task?.status === "pending" ? "completed" : "pending" }
    const result = await dispatch(updateTask({ taskId, taskData: updatedTask }));
    if (result.meta.requestStatus === "fulfilled") {
      console.log("Task updated successfully");
    }
  };

  
  const handleDelete = async (taskId) => {
    const result = await dispatch(deleteTask(taskId));
    if (result.meta.requestStatus === "fulfilled") {
      console.log("Task deleted successfully");
    }
  };

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


        {/* {tasks?.length === 0 ?
          <NoTasks />
          :
          <SimpleGrid py={5} columns={{ base: 1, sm: 2, md: 3 }} gap={5}>
            {tasks.map((task) => (
              <VStack key={task._id} border="1px solid #ccc" p={4} borderRadius="md" w="100%">
                <Text fontWeight="bold">{task.title}</Text>
                <Text>{task.description}</Text>
                {task.tags && task.tags.length > 0 && (
                  <HStack wrap="wrap" spacing={1} mb={2}>
                    {task.tags.map((tag, idx) => (
                      <Text key={idx} fontSize="xs" color="gray.500" bg="gray.100" px={2} py={0.5} borderRadius="md">
                        #{tag}
                      </Text>
                    ))}
                  </HStack>
                )}
                {task.mentions && task.mentions.length > 0 && (
                  <HStack wrap="wrap" spacing={1} mb={2}>
                    {task.mentions.map((userId, idx) => {
                      const user = allUsers.find(u => u._id === (userId._id || userId));
                      return user ? (
                        <Text key={user._id} fontSize="xs" color="blue.500" bg="blue.50" px={2} py={0.5} borderRadius="md">
                          @{user.name}
                        </Text>
                      ) : null;
                    })}
                  </HStack>
                )}
                <HStack>
                  <NotesModal
                    notes={task.notes || []}
                    onAddNote={async (noteText) => {
                      await dispatch(addNoteToTask({ taskId: task._id, text: noteText }));
                      dispatch(fetchTasks());
                    }}
                  >
                    <IconButton
                      variant="ghost"
                      size="sm"
                      aria-label="Notes"
                    >
                      <FaRegStickyNote />
                    </IconButton>
                  </NotesModal>

                  <IconButton variant={"ghost"} size="sm" onClick={() => handleEdit(task)}>
                    <Checkbox.Root onChange={() => toggleStatus(task._id, task)} checked={task?.status === "completed"}>
                      <Checkbox.HiddenInput />
                      <Checkbox.Control />
                    </Checkbox.Root>
                  </IconButton>

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

                  <IconButton variant={"ghost"} size="sm" onClick={() => handleDelete(task._id)}>
                    <AiFillDelete />
                  </IconButton>
                </HStack>
              </VStack>
            ))}
          </SimpleGrid>
        } */}
      </VStack>


    </Flex>
  );
};

export default Tasks;