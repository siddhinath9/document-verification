import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDocument, checkValidity, getDocuments } from './api';
import {
  Box,
  Text,
  Heading,
  VStack,
  Grid,
  Button,
  useToast,
} from '@chakra-ui/react';
import Navbar from '../components/Navbar.tsx';
import DocumentCard from '../components/DocumentCard';

function Dashboard() {
  const toast = useToast();
  const navigate = useNavigate();
  const [documents, setDocuments] = React.useState(null);
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleFileInputChange = e => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const addToBlockchain = async () => {
    if (!selectedFile) {
      toast({
        title: 'Select a file',
        description: 'File not selected',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    try {
      const buffer = await selectedFile.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
      const fileName = selectedFile.name;
      console.log(fileName);
      const response = await addDocument(hashHex, fileName);
      if (response === true) {
        toast({
          title: 'Document Added',
          description: 'This document has been added to your blockchain.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Something went wrong!',
          description: 'This document could not be added to your blockchain.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculateFileHash = async () => {
    if (!selectedFile) {
      toast({
        title: 'Select a file',
        description: 'File not selected',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    try {
      const buffer = await selectedFile.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');

      // Check if a document with the same hash exists
      const documentExists = await checkValidity(hashHex);
      if (documentExists) {
        toast({
          title: 'Document Is Verified',
          description: 'A document with the same hash already exists.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Cannot verify document',
          description: 'This document does not exist on the blockchain',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Cannot calculate hash',
        description: 'An error occurred when calculating the hash.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    let token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }

    //get the user's documents
    getDocuments().then(res => {
      if (res.data !== null && res.data.length > 0) {
        console.log(res.data);
        setDocuments(res.data);
      }
    });
  }, []);

  return (
    <>
      <Box fontSize="xl">
        <Grid p={3}>
          <Box>
            <Navbar />
          </Box>
          <VStack
            spacing={2}
            marginTop={10}
            paddingX={10}
            //align to the start
            align="flex-start"
          >
            <Heading>Dashboard</Heading>
            <Text fontSize={'2xl'} fontWeight={'2xl'}>
              {documents === null ? 'You have no documents' : 'Your Documents'}
            </Text>
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              {documents !== null &&
                documents.map(document => <DocumentCard document={document} />)}
            </Grid>
          </VStack>
          <Box align="center">
            <input
              type="file"
              accept="*.*"
              onChange={e => handleFileInputChange(e)}
            />
            <Button marginRight={10} onClick={e => calculateFileHash(e)}>
              Check Validity
            </Button>
            <Button onClick={e => addToBlockchain()}>Add to Chain</Button>
          </Box>
        </Grid>
      </Box>
    </>
  );
}

export default Dashboard;
