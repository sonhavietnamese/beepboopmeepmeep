// import { BASE_URL } from '@/constants'
// import { createBlankTransaction } from '@/utils/create-blank-tx'
// import { ActionGetResponse, ACTIONS_CORS_HEADERS, createPostResponse } from '@solana/actions'
// import { PublicKey } from '@solana/web3.js'
import { ActionGetResponse, ACTIONS_CORS_HEADERS } from '@solana/actions'
// import { readFile } from 'node:fs/promises'
// import satori from 'satori'
// import { html } from 'satori-html'

// const template = html`
//   <div style={{ color: 'black', fontSize: 128 }}>hello, world</div>
// `

// async function initFonts() {
//   const fontData = await readFile(process.cwd() + '/app/fonts/Roboto-Regular.ttf')

//   return fontData
// }

// export async function GET() {
//   const robotoArrayBuffer = await initFonts()

//   const svg = await satori(template, {
//     width: 800,
//     height: 800,
//     fonts: [
//       {
//         name: 'Roboto',
//         data: robotoArrayBuffer,
//       },
//     ],
//   })

//   const response: ActionGetResponse = {
//     type: 'action',
//     icon: `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`,
//     // icon: `data:image/svg+xml;base64,`,
//     title: 'Hoppin',
//     description: 'Hop through holes and collect $SEND',
//     label: '',
//     links: {
//       actions: [
//         {
//           label: 'Start',
//           href: '/api/action?stage=start&step=0',
//         },
//         {
//           label: 'Tutorial',
//           href: '/api/action?stage=tutorial',
//         },
//       ],
//     },
//   }

//   return Response.json(response, {
//     headers: ACTIONS_CORS_HEADERS,
//   })
// }

// export const OPTIONS = GET

// export async function POST(req: Request) {
//   const body = (await req.json()) as { account: string; signature: string }
//   const sender = new PublicKey(body.account)

//   const transaction = await createBlankTransaction(sender)

//   const payload = await createPostResponse({
//     fields: {
//       links: {
//         next: {
//           type: 'inline',
//           action: {
//             description: ``,
//             icon: `${BASE_URL}/tutorial.png`,
//             label: ``,
//             title: `Hoppin | Tutorial`,
//             type: 'action',
//             links: {
//               actions: [
//                 {
//                   label: `Hop in`,
//                   href: `/api/action?stage=start&step=0`,
//                 },
//               ],
//             },
//           },
//         },
//       },
//       transaction: transaction,
//     },
//   })

//   return Response.json(payload, {
//     headers: ACTIONS_CORS_HEADERS,
//   })
// }

export function GET() {
  const response: ActionGetResponse = {
    type: 'action',
    icon: `data:image/svg+xml;base64`,
    // icon: `data:image/svg+xml;base64,`,
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
