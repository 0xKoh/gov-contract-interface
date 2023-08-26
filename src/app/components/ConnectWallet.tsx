'use client'
import React from 'react'
import { Button } from '@chakra-ui/react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

const ConnectWallet = () => {
    const { connect, connectors } = useConnect()
    const { disconnect, status } = useDisconnect()
    const { isConnecting, isConnected } = useAccount()
    
    if(!isConnected) return(
        <>
            {connectors.map((connector) => (
                <Button m={1}
                    onClick={() => connect({ connector })} 
                    key={connector.id}
                    isLoading={isConnecting}
                >{connector.name}</Button>
            ))}
        </>
    )

    if(isConnected) return (
        <>
            <Button 
                m={1}
                onClick={() => disconnect()}
            >Disconnect</Button>
        </>
    )
}

export default ConnectWallet