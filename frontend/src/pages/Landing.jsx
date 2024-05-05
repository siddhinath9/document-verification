import React, { useState } from 'react';
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
// import Features from '../components/Features';
import { checkValidity } from './api';

function Landing() {
  const toast = useToast();
  const [selectedFiles, setSelectedFiles] = useState({
    adhar: null,
    ssc: null,
    medical: null,
  });
  const [documentStatus, setDocumentStatus] = useState({
    adhar: null,
    ssc: null,
    medical: null,
  });
  const [checked, setChecked] = useState({
    adhar: false,
    ssc: false,
    medical: false,
  });

  const handleFileInputChange = (e, type) => {
    const file = e.target.files[0];
    setSelectedFiles(prevFiles => ({ ...prevFiles, [type]: file }));
    setDocumentStatus(prevStatus => ({ ...prevStatus, [type]: null }));
    setChecked(prevChecked => ({ ...prevChecked, [type]: false }));
  };

  const calculateFileHash = async (type) => {
    const file = selectedFiles[type];
    if (!file) {
      toast({
        title: 'Select a file',
        description: `${type.toUpperCase()} file not selected`,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    try {
      const buffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');

      const documentExists = await checkValidity(hashHex);
      setDocumentStatus(prevStatus => ({ ...prevStatus, [type]: documentExists }));
      setChecked(prevChecked => ({ ...prevChecked, [type]: true }));

      if (documentExists) {
        toast({
          title: `${type.toUpperCase()} Document Is Verified`,
          description: `A ${type.toUpperCase()} document with the same hash already exists.`,
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: `Cannot verify ${type.toUpperCase()} document`,
          description: `This ${type.toUpperCase()} document does not exist on the blockchain`,
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
          <Heading>Drive-ID-verify</Heading>
          <Text fontSize={'2xl'} fontWeight={'2xl'}>
            Check All the Documents Here
          </Text>
          {['adhar', 'ssc', 'medical'].map(type => (
            <Box key={type} align="center" marginTop={'30px'} marginBottom={'30px'}>
              <label style={{ margin: '10px 20px' }}>{type.toUpperCase()} Document</label>
              <input
                type="file"
                accept="*.*"
                onChange={e => handleFileInputChange(e, type)}
              />
              <Button
                onClick={() => calculateFileHash(type)}
                colorScheme={
                  checked[type] ? (documentStatus[type] ? 'green' : 'red') : 'gray'
                }
              >
                {checked[type]
                  ? documentStatus[type]
                    ? `${type.toUpperCase()} Document Verified`
                    : `${type.toUpperCase()} Document Unverified`
                  : `Check ${type.toUpperCase()} Validity`}
              </Button>
            </Box>
          ))}
          {/* <Features /> */}
        </VStack>
      </Grid>
    </Box>
  );
}

export default Landing;
