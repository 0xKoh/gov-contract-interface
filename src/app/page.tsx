'use client'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ChakraProvider, Button, Text, extendTheme } from '@chakra-ui/react'
import { useState } from 'react'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { configureChains, createConfig, WagmiConfig, useAccount, useConnect } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { goerli, mainnet, polygon, polygonMumbai } from 'wagmi/chains'

export default function Home() {

  const projectId = 'a803890315e1cc6a1c49447900640e7e'

  // wagmi
  const chains = [mainnet, polygon, polygonMumbai, goerli]
  const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
  // const { publicClient1 } = configureChains(chains, [publicProvider()])

  const connector = new MetaMaskConnector({
    chains: chains,
    options: {
      shimDisconnect: true
    }
  })

  const WalletConnect = w3mConnectors({ projectId, chains })

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: [
      new WalletConnectConnector({
        chains: chains,
        options: {
          projectId: projectId
        }
      }),
      connector
    ],
    publicClient
  })

  // WalletConnect
  const ethereumClient = new EthereumClient(wagmiConfig, chains)

  const [theme, setTheme] = useState<"light" | "dark">("light")

  const toggleTheme = (): void => {
    if (theme === "light") {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }

  return (
    <ChakraProvider>
      <WagmiConfig config={wagmiConfig}>
        <Web3Modal
              projectId={projectId}
              ethereumClient={ethereumClient}
              themeMode={theme}
              themeVariables={{ '--w3m-accent-color': theme, '--w3m-logo-image-url': 'https://asset.watch.impress.co.jp/img/avw/docs/1189/762/k01_s.jpg' }}
            />
        <Header method={() => toggleTheme()}/>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className="w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex p-4 flex">
            <Text>Gov Contract</Text>
          </div>
        </main>
        <Footer />
      </WagmiConfig>
    </ChakraProvider>
  )
}
