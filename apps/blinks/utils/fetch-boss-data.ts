import { BOSS_PUBLIC_KEY, PROGRAM } from '@/constants'
import { formatWallet } from '@repo/utils'
import { formatDamage } from './format-damage'

export const fetchBossData = async (myAddress: string) => {
  const boss = await PROGRAM.account.boss.fetch(BOSS_PUBLIC_KEY)

  const players = boss.players
    .map((player) => ({
      address: player.address.toString(),
      damage: Number(player.damage),
    }))
    .sort((a, b) => b.damage - a.damage)
    .slice(0, 5)
    .map((player) => ({
      address: player.address === myAddress ? 'You' : formatWallet(player.address, 3, '..'),
      damage: formatDamage(player.damage),
    }))

  const playerWithoutMe = players.filter((player) => player.address !== 'You')
  const leftPlayer = playerWithoutMe.length > 0 ? playerWithoutMe[0] : null
  const rightPlayer = playerWithoutMe.length > 1 ? playerWithoutMe[1] : null

  const cleanup = {
    health: Number(boss.health),
    maxHealth: 100_000,
    players,
    leftPlayer,
    rightPlayer,
  }

  return cleanup
}
