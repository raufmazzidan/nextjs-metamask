import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Center, Text, Heading, Box, Button, useToast } from '@chakra-ui/react'
import { ethers } from 'ethers'
import { useState } from 'react'
import { abi, contractAddress } from '../constants'

export default function Ether() {
  const toast = useToast()
  const [isConnected, setIsConnected] = useState(false)
  const [signer, setSigner] = useState()
  
  const connectMetamask = async () => {
    if (!window.ethereum) {
      toast({
        description: 'Please install metamask',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
      setIsConnected(false)
      return
    }

    try {
      await ethereum.request({ method: "eth_requestAccounts" })
      setIsConnected(true)
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      setSigner(provider.getSigner())
    } catch (error) {
      console.log(error)
      setIsConnected(false)
    }
  }

  async function execute() {
    if (!window.ethereum) {
      toast({
        description: 'Please install metamask',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
      return
    }

    const contract = new ethers.Contract(contractAddress, abi, signer)

    try {
      await contract.store(42)
      toast({
        description: 'Checkout success',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        description: 'Checkout failed',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }

  }

  return (
    <Center h="100vh" flexDir="column">
      <Breadcrumb spacing='8px' separator="/">
        <BreadcrumbItem>
          <BreadcrumbLink href='/'>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Text>Ethers</Text>
        </BreadcrumbItem>
      </Breadcrumb>
      <Box display="flex" alignItems="center">
        <Box mt={4} mr={4} display="flex" flexDir="column" alignItems="flex-end">
          <Heading color="orange">Metamask</Heading>
          {isConnected ? (
            <Text mb={1} ml={2} fontSize="xs" color="green">Connected</Text>
          ) : (
            <Text mb={1} ml={2} fontSize="xs" color="red">Disconnected</Text>
          )}
        </Box>
        {isConnected ? (
          <Button w={144} colorScheme="purple" onClick={execute}>Checkout</Button>
        ) : (
          <Button w={144} colorScheme="orange" onClick={connectMetamask}>Connect</Button>
        )}
      </Box>
    </Center>
  )
}
