export const trimWallet = (wallet: string) => {
  return `${wallet.slice(0, 4)}...${wallet.slice(-4)}`
}
