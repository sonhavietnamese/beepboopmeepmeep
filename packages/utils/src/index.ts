export const formatWallet = (wallet: string, length: number = 4) => {
  return wallet.slice(0, length) + '...' + wallet.slice(-length)
}
