'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import StockInput from '../components/StockInput'
import StockPrediction from '../components/StockPrediction'

export default function Home() {
  const [ticker, setTicker] = useState('')

  return (
    <div className="min-h-screen pb-12" suppressHydrationWarning={true}>
      <Header />
      <main className="container mx-auto px-4 py-8 relative max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold mb-4 text-gray-200 relative inline-block">
            StockSage AI
            <motion.div
              className="absolute -bottom-2 left-0 w-full h-2 bg-blue-500"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
          </h1>
          <p className="text-xl mb-8 text-gray-400">
            Predict the future of stocks with cutting-edge AI technology
          </p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get Started
          </motion.div>
        </motion.div>
        <div className="glassmorphism p-8 mt-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
          <StockInput onSubmit={setTicker} />
          {ticker && <StockPrediction ticker={ticker} />}
        </div>
      </main>
    </div>
  )
}

