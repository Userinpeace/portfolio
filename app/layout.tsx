import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import ErrorBoundary from '@/components/ErrorBoundary'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rahul Pawar - Full Stack Developer Portfolio',
  description: 'Cyberpunk-themed portfolio showcasing cutting-edge web development projects and technologies by Rahul Pawar',
  generator: 'Next.js',
  keywords: ['portfolio', 'web developer', 'cyberpunk', 'full stack', 'react', 'nextjs', 'rahul pawar'],
  authors: [{ name: 'Rahul Pawar' }],
  manifest: '/manifest.json',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#00ffff" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ErrorBoundary>
          <div className="min-h-screen bg-background text-foreground">
            {children}
          </div>
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  )
}
