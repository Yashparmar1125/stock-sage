import { Github, Linkedin, Instagram } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2024)
  
  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])
  
  const socialLinks = [
    { icon: Github, href: 'https://github.com/Yashparmar1125', label: 'GitHub' },
    { icon: Instagram, href: 'https://www.instagram.com/Yash11_25/', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/yashparmar1125/', label: 'LinkedIn' }
  ]

  return (
    <footer className="w-full bg-[#0A0F1C] border-t border-white/[0.08] mt-20">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center space-x-3"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-cyan-500/10">
              <span className="text-sm font-bold text-white">S</span>
            </div>
            <p className="text-gray-400/90">
              © {currentYear} StockSage. All rights reserved.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center space-x-4"
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-gray-400 hover:text-white transition-all duration-300 hover:border-indigo-500/30"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                title={social.label}
              >
                <social.icon className="w-[18px] h-[18px]" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

