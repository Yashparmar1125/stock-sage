'use client'

import { motion } from 'framer-motion'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BarChart2, Database, Brain, TrendingUp, CheckCircle, ArrowRight, LineChart, Zap } from 'lucide-react'
import Link from 'next/link'

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  }

  const cardHover = {
    scale: 1.02,
    transition: { duration: 0.2 }
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 text-white">
      <motion.div 
        className="max-w-4xl mx-auto space-y-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 flex items-center justify-center border border-white/10"
          >
            <LineChart className="w-10 h-10 text-indigo-400" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">
            About StockSage
          </h1>
          <p className="text-lg text-gray-300/90 max-w-2xl mx-auto">
            Gain insights into future stock movements with our platform powered by advanced machine learning and technical analysis.
          </p>
        </motion.div>

        {/* How it Works Section */}
        <motion.section variants={itemVariants}>
          <h2 className="text-3xl font-semibold mb-8 text-center">How It Works</h2>
          <motion.div 
            className="p-8 rounded-2xl bg-[#0A0F1C]/60 border border-white/[0.08] backdrop-blur-sm space-y-6 relative group"
            whileHover={cardHover}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6">
              {[{
                  title: "Data Collection", 
                  description: "We fetch historical and real-time stock data from reliable sources like Yahoo Finance.",
                  icon: Database,
                  gradient: "from-blue-500/20 to-cyan-500/20"
                },{
                  title: "Feature Engineering", 
                  description: "Technical indicators (SMA, EMA, RSI, OBV, Bollinger Bands) are calculated.",
                  icon: BarChart2,
                  gradient: "from-cyan-500/20 to-teal-500/20"
                },{
                  title: "Machine Learning Model", 
                  description: "An XGBoost Regressor model is trained on the engineered features to identify patterns.",
                  icon: Brain,
                  gradient: "from-indigo-500/20 to-purple-500/20"
                },{
                  title: "Prediction Generation", 
                  description: "The trained model predicts the next day's closing price and future trends.",
                  icon: TrendingUp,
                  gradient: "from-purple-500/20 to-pink-500/20"
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start space-x-4 p-4 rounded-lg hover:bg-white/[0.02] transition-colors duration-200 group/item"
                  variants={itemVariants}
                >
                  <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-br ${item.gradient} rounded-lg flex items-center justify-center border border-white/10 group-hover/item:border-indigo-500/30 transition-colors duration-200`}>
                    <item.icon className="w-5 h-5 text-white/70 group-hover/item:text-indigo-400 transition-colors duration-200" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-md text-white/95 group-hover/item:text-white transition-colors duration-200">{item.title}</h3>
                    <p className="text-sm text-gray-400/90 group-hover/item:text-gray-300/90 transition-colors duration-200">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <motion.section variants={itemVariants}>
          <h2 className="text-3xl font-semibold mb-8 text-center">Key Features</h2>
          <motion.div 
            className="p-8 rounded-2xl bg-[#0A0F1C]/60 border border-white/[0.08] backdrop-blur-sm space-y-4 relative group"
            whileHover={cardHover}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            <div className="relative">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {[ "Accurate ML Predictions",
                  "Real-time Data Processing",
                  "Comprehensive Technical Analysis",
                  "Intuitive User Interface",
                  "10-Day Price Forecasting",
                  "Responsive Design for All Devices"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center space-x-3 py-1.5 group/item"
                    variants={itemVariants}
                  >
                    <div className="flex-shrink-0 p-1 rounded-full bg-green-500/10 group-hover/item:bg-green-500/20 transition-colors duration-200">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="text-gray-300/90 text-sm group-hover/item:text-white transition-colors duration-200">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.section>

        {/* Call to Action */}
        <motion.section variants={itemVariants} className="text-center space-y-6">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold">Ready to Get Started?</h2>
            <p className="text-lg text-gray-300/90 max-w-xl mx-auto">
              Enter any valid stock ticker on the home page and let StockSage provide you with data-driven insights.
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link 
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 hover:from-cyan-400 hover:to-indigo-400"
            >
              <span>Start Predicting Now</span>
              <Zap className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.section>
      </motion.div>
    </div>
  )
}

