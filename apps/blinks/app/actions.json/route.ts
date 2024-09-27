import { ACTIONS_CORS_HEADERS, ActionsJson } from '@solana/actions'

export const GET = async () => {
  const payload: ActionsJson = {
    rules: [
      {
        pathPattern: '/blinks/bibada',
        apiPath: '/api/blinks/bibada',
      },
      {
        pathPattern: '/blinks/forge',
        apiPath: '/api/blinks/forge',
      },
    ],
  }

  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  })
}
// ensures cors
export const OPTIONS = GET
