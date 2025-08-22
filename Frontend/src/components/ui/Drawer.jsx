"use client"
import React from 'react';
import { Button, CloseButton, Drawer, Icon, Portal } from "@chakra-ui/react"
import { HiOutlineMenuAlt2 } from "react-icons/hi"


export const SideBarDrawer = ({children}) => {
  return (
    <Drawer.Root placement={"start"}>
      <Drawer.Trigger asChild>
        <Icon cursor={"pointer"} size={"lg"}>
        <HiOutlineMenuAlt2
         />
        </Icon>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Context>
              {(store) => (
                <Drawer.Body pt="6" spaceY="3">
                  {children}
                </Drawer.Body>
              )}
            </Drawer.Context>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}
