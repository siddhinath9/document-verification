'use client';

import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

// Replace test data with your own
const features = [
  {
    id: 0,
    title: 'Blockchain Security',
    text: 'Your driving license documents are securely hashed and stored on the blockchain, ensuring their authenticity is preserved.',
  },
  {
    id: 1,
    title: 'Easy Verification',
    text: 'Verify the authenticity of your driving license documents effortlessly using our intuitive verification tool.',
  },
  {
    id: 2,
    title: 'Secure Storage',
    text: 'Rest assured knowing that your driving license documents are securely stored in our database, protected by the latest encryption technology.',
  },
  {
    id: 3,
    title: 'User Friendly',
    text: 'Our user interface is designed to be simple and easy to use, allowing you to upload your documents with just a few clicks.',
  },
  {
    id: 4,
    title: 'Fast Verification',
    text: 'Utilizing cutting-edge technology, we ensure that your driving license documents are verified quickly and efficiently.',
  },
  {
    id: 5,
    title: 'Timestamped Records',
    text: 'Every document is timestamped and stored on the blockchain, providing tamper-proof records for added security.',
  },
  {
    id: 6,
    title: 'Multi-Platform Access',
    text: 'Access your driving license documents from any device, as we support all major platforms for your convenience.',
  },
  {
    id: 7,
    title: 'Digital Signature Integration',
    text: 'Easily sign and authenticate your driving license documents digitally within our platform, adding an extra layer of security and convenience to the verification process.',
  },
];

export default function Features() {
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Text color={'gray.600'} fontSize={'xl'}>
          Welcome to DriveIDverify, your trusted platform for safeguarding the
          authenticity of your driving license documents. With our secure and
          immutable system, you can ensure the integrity of your
          important records.
        </Text>
      </Stack>

      <Container maxW={'6xl'} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {features.map(feature => (
            <HStack key={feature.id} align={'top'}>
              <Box color={'green.400'} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={'center'}>
                <Text fontWeight={600}>{feature.title}</Text>
                <Text color={'gray.600'}>{feature.text}</Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
