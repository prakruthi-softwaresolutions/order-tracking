import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
  Alert,
  AlertIcon,
  Center,
} from '@chakra-ui/react';
import QRCode from 'react-qr-code';
import axios from 'axios';

function CreateTable() {
  const [isFormOpen, setFormOpen] = useState(false);
  const [tableName, setTableName] = useState('');
  const [alertMessage, setAlertMessage] = useState({ type: '', content: '' });

  const handleFormOpen = () => {
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setTableName(''); // Clear the input on close
  };

  const handleCreateTable = async () => {
    try {
      // Validate that the table name is not empty
      if (!tableName.trim()) {
        setAlertMessage({
          type: 'error',
          content: 'Table Name is required.',
        });
        return;
      }
  
      // Check if the table name already exists
      const response = await axios.get('http://localhost:3001/tables');
      const existingTableNames = response?.data?.tables?.map((table) => table.name) || [];
  
      console.log('Existing Table Names:', existingTableNames);
  
      if (existingTableNames.includes(tableName)) {
        setAlertMessage({
          type: 'error',
          content: 'The given name already exists. Please try another one.',
        });
        return;
      }
  
      // Assuming Thrimark is the constant restaurant name
      const restaurantName = 'Thrimark';
      const fullName = `${restaurantName}-${tableName}`;
  
      // Display an alert with restaurant name, green check mark, QR code, and done button
      setAlertMessage({
        type: 'success',
        content: (
          <>
            <VStack spacing={4} align='center'>
              <p>{`${restaurantName}-${tableName}`}</p>
              <QRCode value={fullName} />
              <Button
                colorScheme='teal'
                mt={4}
                onClick={() => {
                  setAlertMessage({ type: '', content: '' });
                  handleFormClose();
                }}
              >
                Done
              </Button>
            </VStack>
          </>
        ),
      });
  
      // Update the db.json file using axios
      await axios.post('http://localhost:3001/tables', {
        name: tableName,
      });
  
      // Log the response for debugging
      console.log('Response from POST request:', response);
    } catch (error) {
      console.error('Error creating table:', error);
    }
  };

  return (
    <Center m={30}>
      <VStack spacing={4} align='center'>
        <Button colorScheme='teal' onClick={handleFormOpen}>
          Create Table
        </Button>

        {/* AlertDialog for Create Table Form and Alert Message */}
        <AlertDialog isOpen={isFormOpen} onClose={handleFormClose}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader>Create Table</AlertDialogHeader>
              <AlertDialogBody>
                {alertMessage.content ? (
                  <Alert
                    status={alertMessage.type === 'success' ? 'success' : 'error'}
                    mt={4}
                    onClose={() => setAlertMessage({ type: '', content: '' })}
                  >
                    {alertMessage.content && <AlertIcon />}
                    {alertMessage.content}
                  </Alert>
                ) : (
                  <FormControl>
                    <FormLabel>Table Name:</FormLabel>
                    <Input
                      variant='flushed'
                      placeholder='Table Name'
                      value={tableName}
                      onChange={(e) => setTableName(e.target.value)}
                    />
                  </FormControl>
                )}
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button onClick={handleFormClose}>Cancel</Button>
                {!alertMessage.content && (
                  <Button colorScheme='teal' onClick={handleCreateTable}>
                    Create
                  </Button>
                )}
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

        <Button variant='link' colorScheme='blue' mt={4} onClick={() => window.location.href = 'http://localhost:3000/tables'}>
          Show Tables
        </Button>
      </VStack>
    </Center>
  );
}

export default CreateTable;