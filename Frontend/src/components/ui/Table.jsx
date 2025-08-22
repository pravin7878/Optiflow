import React from "react"

import { Table } from "@chakra-ui/react"

const CustomTable = ({children}) => {
  return (
    <Table.ScrollArea borderWidth="1px" rounded="md" height="230px">
      <Table.Root size="sm" stickyHeader>
        <Table.Header>
          <Table.Row bg="bg.subtle">
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Due Date</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
         {children}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  )
}

export default CustomTable
