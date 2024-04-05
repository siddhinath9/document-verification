'use client';

import React from 'react';
import { Stack, Text, VStack, useColorMode } from '@chakra-ui/react';
import { GrDocumentText } from 'react-icons/gr';
import { HiDocument } from 'react-icons/hi';

export default function DocumentCard(document) {
  return (
    <Stack p="4" boxShadow="lg" m="4" borderRadius="sm">
      <Stack direction="row" alignItems="center">
        <Text fontWeight="semibold">{`File Name: ${document.document.fileName}`}</Text>
        {useColorMode().colorMode === 'dark' ? (
          <HiDocument />
        ) : (
          <GrDocumentText />
        )}
      </Stack>

      <Stack
        direction={{ base: 'column', md: 'row' }}
        justifyContent="space-between"
      >
        <VStack align={'start'}>
          <Text fontWeight={500}>Document Hash:</Text>
          <Text maxW={300}>{`${document.document.documentHash}`}</Text>
        </VStack>
      </Stack>
    </Stack>
  );
}
