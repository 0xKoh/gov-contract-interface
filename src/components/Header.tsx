'use client'
import { useState } from 'react'
import { Web3Button, Web3NetworkSwitch } from '@web3modal/react'
import { Image, Button } from '@chakra-ui/react'

const Header = (props: {method: () => void}) => {

  return (
    <>
        <Image
          w='10%'
          src='/vercel.svg'
          alt='DApp Logo'
        />
        <Web3Button />
        <Web3NetworkSwitch />
        <Button onClick={() => props.method()}>Switcing Theme</Button>
    </>
  )
}

export default Header