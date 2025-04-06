'use client'

import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'
import { Analytics } from "@vercel/analytics/react"
import Footer from '../components/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full bg-[#0A0F1C]">
      <body className={`${inter.className} h-full bg-[#0A0F1C]`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className="min-h-screen flex flex-col">
            <div className="flex-grow">
              {children}
              <Analytics />
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



