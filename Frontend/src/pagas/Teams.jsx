import { Box, Button, Spinner, Center, Heading } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { RiArrowRightLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllUsers } from '../app/actions/user'
import { TeamCard } from '../components/team/TeamCard'

export const Teams = () => {
  const dispatch = useDispatch()
  const { allUsers, allUsersLoading } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [dispatch])

  return (
    <div>
      <Center>
        <Heading>Manage Your Team</Heading>
      </Center>

      <div className='flex justify-end py-3'>
        <Link to={"/team/add"}>
          <Button fontWeight={"bold"} mb={4}>
            Add New
            <RiArrowRightLine />
          </Button>
        </Link>
      </div>
      <Box mx="auto">
        {allUsersLoading ? (
          <Center py={10}><Spinner /></Center>
        ) : (
          allUsers && allUsers.length > 0 ? (
            allUsers.map(member => (
              <TeamCard key={member._id} member={member} />
            ))
          ) : (
            <Center py={10}>No team members found.</Center>
          )
        )}
      </Box>
    </div>
  )
}
