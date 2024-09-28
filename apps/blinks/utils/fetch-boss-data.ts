import { BOSS_PUBLIC_KEY, PROGRAM } from '@/constants'

export const fetchBossData = async () => {
  const boss = await PROGRAM.account.boss.fetch(BOSS_PUBLIC_KEY)

  return boss
}
