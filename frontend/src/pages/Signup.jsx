'use client';

import React, { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { register, signup } from './api'; // You may need to create the 'register' function
import { useNavigate } from 'react-router-dom';
import { Logo } from '../Logo';

export default function Signup() {
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [senderAddress, setSenderAddress] = useState('');
  const [privateKey, setPriavateKey] = useState('');

  const handleSignup = async (email, password) => {
    //Validate email and password, The email must be in a valid email format, password must satisfy the regex  RegExp('^[a-zA-Z0-9]{3,30}$')
    if (!email || !password || !confirmPassword) {
      toast({
        title: 'Invalid Input',
        description: 'Please enter a valid email and password',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    //validate the sender address and private key
    if (!senderAddress || !privateKey) {
      toast({
        title: 'Invalid Input',
        description: 'Please enter a valid sender address and private key',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    //validate email with regex
    const EmailRegex = RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$');
    if (!EmailRegex.test(email)) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    //make sure password and confirm password match
    if (password !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
        description: 'Please make sure your passwords match',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    //validate password with regex
    const PasswordRegex = RegExp('^[a-zA-Z0-9]{3,30}$');
    if (!PasswordRegex.test(password)) {
      toast({
        title: 'Invalid Password',
        description:
          'The password must be between 3 and 30 characters long, and only contain alphanumeric characters',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const userName = email.split('@')[0];

    signup(userName, email, password, senderAddress, privateKey).then(res => {
      console.log(res);
      if (res.status === 201) {
        toast({
          title: 'SignUp Successful',
          description: 'You have been signed up',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        console.log(res.data);
        //wait for 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast({
          title: 'Login Failed',
          description: 'Something went wrong!',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    });
  };

  return (
    <>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Logo
            h="10vmin"
            w="20vmin"
            pointerEvents="none"
            // Self align logo to center
            alignSelf={'center'}
          />

          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign Up</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" onChange={e => setEmail(e.target.value)} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  onChange={e => setPassword(e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  onChange={e => setConfirmPassword(e.target.value)}
                />
              </FormControl>
              <FormControl id="senderAddress">
                <FormLabel>Enter Sender Address</FormLabel>
                <Input
                  type="text"
                  onChange={e => setSenderAddress(e.target.value)}
                />
              </FormControl>
              <FormControl id="privateKey">
                <FormLabel>Enter Private Key</FormLabel>
                <Input
                  type="text"
                  onChange={e => setPriavateKey(e.target.value)}
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  onClick={() => {
                    handleSignup(email, password);
                  }}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Sign Up
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
