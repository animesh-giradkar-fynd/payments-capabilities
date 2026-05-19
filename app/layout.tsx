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
      <body className="min-h-screen bg-fynd-surface-20 text-fynd-text antialiased">
        {children}
      </body>
    </html>
  )
}
