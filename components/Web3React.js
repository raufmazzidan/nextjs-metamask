import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Center, Text, Heading, Box, Button, useToast } from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { ethers } from 'ethers'
import { abi, contractAddress } from '../constants'

export const injected = new InjectedConnector();

export default function Web3React() {
  const toast = useToast()
  const {
    active,
    activate,
    chainId,
    account,
    library: provider,
  } = useWeb3React();

  const connectMetamask = async () => {
    if (!window.ethereum) {
      toast({
        description: 'Please install metamask',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
      return
    }

    try {
      await activate(injected);
    } catch (error) {
      toast({
        description: 'Connecting failed',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
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

    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

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
          <Text>Web3 React</Text>
        </BreadcrumbItem>
      </Breadcrumb>
      <Box display="flex" alignItems="center">
        <Box mt={4} mr={4} display="flex" flexDir="column" alignItems="flex-end">
          <Heading color="orange">Metamask</Heading>
          {active ? (
            <Text mb={1} ml={2} fontSize="xs" color="green">Connected</Text>
          ) : (
            <Text mb={1} ml={2} fontSize="xs" color="red">Disconnected</Text>
          )}
        </Box>
        {active ? (
          <Button w={144} colorScheme="purple" onClick={execute}>Checkout</Button>
        ) : (
          <Button w={144} colorScheme="orange" onClick={connectMetamask}>Connect</Button>
        )}
      </Box>
    </Center>
  )
}
