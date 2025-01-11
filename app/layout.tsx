'use client'

import { useState, useEffect } from 'react'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  //const [darkMode, setDarkMode] = useState(true)

  //useEffect(() => {
  //  document.documentElement.classList.toggle('dark', darkMode)
  //}, [darkMode])

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100 via-purple-200 to-pink-200 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 z-[-1]" />
          <div className="fixed top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-repeat z-[-1] opacity-30 dark:opacity-10" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

