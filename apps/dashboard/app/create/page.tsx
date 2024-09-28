'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ADMIN_KEYPAIR } from '@/constants'
import { connection, honeycomb, sendTransaction } from '@/services/honeycomb'
import { formatWallet } from '@repo/utils'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import { ChevronDownIcon, LogOutIcon, PlusIcon, SettingsIcon, UserIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const wallet = useWallet()
  const { setVisible } = useWalletModal()

  const projects = [
    { id: 1, name: 'Project Alpha', description: 'A cutting-edge web application' },
    { id: 2, name: 'Project Beta', description: 'Mobile app for productivity' },
    { id: 3, name: 'Project Gamma', description: 'AI-powered data analysis tool' },
  ]

  const adminName = wallet.publicKey?.toString()

  const handleLogin = () => {
    if (!wallet.publicKey) {
      setVisible(true)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  useEffect(() => {
    if (wallet.publicKey?.toString() === process.env.NEXT_PUBLIC_ADMIN_PUBLIC_KEY) {
      setIsLoggedIn(true)
    }
  }, [wallet.publicKey])

  if (!isLoggedIn) {
    return (
      <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
        <Card className='w-[350px]'>
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Please log in to access the dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleLogin} className='w-full'>
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const create = async () => {
    if (!wallet.publicKey) return

    console.log('creating project')
    const {
      createCreateProjectTransaction: { project: projectAddress, tx: txResponse },
    } = await honeycomb.createCreateProjectTransaction({
      name: 'Test Project',
      authority: ADMIN_KEYPAIR.publicKey.toString(),
      payer: ADMIN_KEYPAIR.publicKey.toString(),
    })
    await sendTransaction(txResponse, [ADMIN_KEYPAIR], 'createCreateProjectTransaction')

    const project = await honeycomb.findProjects({ addresses: [projectAddress] }).then((res) => res.project[0])

    if (project.subsidyFees) {
      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: ADMIN_KEYPAIR.publicKey,
          toPubkey: new PublicKey(projectAddress),
          lamports: 1_000_000_000,
        }),
      )
      tx.feePayer = ADMIN_KEYPAIR.publicKey

      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()
      tx.recentBlockhash = blockhash
      tx.lastValidBlockHeight = lastValidBlockHeight
      tx.sign(ADMIN_KEYPAIR)

      const signature = await connection.sendRawTransaction(tx.serialize())
      await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight,
      })
    }
    console.log('project', project)
  }

  return (
    <div className='min-h-screen bg-gray-100'>
      <header className='bg-white shadow'>
        <div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center'>
            <h1 className='text-3xl font-bold text-gray-900'>Admin Dashboard</h1>
            <div className='flex items-center space-x-4'>
              <Avatar>
                <AvatarImage src='/placeholder.svg?height=40&width=40' alt={formatWallet(adminName || '')} />
                <AvatarFallback>AA</AvatarFallback>
              </Avatar>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' className='flex items-center'>
                    {formatWallet(adminName || '')}
                    <ChevronDownIcon className='ml-2 h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuItem>
                    <UserIcon className='mr-2 h-4 w-4' />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SettingsIcon className='mr-2 h-4 w-4' />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOutIcon className='mr-2 h-4 w-4' />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
      <main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
        <div className='px-4 py-6 sm:px-0'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-2xl font-semibold text-gray-900'>Projects</h2>
            <Button className='flex items-center' onClick={create}>
              <PlusIcon className='mr-2 h-4 w-4' />
              Create New Project
            </Button>
          </div>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {projects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant='outline' className='w-full'>
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
