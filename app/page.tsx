'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import StockInput from '@/components/StockInput'
import StockPrediction from '@/components/StockPrediction'

export default function Home() {
  const [ticker, setTicker] = useState('')
  const [key, setKey] = useState(0)

  useEffect(() => {
    // Set background color for html and body
    document.documentElement.style.backgroundColor = '#0A0F1C'
    document.body.style.backgroundColor = '#0A0F1C'
    
    return () => {
      document.documentElement.style.backgroundColor = ''
      document.body.style.backgroundColor = ''
    }
  }, [])

  const handleTickerSubmit = (newTicker: string) => {
    // Reset ticker to trigger loading state
    setTicker('')
    // Increment key to force re-render of StockPrediction
    setKey(prev => prev + 1)
    
    // Set the new ticker immediately to trigger loading state
    setTicker(newTicker)
  }

  return (
    <main className="min-h-screen bg-[#0A0F1C] text-white relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="fixed inset-0 pointer-events-none opacity-50">
        <motion.div 
          className="absolute top-1/4 -left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/3 -right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <Header />
      
      <div className="container mx-auto px-6 max-w-7xl pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">
            Predict Stock Trends
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Get accurate stock predictions powered by advanced machine learning algorithms.
            Make informed investment decisions with StockSage.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <StockInput onSubmit={handleTickerSubmit} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8"
        >
          {ticker && <StockPrediction key={`${ticker}-${key}`} ticker={ticker} />}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              title: 'Advanced ML Models',
              description: 'Powered by state-of-the-art machine learning algorithms for accurate predictions',
              icon: '🤖'
            },
            {
              title: 'Real-time Data',
              description: 'Get up-to-the-minute stock data and predictions for informed decisions',
              icon: '📊'
            },
            {
              title: 'Easy to Use',
              description: 'Simple and intuitive interface for both beginners and experienced traders',
              icon: '✨'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/5"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="text-gray-400 text-sm">
            © 2023 StockSage. All rights reserved.
          </p>
        </motion.div>
      </div>
    </main>
  )
}

