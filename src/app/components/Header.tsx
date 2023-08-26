'use client'
import { useState } from 'react'
import { Image, Button, Text } from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import ConnectWallet from './ConnectWallet'
import { Web3Modal } from '@web3modal/react'

const Header = ( props: {projectId: string, ethereumClient: any}) => {

  const { address, isConnecting, isDisconnected } = useAccount()

  const [theme, setTheme] = useState<"light" | "dark">("light")
  const toggleTheme = (): void => {
    if (theme === "light") {
      setTheme("dark")
    } else {
      setTheme("light")
    }
}

  return (
    <div className='flex items-center justify-center m-10'>
        <Web3Modal 
          projectId={props.projectId}
          ethereumClient={props.ethereumClient}
        />
        <Image
          className='p-3'
          w='10%'
          src='/logo.jpg'
          alt='DApp Logo'
        />
        <div className='p-3 bg-inherit'>
          <ConnectWallet />
          <Button m={1} onClick={() => toggleTheme()}>Switcing Theme</Button>
          <Text>{address}</Text>
        </div>
    </div>
  )
}

export default Header