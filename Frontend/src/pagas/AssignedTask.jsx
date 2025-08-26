import { getAssignedTasks } from '@/app/actions/task'
import TaskList from '@/components/custom/TaskList'
import { Button, Center, Flex, Heading, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { RiArrowRightLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const AssignedTask = () => {
  const { user } = useSelector(state => state.user)
  const { tasks = [] } = useSelector(state => state.tasks)

  
  console.log(tasks)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAssignedTasks())
  }, [])

  return (
    <Flex direction={"column"}>
      <VStack spacing={4}>
        <Center>
          <Heading>Tasks Assigned To You</Heading>
        </Center>

        <TaskList tasks={tasks}
        />
      </VStack>
    </Flex>
  )
}
