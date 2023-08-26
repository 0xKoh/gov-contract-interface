'use client'
import Header from './components/Header'
import Footer from './components/Footer'
import Main from './components/Main'
import { Web3Modal } from '@web3modal/react'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { EthereumClient, w3mProvider } from '@web3modal/ethereum'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { goerli, mainnet, polygon, polygonMumbai } from 'wagmi/chains'

export default function Home() {
  const projectId = 'a803890315e1cc6a1c49447900640e7e'

  const chains = [mainnet, polygon, polygonMumbai, goerli]
  const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])

  const connector = new MetaMaskConnector({
    chains: chains,
    options: {
      shimDisconnect: true
    }
  })

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

  const ethereumClient = new EthereumClient(wagmiConfig, chains)

  return (
    <CacheProvider>
      <ChakraProvider>
        <WagmiConfig config={wagmiConfig}>
          <Header projectId={projectId} ethereumClient={ethereumClient} />
          <Main />
          <Footer />
        </WagmiConfig>
      </ChakraProvider>
    </CacheProvider>
  )
}
