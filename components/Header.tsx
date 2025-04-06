import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrolled])

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-[#0A0F1C]/80 backdrop-blur-md border-b border-white/[0.08] shadow-lg shadow-indigo-500/5' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-5 max-w-7xl">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="relative w-12 h-12 rounded-xl overflow-hidden"
            >
              {/* Logo background with gradient */}
              <div className="absolute inset-0 bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-indigo-500 via-purple-500 to-blue-500" />
              
              {/* Logo SVG */}
              <svg 
                className="absolute inset-0 w-full h-full p-2.5" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M4 14h4v6H4v-6zM10 10h4v10h-4V10zM16 6h4v14h-4V6z"
                  fill="white"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.8,
                    delay: 0.2,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                />
                <motion.path
                  d="M3 8C7 8 9 4 13 4C17 4 19 8 21 8"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ 
                    duration: 1.2,
                    delay: 0.4,
                    ease: "easeInOut"
                  }}
                />
              </svg>
              
              {/* Subtle glow effect */}
              <motion.div
                className="absolute inset-0 rounded-xl bg-white/5"
                animate={{ 
                  opacity: [0.05, 0.1, 0.05],
                  scale: [1, 1.03, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.5, 1]
                }}
              />
            </motion.div>
            
            <div className="flex flex-col">
              <motion.span 
                className="text-2xl font-bold bg-clip-text text-transparent bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-indigo-500 via-purple-500 to-blue-500"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                StockSage
              </motion.span>
              <motion.span 
                className="text-xs text-gray-400 -mt-1"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8,
                  delay: 0.6,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                AI-Powered Stock Predictions
              </motion.span>
            </div>
          </Link>
          
          <div className="flex items-center space-x-10">
            {[
              { name: 'Home', path: '/' },
              { name: 'About', path: '/about' }
            ].map((item) => (
              <Link 
                key={item.name} 
                href={item.path} 
                className="relative group py-2"
              >
                <span className="text-gray-300 group-hover:text-white transition-all duration-300">
                  {item.name}
                </span>
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-indigo-500 via-purple-500 to-blue-500 origin-left opacity-0 group-hover:opacity-100"
                  initial={false}
                  whileHover={{ scaleX: 1 }}
                  style={{ scaleX: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              </Link>
            ))}
            
            <motion.a
              href="https://github.com/Yashparmar1125/StockSage-AI"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-gray-300 text-sm transition-all duration-300 hover:border-indigo-500/40 hover:text-white flex items-center gap-2.5 hover:bg-white/[0.08]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              <span>GitHub</span>
            </motion.a>
          </div>
        </div>
      </nav>
    </motion.header>
  )
}

