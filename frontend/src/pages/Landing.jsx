import React from 'react';
import {
  Box,
  Text,
  Heading,
  VStack,
  Grid,
  Button,
  useToast,
} from '@chakra-ui/react';
import { Logo } from '../Logo';
import Navbar from '../components/Navbar.tsx';
import Features from '../components/Features';
import { checkValidity } from './api';

function Landing() {
  const toast = useToast();
  const [selectedFile, setSelectedFile] = React.useState(null);
  const handleFileInputChange = e => {
    const file = e.target.files[0];
    setSelectedFile(file);
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
  return (
    <Box textAlign="center" fontSize="xl" paddingBottom={10}>
      <Grid p={3}>
        <Box>
          <Navbar />
        </Box>

        <VStack spacing={2} marginTop={10}>
          <Logo h="20vmin" pointerEvents="none" />
          <Heading>DriveIDverify</Heading>
          <Text fontSize={'2xl'} fontWeight={'2xl'}>
            Safeguard your Document's Authenticity
          </Text>
          <Box align="center" marginTop={'30px'} marginBottom={'30px'}>
            <input
              type="file"
              accept="*.*"
              onChange={e => handleFileInputChange(e)}
            />
            <Button onClick={e => calculateFileHash(e)}>Check Validity</Button>
          </Box>
          <Features />
        </VStack>
      </Grid>
    </Box>
  );
}

export default Landing;
