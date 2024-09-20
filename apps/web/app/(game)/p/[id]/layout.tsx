import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Game',
  description: 'Game',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
