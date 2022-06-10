import React from 'react'
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import Web3React from '../components/Web3React';

const getLibrary = (provider) => {
  return new Web3Provider(provider)
}

const Web3ReactPages = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3React />
    </Web3ReactProvider>
  )
}

export default Web3ReactPages