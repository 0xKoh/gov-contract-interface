'use client'
import React from 'react';
import { Web3Button } from '@web3modal/react'
import { useAccount } from 'wagmi'

export default function Button() {

  return (
    <Web3Button avatar='hide'/>
  )
}