'use client';

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
import { useState } from 'react';
import { login } from './api';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../Logo';

export default function Login() {
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (email, password) => {
    //Validate email and password, The email must be in a valid email format, password must satisfy the regex  RegExp('^[a-zA-Z0-9]{3,30}$')
    if (!email || !password) {
      toast({
        title: 'Invalid Input',
        description: 'Please enter a valid email and password',
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

    login(email, password).then(res => {
      localStorage.setItem('token', res.data);
      if (res.status === 200) {
        toast({
          title: 'Login Successful',
          description: 'You have been logged in',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        console.log(res.data);
        //wait for 2 seconds
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
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
            //self align logo to center
            alignSelf={'center'}
          />

          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign In</Heading>
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
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                  gap={10}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Text
                    color={'blue.400'}
                    onClick={() => navigate('/signup')}
                    cursor={'pointer'}
                  >
                    Sign Up?
                  </Text>
                </Stack>
                <Button
                  onClick={() => {
                    handleLogin(email, password);
                  }}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
