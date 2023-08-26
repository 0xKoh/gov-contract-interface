'use client'
import React from 'react'
import ExeButton from './ExeButton'
import { Card, Text } from '@chakra-ui/react'

const Main = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 w-full">
        <Card p={30} >
            <ExeButton />
        </Card>
    </div>
  )
}

export default Main