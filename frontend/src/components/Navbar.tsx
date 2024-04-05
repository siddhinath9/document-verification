import {
  useColorModeValue,
  useDisclosure,
  chakra,
  Flex,
  VisuallyHidden,
  HStack,
  Button,
  IconButton,
  VStack,
  CloseButton,
  Box,
} from '@chakra-ui/react';
import React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const bg = useColorModeValue('white', 'gray.800');
  const mobileNav = useDisclosure();
  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        w="full"
        px={{
          base: 2,
          sm: 4,
        }}
        py={4}
        shadow="md"
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <chakra.a
              href="/"
              title="Choc Home Page"
              display="flex"
              alignItems="center"
            >
              <VisuallyHidden></VisuallyHidden>
            </chakra.a>
            <chakra.h1 fontSize="xl" fontWeight="medium" ml="2">
              DriveIDverify
            </chakra.h1>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{
                base: 'none',
                md: 'inline-flex',
              }}
            >
              <Button
                colorScheme="blue"
                variant="solid"
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </Button>
              {!localStorage.getItem('token') ? (
                <Button variant="ghost" onClick={() => navigate('/login')}>
                  Log In
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  onClick={() => {
                    localStorage.removeItem('token');
                    navigate('/login');
                  }}
                >
                  Log Out
                </Button>
              )}
              {localStorage.getItem('token') === null && (
                <Button variant="ghost" onClick={() => navigate('/signup')}>
                  Sign Up
                </Button>
              )}
            </HStack>
            <ColorModeSwitcher />
            <Box
              display={{
                base: 'inline-flex',
                md: 'none',
              }}
            >
              <IconButton
                display={{
                  base: 'flex',
                  md: 'none',
                }}
                aria-label="Open menu"
                fontSize="20px"
                color="gray.800"
                _dark={{
                  color: 'inherit',
                }}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />

              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? 'flex' : 'none'}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />

                <Button
                  w="full"
                  variant="solid"
                  colorScheme="blue"
                  onClick={() => navigate('/dashboard')}
                >
                  Dashboard
                </Button>
                {!localStorage.getItem('token') ? (
                  <Button
                    w="full"
                    variant="ghost"
                    onClick={() => navigate('/login')}
                  >
                    Log In
                  </Button>
                ) : (
                  <Button
                    w="full"
                    variant="ghost"
                    onClick={() => {
                      localStorage.removeItem('token');
                      navigate('/login');
                    }}
                  >
                    Log Out
                  </Button>
                )}
                {localStorage.getItem('token') === null && (
                  <Button
                    w="full"
                    variant="ghost"
                    onClick={() => navigate('/signup')}
                  >
                    Sign up
                  </Button>
                )}
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
}
