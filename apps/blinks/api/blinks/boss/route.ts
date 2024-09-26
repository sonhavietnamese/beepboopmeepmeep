import { BASE_URL } from '@/constants'
import { createBlankTransaction } from '@/utils/create-blank-tx'
import { ActionGetResponse, ACTIONS_CORS_HEADERS, createPostResponse } from '@solana/actions'
import { PublicKey } from '@solana/web3.js'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const response: ActionGetResponse = {
    type: 'action',
    icon: `${BASE_URL}/thumbnail.png`,
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

  return NextResponse.json(response, {
    headers: ACTIONS_CORS_HEADERS,
  })
}

export const OPTIONS = GET

export async function POST(req: Request) {
  const body = (await req.json()) as { account: string; signature: string }
  const sender = new PublicKey(body.account)

  const transaction = await createBlankTransaction(sender)

  const payload = await createPostResponse({
    fields: {
      links: {
        next: {
          type: 'inline',
          action: {
            description: ``,
            icon: `${BASE_URL}/tutorial.png`,
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

  return NextResponse.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  })
}
