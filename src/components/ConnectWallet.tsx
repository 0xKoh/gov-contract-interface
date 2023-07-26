'use client'
import React from 'react'
import { Button } from '@chakra-ui/react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

const ConnectWallet = () => {
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
    const { disconnect, status } = useDisconnect()
    const { isConnecting, isDisconnected } = useAccount()
    
    return(
        <>
            {connectors.map((connector) => (
                <Button 
                    onClick={() => connect({ connector })} 
                    key={connector.id}
                    isLoading={isConnecting}
                >{connector.name}</Button>
            ))}
        </>
    )
}

export default ConnectWallet