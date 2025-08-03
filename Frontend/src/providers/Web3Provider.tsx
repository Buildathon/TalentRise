import { createConfig, WagmiProvider } from 'wagmi'
import { polygon } from 'wagmi/chains'
import { http } from 'viem'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { injected } from 'wagmi/connectors'

const queryClient = new QueryClient()

const config = createConfig({
  connectors: [injected()], // Configuración del conector
  chains: [polygon],
  transports: {
    [polygon.id]: http(),
  },
})

export function Web3Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
