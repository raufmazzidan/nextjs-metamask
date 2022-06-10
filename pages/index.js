import { Button, Center, Grid, GridItem, Heading, SimpleGrid } from '@chakra-ui/react'
import React from 'react'

export default function IndexPages(params) {
  return (
    <Center bg="#EFEFEF" h="100vh" flexDir="column">
      <Heading>Exploring Metamask Connection</Heading>
      <SimpleGrid columns={2} mt={4} spacing={4}>
        <Button colorScheme="orange" as="a" href="/ethers">Ethers</Button>
        <Button colorScheme="orange" as="a" href='/web3-react'>Web 3 React</Button>
      </SimpleGrid>
    </Center>
  )
}