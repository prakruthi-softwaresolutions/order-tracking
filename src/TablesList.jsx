import React from 'react';
import { Heading, Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function TablesList({ tableData }) {
  return (
    <div>
      <Heading mb={4}>Tables List</Heading>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Table Name</Th>
            <Th>QR Code</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableData ? (
            tableData.map((table, index) => (
              <Tr key={index}>
                <Td>{table.id}</Td>
                <Td>{table.name}</Td>
                <Td>
                  {/* Display small QR code here */}
                  <img src={`data:image/svg+xml;base64,${btoa(table.qrCode)}`} alt={`QR Code for ${table.name}`} />
                </Td>
                <Td>
                  <Button as={Link} to={`/tables/${table.id}`} colorScheme="blue" size="sm" mr={2}>
                    View
                  </Button>
                  <Button colorScheme="teal" size="sm" mr={2}>
                    Edit
                  </Button>
                  <Button colorScheme="red" size="sm">
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan="4">No data available</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
      <Link to='/create'>Back to Create Table</Link>
    </div>
  );
}

export default TablesList;
