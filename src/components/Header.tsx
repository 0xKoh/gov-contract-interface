'use client'
import { useState } from 'react'
import { Web3Button, Web3NetworkSwitch } from '@web3modal/react'
import { Image, Button } from '@chakra-ui/react'

const Header = (props: {method: () => void}) => {

  return (
    <div id='header'>
        <Image
          className='p-3'
          w='10%'
          src='/logo.jpg'
          alt='DApp Logo'
        />
        <div className='p-3'>
          <Web3Button />
          <Web3NetworkSwitch />
        </div>
        <Button p={3} onClick={() => props.method()}>Switcing Theme</Button>
    </div>
  )
}

export default Header