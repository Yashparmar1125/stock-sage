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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 z-[-1]" />
          <div className="fixed top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-repeat z-[-1] opacity-20 dark:opacity-10" />
          <div className="flex flex-col min-h-screen">
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



