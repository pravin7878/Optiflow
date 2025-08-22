import React from 'react'
import { Avatar, AvatarGroup,useBreakpointValue } from "@chakra-ui/react"


export default function ProfileButton({onToggle}) {
    const avatarSize = useBreakpointValue({ base: 'sm', md: 'md', lg: 'lg' });
    return (
        <AvatarGroup  
        onClick={onToggle} 
        variant={"solid"}
         cursor={"pointer"}
         size={avatarSize}
         >
            <Avatar.Root>
                <Avatar.Fallback />
                <Avatar.Image />
            </Avatar.Root>
        </AvatarGroup>
    )
}
