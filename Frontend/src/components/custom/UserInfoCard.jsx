import { Heading, VStack, Text, Button } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'

export default function UserInfoCard({handleLogout,isSerchActive}) {
    const { user } = useSelector(state => state.user)
    return (
        <VStack>
            <Heading>{user?.name}</Heading>
            <Text>{user.email}</Text>
            <Text>{ }</Text>
            <Button size={"md"} onClick={handleLogout} hidden={isSerchActive}>
                SignOut
            </Button>
        </VStack>
    )
}
