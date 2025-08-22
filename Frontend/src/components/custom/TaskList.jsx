import React from "react"
import { VStack, Container, Text } from '@chakra-ui/react';
import TaskCard from './TaskCard';
import NoTasks from './NoTasks';
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../../app/actions/task";

const TaskList = ({ tasks}) => {
const dispatch = useDispatch()

  if (!tasks.length) {
    return <NoTasks/>
  }

const handleSave = async (updatedTask) => {
    const result = await dispatch(updateTask({ taskId: updatedTask._id, taskData: updatedTask }));
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

  return (
    <Container maxW="4xl" py={6}>
      <VStack spacing={4} align="stretch">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onDelete={handleDelete}
            handleSave={handleSave}
          />
        ))}
      </VStack>
    </Container>
  );
};

export default TaskList;
