'use client'
import { useState } from 'react'
import { useWeb3Modal } from '@web3modal/react'
import { Image, Button, Text } from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import ConnectWallet from '../components/ConnectWallet'

const Header = (props: {method: () => void}) => {
  const { address, isConnecting, isDisconnected } = useAccount()
  const { open, close } = useWeb3Modal()
  return (
    <div className='flex items-center justify-center m-10'>
        <Image
          className='p-3'
          w='10%'
          src='/logo.jpg'
          alt='DApp Logo'
        />
        <div className='p-3'>
          <ConnectWallet />
          <Button p={3} onClick={() => props.method()}>Switcing Theme</Button>
          <Text>{address}</Text>
        </div>
    </div>
  )
}

export default Header