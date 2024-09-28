import { ADMIN_KEYPAIR } from '@/constants'
import createEdgeClient, { BadgesCondition, Transaction } from '@honeycomb-protocol/edge-client'
import { sendTransactionForTests as sendTransactionT } from '@honeycomb-protocol/edge-client/client/helpers'
import { Connection, Keypair, PublicKey, SystemProgram, TransactionMessage, VersionedTransaction } from '@solana/web3.js'
import base58 from 'bs58'

const RPC_URL = 'https://rpc.test.honeycombprotocol.com/'
const API_URL = 'https://edge.test.honeycombprotocol.com/'
export const connection = new Connection(RPC_URL, {
  commitment: 'processed',
})

export const honeycomb = createEdgeClient(API_URL, true)

export const sendTransaction = async (txResponse: Transaction, signers: Keypair[], action?: string, logOnSuccess = false) => {
  const response = await sendTransactionT(
    honeycomb,
    {
      transaction: txResponse.transaction,
      blockhash: txResponse!.blockhash,
      lastValidBlockHeight: txResponse!.lastValidBlockHeight,
    },
    signers,
    {
      skipPreflight: true,
      commitment: 'finalized',
    },
  )
  if (logOnSuccess || response.status !== 'Success') {
    console.error(action, response.status, response.signature, response.error)
  }
  return response
}

export async function createProject({
  name = 'Test Project',
  profilesTreeCapacity = 100,
  authority = ADMIN_KEYPAIR.publicKey.toString(),
  payer = ADMIN_KEYPAIR.publicKey.toString(),
  subsidizeFees = true,
  createBadgingCriteria = true,
}: {
  name?: string
  profilesTreeCapacity?: number
  authority?: string
  payer?: string
  subsidizeFees?: boolean
  createBadgingCriteria?: boolean
} = {}) {
  const {
    createCreateProjectTransaction: { project: projectAddress, tx: txResponse },
  } = await honeycomb.createCreateProjectTransaction({
    name,
    authority,
    payer,
    subsidizeFees,
  })
  await sendTransaction(txResponse, [ADMIN_KEYPAIR], 'createCreateProjectTransaction')
  let project = await honeycomb.findProjects({ addresses: [projectAddress] }).then((res) => res.project[0])

  if (subsidizeFees) {
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()
    const versionedTx = new VersionedTransaction(
      new TransactionMessage({
        instructions: [
          SystemProgram.transfer({
            fromPubkey: ADMIN_KEYPAIR.publicKey,
            toPubkey: new PublicKey(projectAddress),
            lamports: 1_000_000_000,
          }),
        ],
        payerKey: ADMIN_KEYPAIR.publicKey,
        recentBlockhash: blockhash,
      }).compileToV0Message([]),
    )
    versionedTx.sign([ADMIN_KEYPAIR])
    await sendTransaction(
      {
        transaction: base58.encode(versionedTx.serialize()),
        blockhash,
        lastValidBlockHeight,
      },
      [ADMIN_KEYPAIR],
      'fundProjectForSubsidy',
    )
  }

  if (profilesTreeCapacity) {
    const {
      createCreateProfilesTreeTransaction: { tx: txResponse },
    } = await honeycomb.createCreateProfilesTreeTransaction({
      treeConfig: {
        basic: {
          numAssets: profilesTreeCapacity,
        },
        // advanced: {
        //   maxDepth: 3,
        //   maxBufferSize: 8,
        //   canopyDepth: 3,
        // },
      },
      project: project.address,
      payer: ADMIN_KEYPAIR.publicKey.toString(),
    })
    await sendTransaction(txResponse, [ADMIN_KEYPAIR], 'createCreateProfilesTreeTransaction')

    project = await honeycomb
      .findProjects({
        addresses: [project.address],
      })
      .then(({ project: [project] }) => project)
  }

  if (createBadgingCriteria) {
    const { createInitializeBadgeCriteriaTransaction: txResponse } = await honeycomb.createInitializeBadgeCriteriaTransaction({
      args: {
        authority: ADMIN_KEYPAIR.publicKey.toString(),
        projectAddress,
        endTime: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
        startTime: Math.floor(Date.now() / 1000),
        badgeIndex: 0,
        payer: ADMIN_KEYPAIR.publicKey.toString(),
        condition: BadgesCondition.Public,
      },
    })

    await sendTransaction(txResponse, [ADMIN_KEYPAIR], 'createInitializeBadgeCriteriaTransaction')

    project = await honeycomb.findProjects({ addresses: [projectAddress] }).then((res) => res.project[0])
  }

  return project
}
