export const formatWallet = (wallet: string, length: number = 4, prefix: string = '...') => {
  return wallet.slice(0, length) + prefix + wallet.slice(-length)
}
