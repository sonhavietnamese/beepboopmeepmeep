import { BASE_URL, Font } from '@/constants'
import { createBlankTransaction } from '@/utils/create-blank-tx'
import { loadFont } from '@/utils/load-font'
import { ActionGetResponse, ACTIONS_CORS_HEADERS, createPostResponse } from '@solana/actions'
import { PublicKey } from '@solana/web3.js'
import satori from 'satori'

export const runtime = 'edge'

export async function GET() {
  const roboto = await loadFont(Font.ROBOTO_REGULAR)

  const svg = await satori(
    <div tw='flex flex-col w-full h-full items-center justify-center'>
      <img src={`http://localhost:3501/bg/bg.png`} tw='w-full h-full absolute' />
      <img src={`http://localhost:3501/boss/compressed-minotos-00.png`} tw='w-full h-full absolute' />
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
          type: 'post',
          label: 'Start',
          href: '/api/blinks/bibada?stage=start&step=0',
        },
        {
          type: 'post',
          label: 'Tutorial',
          href: '/api/blinks/bibada?stage=tutorial',
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
  // req: Request
  const body = (await req.json()) as { account: string; signature: string }
  const sender = new PublicKey(body.account)

  const transaction = await createBlankTransaction(sender)

  const roboto = await loadFont(Font.ROBOTO_REGULAR)

  const svg = await satori(
    <div tw='flex flex-col w-full h-full items-center justify-center'>
      <img src={`${BASE_URL}/bg/bg.png`} width={800} height={800} tw='w-full h-full absolute' />
      <img src={`${BASE_URL}/boss/compressed-minotos-04.png`} width={800} height={800} tw='w-full h-full absolute' />
      <img src={`${BASE_URL}/left/compressed-cute-butterfly-a.png`} width={800} height={800} tw='w-full h-full absolute' />
      <img src={`${BASE_URL}/middle/compressed-cute-butterfly-b.png`} width={800} height={800} tw='w-full h-full absolute' />
      <img src={`${BASE_URL}/right/compressed-cute-butterfly-a.png`} width={800} height={800} tw='w-full h-full absolute' />
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
                  href: `/api/action?stage=start&step=0`,
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
