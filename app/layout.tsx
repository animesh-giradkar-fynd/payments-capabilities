import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Fynd Payments Capability Dashboard',
  description:
    'Merchant and admin views for Fynd payments capability coverage across channels.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-50 text-zinc-950 antialiased">
        {children}
      </body>
    </html>
  )
}
