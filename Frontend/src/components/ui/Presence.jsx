"use client"
import React from "react"
import {
  Box,
  Center,
  Presence,
  Stack,
  useDisclosure,
} from "@chakra-ui/react"
import ProfileButton from "../custom/ProfileButton"

const PresenceCard = ({ children, clickItem }) => {
  const { open, onToggle } = useDisclosure()
  return (
    <Stack gap="4" position={"relative"}>

      <Box onClick={onToggle}>
        {clickItem}
      </Box>

      <Presence
        position={"absolute"}
        top={12}
        right={1}
        unmountOnExit
        present={open}
        animationName={{ _open: "fade-in", _closed: "fade-out" }}
        animationDuration="moderate"
      >

        <Box p="3" layerStyle="fill.muted"borderRadius={10} >
          {children}
        </Box>
      </Presence>
    </Stack>
  )
}

export default PresenceCard