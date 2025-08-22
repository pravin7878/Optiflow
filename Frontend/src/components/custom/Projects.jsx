import { Badge, Box, Text } from '@chakra-ui/react';
import React from 'react';
import CustomTable from '../ui/Table';
import { Table } from "@chakra-ui/react"

const Projects = () => {

    const projectsData =  [
        {
          "name": "Website Redesign",
          "status": "In Progress",
          "dueDate": "2025-04-25"
        },
        {
          "name": "Mobile App Launch",
          "status": "Completed",
          "dueDate": "2025-03-30"
        },
        {
          "name": "Marketing Strategy",
          "status": "On Hold",
          "dueDate": "2025-05-15"
        },
        {
          "name": "Client Dashboard",
          "status": "In Progress",
          "dueDate": "2025-04-28"
        },
        {
          "name": "Team Collaboration Tool",
          "status": "In Progress",
          "dueDate": "2025-05-10"
        },
        {
            "name": "Marketing Strategy",
            "status": "Completed",
            "dueDate": "2025-05-15"
          },
      ]

    return (
  <Box >
    <Text fontSize={{base : "sm" , md : "xl"}} mb={3}>
        Projects
    </Text>
    <CustomTable>
    {projectsData.map((item,id) => (
            <Table.Row key={id}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>
              <Badge 
              colorPalette={item?.status === "Completed" ? "green" : item?.status === "In Progress" ? "yellow" : "red"}
              > {item.status}</Badge>
              </Table.Cell>
              <Table.Cell textAlign="end">{item.dueDate}</Table.Cell>
            </Table.Row>
          ))}
    </CustomTable>
  </Box>
    );
};

export default Projects;
