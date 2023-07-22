'use client'
import Header from '../components/Header'
import { Button } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'
import { useState } from 'react'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal, Web3NetworkSwitch } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { goerli, mainnet, polygon, polygonMumbai } from 'wagmi/chains'

export default function Home() {
  const chains = [mainnet, polygon, polygonMumbai, goerli]
  const projectId = 'a803890315e1cc6a1c49447900640e7e'

  const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient
  })
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
    <html lang='ja'>
    <ChakraProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <Header method={() => toggleTheme()}/>
        <WagmiConfig config={wagmiConfig}>
          <Web3Modal
            projectId={projectId}
            ethereumClient={ethereumClient}
            themeMode={theme}
            themeVariables={{ '--w3m-accent-color': 'Black', '--w3m-logo-image-url': 'https://asset.watch.impress.co.jp/img/avw/docs/1189/762/k01_s.jpg' }}
          />
        </WagmiConfig>
        </div>
      </main>
    </ChakraProvider>
    </html>
  )
}
