/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Action, BASE_URL, CONFIG, Font } from '@/constants'
import { createBlankTransaction } from '@/utils/create-blank-tx'
import { createDealDamageTransaction } from '@/utils/create-deal-damage-tx'
import { fetchBossData } from '@/utils/fetch-boss-data'
import { loadFont } from '@/utils/load-font'
import { ActionGetResponse, ACTIONS_CORS_HEADERS, createPostResponse } from '@solana/actions'
import { PublicKey, Transaction } from '@solana/web3.js'
import satori from 'satori'

export const runtime = 'edge'

export async function GET() {
  const roboto = await loadFont(Font.BACKBEAT)

  const svg = await satori(
    <div tw='flex flex-col w-full h-full items-center justify-center'>
      <img src={`${BASE_URL}/bg/bg.png`} width={CONFIG.IMAGE_WIDTH} height={CONFIG.IMAGE_HEIGHT} tw='w-full h-full absolute' />
      <img src={`${BASE_URL}/boss/compressed-minotos-00.png`} width={CONFIG.IMAGE_WIDTH} height={CONFIG.IMAGE_HEIGHT} tw='w-full h-full absolute' />
    </div>,
    {
      width: 800,
      height: 800,
      fonts: [
        {
          name: 'Roboto',
          data: roboto,
        },
      ],
    },
  )

  const response: ActionGetResponse = {
    type: 'action',
    icon: `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`,
    title: 'Hoppin',
    description: 'Hop through holes and collect $SEND',
    label: '',
    links: {
      actions: [
        {
          label: 'Start',
          href: `/api/blinks/bibada?action=${Action.START}`,
          type: 'transaction',
        },
      ],
    },
  }

  return Response.json(response, {
    headers: ACTIONS_CORS_HEADERS,
  })
}

export const OPTIONS = GET

export async function POST(req: Request) {
  const body = (await req.json()) as { account: string; signature: string }
  const { searchParams } = new URL(req.url)

  const sender = new PublicKey(body.account)
  const action = searchParams.get('action') as Action
  const damage = searchParams.get('damage') || 0

  const boss = await fetchBossData(sender.toString())

  console.log(boss)

  let transaction = new Transaction()

  switch (action) {
    case Action.START:
      transaction = await createBlankTransaction(sender)
      break
    case Action.DEAL_DAMAGE:
      transaction = await createDealDamageTransaction(sender, Number(damage))
      break
    default:
      break
  }

  const roboto = await loadFont(Font.BACKBEAT)

  const randomBossImage = `${BASE_URL}/boss/compressed-minotos-0${Math.floor(Math.random() * 10)}.png`

  const svg = await satori(
    <div tw='flex flex-col w-full h-full items-center justify-center'>
      <img src={`${BASE_URL}/bg/bg.png`} width={CONFIG.IMAGE_WIDTH} height={CONFIG.IMAGE_HEIGHT} tw='w-full h-full absolute' />

      <div tw='absolute inset-0 w-full h-full flex flex-col items-center justify-center'>
        <img src={randomBossImage} width={CONFIG.IMAGE_WIDTH} height={CONFIG.IMAGE_HEIGHT} tw='w-full h-full absolute' />

        <div tw='absolute left-0 top-0 w-[328px] h-[30px] top-[70px] left-[244px] flex flex-col items-center justify-center'>
          <div tw='w-[300px] h-[24px] bg-[#544656]'></div>
          <div tw='h-[24px] bg-[#51AF6E] absolute origin-left left-3' style={{ width: 302 * (boss.health / boss.maxHealth) }}></div>
          <img src={`${BASE_URL}/ui/boss-hp-bar.png`} width={328} height={30} tw='w-full h-full absolute' />
        </div>
      </div>

      {boss.leftPlayer && (
        <div tw='absolute inset-0 w-full h-full flex flex-col items-center justify-center'>
          <img
            src={`${BASE_URL}/left/compressed-cute-butterfly-a.png`}
            width={CONFIG.IMAGE_WIDTH}
            height={CONFIG.IMAGE_HEIGHT}
            tw='w-full h-full absolute'
          />

          <span tw='text-white absolute left-[80px] top-[490px] text-[28px] font-backbeat'>{boss.leftPlayer.address}</span>
        </div>
      )}

      <div tw='absolute inset-0 w-full h-full flex flex-col top-10 items-center justify-center'>
        <img
          src={`${BASE_URL}/middle/compressed-cute-butterfly-b.png`}
          width={CONFIG.IMAGE_WIDTH}
          height={CONFIG.IMAGE_HEIGHT}
          tw='w-full h-full absolute'
        />

        <span tw='text-white absolute left-[370px] top-[490px] text-[28px] font-backbeat'>You</span>
      </div>

      {boss.rightPlayer && (
        <div tw='absolute inset-0 w-full h-full flex flex-col items-center justify-center'>
          <img
            src={`${BASE_URL}/right/compressed-cute-butterfly-a.png`}
            width={CONFIG.IMAGE_WIDTH}
            height={CONFIG.IMAGE_HEIGHT}
            tw='w-full h-full absolute'
          />

          <span tw='text-white absolute right-[20px] top-[460px] text-[28px] font-backbeat'>{boss.rightPlayer.address}</span>
        </div>
      )}

      <div tw='absolute top-0 left-0 w-[250px] h-[235px] flex flex-col items-center justify-center'>
        <img src={`${BASE_URL}/ui/rank-panel.png`} width={250} height={235} tw='w-full h-full' />

        <div tw='flex flex-col w-[250px] absolute gap-12 top-[75px] items-center pl-12 pr-9 justify-center z-[10]'>
          {boss.players.map((player, index) => (
            <div key={index} tw='flex items-center justify-between w-full mt-[3px]'>
              <span tw='text-white text-[20px] font-backbeat'>{player.address}</span>
              <span tw='text-white text-[19px] font-backbeat'>{player.damage}</span>
            </div>
          ))}
        </div>
      </div>
    </div>,
    {
      width: 800,
      height: 800,
      fonts: [
        {
          name: 'Roboto',
          data: roboto,
        },
      ],
    },
  )

  const payload = await createPostResponse({
    fields: {
      links: {
        next: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          type: 'inline',
          action: {
            description: ``,
            icon: `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`,
            label: ``,
            title: `Hoppin | Tutorial`,
            type: 'action',
            links: {
              actions: [
                {
                  label: `⚔️ 100 DMG`,
                  href: `/api/blinks/bibada?action=${Action.DEAL_DAMAGE}&damage=100`,
                },
                {
                  label: `⚔️ 1,000 DMG`,
                  href: `/api/blinks/bibada?action=${Action.DEAL_DAMAGE}&damage=1000`,
                },
                {
                  label: `⚔️ 10,000 DMG`,
                  href: `/api/blinks/bibada?action=${Action.DEAL_DAMAGE}&damage=10000`,
                },
              ],
            },
          },
        },
      },
      transaction: transaction,
    },
  })

  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  })
}
