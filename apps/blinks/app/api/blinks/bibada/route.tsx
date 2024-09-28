import { BASE_URL, BOSS_PUBLIC_KEY, CONFIG, connection, Font, MEEPMEEP_PROGRAM_ID, PROGRAM } from '@/constants'
import MeepMeep from '@/idls/meepmeep.json'
import { createBlankTransaction } from '@/utils/create-blank-tx'
import { createDealDamageTx } from '@/utils/create-deal-damage-tx'
import { fetchBossData } from '@/utils/fetch-boss-data'
import { loadFont } from '@/utils/load-font'
import { trimWallet } from '@/utils/trim-wallet'
import { ActionGetResponse, ACTIONS_CORS_HEADERS, createPostResponse } from '@solana/actions'
import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import BN from 'bn.js'
import satori from 'satori'

export const runtime = 'edge'

const enum Action {
  START = 'start',
  DEAL_DAMAGE = 'deal-damage',
}

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

  // const boss = await fetchBossData()

  let transaction = new Transaction()

  switch (action) {
    case Action.START:
      transaction = await createBlankTransaction(sender)
      break
    case Action.DEAL_DAMAGE:
      transaction = await createDealDamageTx(sender, 100)
      break
    default:
      break
  }

  const roboto = await loadFont(Font.ROBOTO_REGULAR)

  const svg = await satori(
    <div tw='flex flex-col w-full h-full items-center justify-center'>
      <img src={`${BASE_URL}/bg/bg.png`} width={CONFIG.IMAGE_WIDTH} height={CONFIG.IMAGE_HEIGHT} tw='w-full h-full absolute' />

      <div tw='absolute inset-0 w-full h-full flex flex-col items-center justify-center'>
        <img src={`${BASE_URL}/boss/compressed-minotos-00.png`} width={CONFIG.IMAGE_WIDTH} height={CONFIG.IMAGE_HEIGHT} tw='w-full h-full absolute' />

        <div tw='absolute left-0 top-0 w-[328px] h-[30px] top-[70px] left-[244px] flex flex-col items-center justify-center'>
          <div tw='w-[304px] h-[24px] bg-[#544656]'></div>
          <div tw='w-[304px] h-[24px] bg-[#51AF6E] absolute origin-left left-3' style={{ width: '70%' }}></div>
          <img src={`${BASE_URL}/ui/boss-hp-bar.png`} width={328} height={30} tw='w-full h-full absolute' />
        </div>
      </div>

      <div tw='absolute inset-0 w-full h-full flex flex-col items-center justify-center'>
        <img
          src={`${BASE_URL}/left/compressed-cute-butterfly-a.png`}
          width={CONFIG.IMAGE_WIDTH}
          height={CONFIG.IMAGE_HEIGHT}
          tw='w-full h-full absolute'
        />

        <span tw='text-white absolute left-[80px] top-[490px] text-[28px] font-backbeat'>
          {trimWallet('GiytdaunbYyLB7Vmsr1aXgvhCwj4hN2B5v1h8fFELr5v')}
        </span>
      </div>

      <div tw='absolute inset-0 w-full h-full flex flex-col top-10 items-center justify-center'>
        <img
          src={`${BASE_URL}/middle/compressed-cute-butterfly-b.png`}
          width={CONFIG.IMAGE_WIDTH}
          height={CONFIG.IMAGE_HEIGHT}
          tw='w-full h-full absolute'
        />

        <span tw='text-white absolute left-[370px] top-[490px] text-[28px] font-backbeat'>You</span>
      </div>

      <div tw='absolute inset-0 w-full h-full flex flex-col items-center justify-center'>
        <img
          src={`${BASE_URL}/right/compressed-cute-butterfly-a.png`}
          width={CONFIG.IMAGE_WIDTH}
          height={CONFIG.IMAGE_HEIGHT}
          tw='w-full h-full absolute'
        />

        <span tw='text-white absolute right-[20px] top-[460px] text-[28px] font-backbeat'>
          {trimWallet('GiytdaunbYyLB7Vmsr1aXgvhCwj4hN2B5v1h8fFELr5v')}
        </span>
      </div>

      <div tw='absolute top-0 left-0 w-[250px] h-[235px] flex flex-col items-center justify-center'>
        <img src={`${BASE_URL}/ui/rank-panel.png`} width={250} height={235} tw='w-full h-full' />

        <div tw='flex flex-col w-[250px] absolute gap-12 top-[75px] items-center pl-12 pr-9 justify-center z-[10]'>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} tw='flex items-center justify-between w-full mt-[3px]'>
              <span tw='text-white text-[22px] font-backbeat'>{trimWallet('GiytdaunbYyLB7Vmsr1aXgvhCwj4hN2B5v1h8fFELr5v')}</span>
              <span tw='text-white text-[22px] font-backbeat'>1k</span>
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
                  label: `Hop in`,
                  href: `/api/blinks/bibada?stage=start&step=0`,
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
