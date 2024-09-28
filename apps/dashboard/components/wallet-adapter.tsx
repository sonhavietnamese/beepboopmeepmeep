'use client'

import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import '@solana/wallet-adapter-react-ui/styles.css'
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import { useMemo } from 'react'

interface WalletAdapterProps {
  children: React.ReactNode
}

export default function WalletAdapter({ children }: WalletAdapterProps) {
  const network = 'https://rpc.test.honeycombprotocol.com'
  const endpoint = useMemo(() => network, [network])

  const wallets = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter()], [network])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
