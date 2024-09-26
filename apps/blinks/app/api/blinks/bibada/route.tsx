import { Font } from '@/constants'
import { createBlankTransaction } from '@/utils/create-blank-tx'
import { loadFont } from '@/utils/load-font'
import { ActionGetResponse, ACTIONS_CORS_HEADERS, createPostResponse } from '@solana/actions'
import { PublicKey } from '@solana/web3.js'
import satori from 'satori'

export const runtime = 'edge'

export async function GET() {
  const roboto = await loadFont(Font.ROBOTO_REGULAR)

  const svg = await satori(<div style={{ color: 'black', fontSize: 128 }}>hello, world</div>, {
    width: 800,
    height: 800,
    embedFont: false,
    fonts: [
      {
        name: 'Roboto',
        data: roboto,
      },
    ],
  })

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
          href: '/api/action?stage=start&step=0',
        },
        {
          label: 'Tutorial',
          href: '/api/action?stage=tutorial',
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

  const svg = await satori(<div style={{ color: 'black', fontSize: 128 }}>wau, world</div>, {
    width: 800,
    height: 800,
    embedFont: false,
    fonts: [
      {
        name: 'Roboto',
        data: roboto,
      },
    ],
  })

  const payload = await createPostResponse({
    fields: {
      links: {
        next: {
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
