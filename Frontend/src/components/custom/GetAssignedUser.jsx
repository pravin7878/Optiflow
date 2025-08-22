import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
    Box,
    Heading,
    Stack,
    Avatar,
    Text,
    Spinner,
    HStack
} from '@chakra-ui/react'

export default function GetAssignedUser({ mentionsUsers }) {
    const baseURL = import.meta.env.VITE_BACKEND_URI
    const [userNames, setUserNames] = useState([])
    const [loading, setLoading] = useState(false)

    const getUserName = async (userId) => {
        try {
            const res = await axios.get(`${baseURL}/team/${userId}`)
            return res.data.name
        } catch (error) {
            console.error(error)
            return null
        }
    }

    useEffect(() => {
        const fetchUserNames = async () => {
            setLoading(true)
            const users = await Promise.all(
                mentionsUsers.map((userId) => getUserName(userId))
            )
            const filtered = users.filter(Boolean)
            setUserNames(filtered)
            setLoading(false)
        }

        if (mentionsUsers?.length) {
            fetchUserNames()
        }
    }, [mentionsUsers])

    return (
        <Box>
            {loading ? (
                <Spinner />
            ) : (
                <HStack gap={2}>
                    {userNames.map((name, index) => (
                        <Text key={index}>@{name},</Text>))}
                </HStack>
            )}
        </Box>
    )
}
