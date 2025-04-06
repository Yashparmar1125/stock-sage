'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search } from 'lucide-react'

interface StockInputProps {
  onSubmit: (ticker: string) => void
}

export const stockMapping: { [key: string]: string } = {
  '3M India': '3MINDIA', 'Abbott India': 'ABBOTINDIA', 'Adani Enterprises': 'ADANIENT', 'Adani Green Energy': 'ADANIGREEN',
  'Adani Power': 'ADANIPOWER', 'Adani Ports': 'ADANIPORTS', 'Alembic Pharmaceuticals': 'APLLTD', 'Alkem Laboratories': 'ALKEM',
  'Ambuja Cements': 'AMBUJACEM', 'Aurobindo Pharma': 'AUROPHARMA', 'Axis Bank': 'AXISBANK', 'Bajaj Auto': 'BAJAJ-AUTO',
  'Bajaj Finance': 'BAJFINANCE', 'Bajaj Finserv': 'BAJAJFINSV', 'Bandhan Bank': 'BANDHANBNK', 'Bank of Baroda': 'BANKBARODA',
  'Bharti Airtel': 'BHARTIARTL', 'Birla Corporation': 'BIRLACORPN', 'Bosch Limited': 'BOSCHLTD', 'Britannia Industries': 'BRITANNIA',
  'Cadila Healthcare': 'CADILAHC', 'Canara Bank': 'CANBK', 'Cipla': 'CIPLA', 'Coal India': 'COALINDIA', 'Container Corporation of India': 'CONCOR',
  'Divis Laboratories': 'DIVISLAB', 'Dabur India': 'DABUR', 'Dr. Reddys Laboratories': 'DRREDDY', 'Eicher Motors': 'EICHERMOT',
  'Federal Bank': 'FEDERALBNK', 'GAIL India': 'GAIL', 'Godrej Consumer Products': 'GODREJCP', 'Grasim Industries': 'GRASIM',
  'HCL Technologies': 'HCLTECH', 'HDFC Asset Management': 'HDFCAMC', 'HDFC Bank': 'HDFCBANK', 'Hindalco Industries': 'HINDALCO',
  'Hindustan Zinc': 'HINDZINC', 'ICICI Bank': 'ICICIBANK', 'ICICI Lombard General Insurance': 'ICICIGI', 'Indiabulls Housing Finance': 'IBULHSGFIN',
  'IndusInd Bank': 'INDUSINDBK', 'Infosys': 'INFY', 'ITC Limited': 'ITC', 'JSW Steel': 'JSWSTEEL', 'Kajaria Ceramics': 'KAJARIACER',
  'Kotak Mahindra Bank': 'KOTAKBANK', 'Larsen & Toubro': 'LT', 'Lupin': 'LUPIN', 'Mahindra & Mahindra': 'M&M', 'Motherson Sumi': 'MOTHERSUMI',
  'Marico': 'MARICO', 'Nestle India': 'NESTLEIND', 'NMDC Limited': 'NMDC', 'NTPC Limited': 'NTPC', 'Oberoi Realty': 'OBEROIRLTY',
  'Oil and Natural Gas Corporation': 'ONGC', 'Power Grid Corporation of India': 'POWERGRID', 'Punjab National Bank': 'PNB',
  'RBL Bank': 'RBLBANK', 'Reliance Industries': 'RELIANCE', 'SBI Life Insurance': 'SBILIFE', 'Shree Cement': 'SHREECEM',
  'Siemens': 'SIEMENS', 'State Bank of India': 'SBI', 'Sun Pharmaceutical Industries': 'SUNPHARMA', 'Tata Chemicals': 'TATACHEM',
  'Tata Consultancy Services': 'TCS', 'Tata Motors': 'TATAMOTORS', 'Tata Power': 'TATAPOWER', 'Tech Mahindra': 'TECHM', 'Titan': 'TITAN',
  'UltraTech Cement': 'ULTRACEMCO', 'UPL': 'UPL', 'Wipro Limited': 'WIPRO', 'Zee Entertainment Enterprises': 'ZEEL', 'Zomato': 'ZOMATO',
  'Ajanta Pharma': 'AJANTPHARM', 'Bajaj Hindusthan Sugar': 'BAJAJHIND', 'Balrampur Chini Mills': 'BALRAMCHIN', 'Bank of India': 'BANKINDIA',
  'Bharti Infratel': 'BHARTIINFR', 'Blue Star': 'BLUESTARCO', 'Chennai Petrochemicals': 'CHENNPETRO',
  'Cholamandalam Investment': 'CHOLAFIN', 'Coromandel International': 'COROMANDEL', 'Crisil': 'CRISIL', 
  'Exide Industries': 'EXIDEIND', 'Godrej Industries': 'GODREJIND', 'Hindustan Unilever': 'HUL', 'ICICI Prudential Life Insurance': 'ICICIPRULI',
  'Indian Oil Corporation': 'IOC',  
  'L&T Technology Services': 'LTTS', 'Lupin Limited': 'LUPIN', 'Mahindra Lifespace Developers': 'MAHLIFE', 
  'National Aluminium Company': 'NALCO',   'Pidilite Industries': 'PIDILITIND',
  'Piramal Enterprises': 'PIRAMAL', 'Power Finance Corporation': 'PFC', 'Power Grid Corporation': 'POWERGRID', 
  'Siemens Ltd': 'SIEMENS',  
   'Titan Company': 'TITAN',  
  'Voltas': 'VOLTAS', 'TCS': 'TCS', 'INFY': 'INFY', 'RELIANCE': 'RELIANCE', 'HDFC': 'HDFC', 
  'ICICIBANK': 'ICICIBANK', 'SBIN': 'SBIN', 'HINDUNILVR': 'HINDUNILVR', 
  'BAJFINANCE': 'BAJFINANCE', 'KOTAKBANK': 'KOTAKBANK', 'LT': 'LT', 
  'ITC': 'ITC', 'AXISBANK': 'AXISBANK', 'BHEL': 'BHEL', 'MARUTI': 'MARUTI',
  'M&M': 'M&M', 'TITAN': 'TITAN', 'BHARTIARTL': 'BHARTIARTL', 'WIPRO': 'WIPRO',
  'ULTRACEMCO': 'ULTRACEMCO', 'TATAMOTORS': 'TATAMOTORS', 'TECHM': 'TECHM',
  'HDFC BANK': 'HDFCBANK', 'ADANIGREEN': 'ADANIGREEN', 'ADANIPORTS': 'ADANIPORTS',
  'DIVISLAB': 'DIVISLAB', 'SUNPHARMA': 'SUNPHARMA', 'TATASTEEL': 'TATASTEEL',
  'RECLTD': 'RECLTD', 'GAIL': 'GAIL', 'POWERGRID': 'POWERGRID', 'DRREDDY': 'DRREDDY',
  'INDUSINDBK': 'INDUSINDBK', 'ASIANPAINT': 'ASIANPAINT', 'EICHERMOT': 'EICHERMOT',
  'APOLLOHOSP': 'APOLLOHOSP', 'CIPLA': 'CIPLA', 'HCLTECH': 'HCLTECH', 'GODREJCP': 'GODREJCP',
  'SHREECEM': 'SHREECEM',  'BAJAJFINSV': 'BAJAJFINSV', 'PNB': 'PNB',
  'BOSCHLTD': 'BOSCHLTD', 'MARICO': 'MARICO', 'DABUR': 'DABUR', 'JINDALSTEL': 'JINDALSTEL',
  'MUTHOOTFIN': 'MUTHOOTFIN', 'ICICIGI': 'ICICIGI', 'TATACONSUM': 'TATACONSUM',
  'INDIAMART': 'INDIAMART', 'BERGEPAINT': 'BERGEPAINT', 'MOTHERSUMI': 'MOTHERSUMI',
  'CANBK': 'CANBK', 'BEL': 'BEL', 'HAVELLS': 'HAVELLS', 'TATAPOWER': 'TATAPOWER',
  'IOB': 'IOB', 'SBILIFE': 'SBILIFE', 'HEROMOTOCO': 'HEROMOTOCO', 'NTPC': 'NTPC',
  'VOLTAS': 'VOLTAS', 'CHOLAFIN': 'CHOLAFIN', 'LUPIN': 'LUPIN', 'HDFCLIFE': 'HDFCLIFE',
  'COALINDIA': 'COALINDIA', 'NESTLEIND': 'NESTLEIND', 'PVR': 'PVR', 'RAJESHEXPORTS': 'RAJESHEXPORTS',
  'INFIBEAM': 'INFIBEAM', 'LTI': 'LTI', 'RELIANCEIND': 'RELIANCEIND', 'HINDALCO': 'HINDALCO',
  'M&MFIN': 'M&MFIN', 'PERSISTENT': 'PERSISTENT', 'SRF': 'SRF', 'WELSPUNIND': 'WELSPUNIND',
  'RAMCOCEM': 'RAMCOCEM', 'ADANIPOWER': 'ADANIPOWER', 'FEDERALBNK': 'FEDERALBNK',
  'SBI LIFE': 'SBILIFE', 'GICRE': 'GICRE', 'NLCINDIA': 'NLCINDIA', 'MCX': 'MCX',
  'ZOMATO': 'ZOMATO', 'BAJJAUTO': 'BAJJAUTO', 'TATAELXSI': 'TATAELXSI', 'BALKRISIND': 'BALKRISIND',
  'JUBLFOOD': 'JUBLFOOD', 'TATAGLOBAL': 'TATAGLOBAL', 'APOLLOTYRE': 'APOLLOTYRE',
  'MRF': 'MRF', 'BIRLACORPN': 'BIRLACORPN', 'NAYARA': 'NAYARA', 'IDFCFIRSTB': 'IDFCFIRSTB',
  'GMRINFRA': 'GMRINFRA', 'IRCTC': 'IRCTC', 'IEX': 'IEX', 'LALPATHLAB': 'LALPATHLAB',
  'INFRATEL': 'INFRATEL', 'BIOCON': 'BIOCON', 'COLPAL': 'COLPAL', 'NMDC': 'NMDC',
  'VGUARD': 'VGUARD', 'RELIANCEINFRA': 'RELIANCEINFRA', 'PUNJAB NATIONAL BANK': 'PNB',
  'SOMANYCERA': 'SOMANYCERA', 'ACC': 'ACC', 'AMBUJACEM': 'AMBUJACEM',
   'VODAFONE': 'VODAFONE',  'SBI': 'SBI', 'MOTHERSONSUMI': 'MOTHERSONSUMI',
   'HUL': 'HUL', 
  'RBLBANK': 'RBLBANK', 
  'POLYCAB': 'POLYCAB',  'MINDTREE': 'MINDTREE', 
   'DELTA': 'DELTA', 'HDFCAMC': 'HDFCAMC',
  'INDIACEM': 'INDIACEM', 'LICHSGFIN': 'LICHSGFIN', 
  'MAXHEALTH': 'MAXHEALTH',  'LIC': 'LIC', 'AARTIIND': 'AARTIIND'
};


export default function StockInput({ onSubmit }: StockInputProps) {
  const [ticker, setTicker] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isFocused, setIsFocused] = useState(false)
  const [noMatches, setNoMatches] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Debounce the search logic
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }
    
    debounceTimeout.current = setTimeout(() => {
      if (ticker.length > 0) {
        const filteredSuggestions = Object.keys(stockMapping).filter(stock =>
          stock.toLowerCase().includes(ticker.toLowerCase())
        )
        setSuggestions(filteredSuggestions.slice(0, 5))
        setNoMatches(filteredSuggestions.length === 0)
      } else {
        setSuggestions([])
        setNoMatches(false)
      }
    }, 300)

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current)
      }
    }
  }, [ticker])

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/50 via-indigo-500/50 to-purple-500/50 rounded-xl blur-sm opacity-0 transition duration-300" />
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={ticker}
            onChange={(e) => {
              setTicker(e.target.value)
              if (e.target.value.length > 0) {
                const filteredSuggestions = Object.keys(stockMapping).filter(stock =>
                  stock.toLowerCase().includes(e.target.value.toLowerCase())
                )
                setSuggestions(filteredSuggestions.slice(0, 5))
                setNoMatches(filteredSuggestions.length === 0)
              } else {
                setSuggestions([])
                setNoMatches(false)
              }
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              requestAnimationFrame(() => setIsFocused(false))
            }}
            placeholder="Search for a stock (e.g., Reliance, TCS, Infosys)"
            className="w-full px-6 py-5 bg-[#0A0F1C]/90 border border-white/10 rounded-xl text-white/95 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 focus:border-indigo-500/20 transition-all duration-300"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            <Search className="text-gray-400/60 w-5 h-5" />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isFocused && (suggestions.length > 0 || noMatches) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute w-full mt-2 bg-[#0A0F1C]/90 backdrop-blur-sm rounded-xl border border-white/10 shadow-md overflow-hidden z-50"
          >
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  onSubmit(stockMapping[suggestion])
                  setTicker('')
                  setSuggestions([])
                }}
              >
                <div className="px-6 py-4 hover:bg-white/5 cursor-pointer transition-all duration-200 flex items-center justify-between">
                  <div>
                    <span className="text-white/90 font-medium">
                      {suggestion}
                    </span>
                    <span className="block text-sm text-gray-500">
                      {stockMapping[suggestion]}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
            {noMatches && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-6 py-4 text-gray-400 text-center"
              >
                No matches found
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-8 text-center space-y-4"
      >
        <p className="text-sm text-gray-400 font-medium">
          Popular stocks
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {['Reliance', 'TCS', 'Infosys', 'HDFC Bank', 'ICICI Bank'].map((stock) => (
            <button
              key={stock}
              onClick={() => {
                const ticker = stockMapping[stock] || stock
                onSubmit(ticker)
                setTicker('')
              }}
              className="px-4 py-2 rounded-lg bg-[#0A0F1C]/90 border border-white/10 text-white/80 text-sm transition-all duration-200"
            >
              <span>{stock}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

