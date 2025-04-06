'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search } from 'lucide-react'

interface StockInputProps {
  onSubmit: (ticker: string) => void
}

// Add stock categories for better organization
const stockCategories: { [key: string]: string[] } = {
  'Technology': ['TCS', 'INFY', 'WIPRO', 'TECHM', 'HCLTECH', 'MINDTREE', 'LTI', 'PERSISTENT'],
  'Banking': ['HDFCBANK', 'ICICIBANK', 'SBIN', 'AXISBANK', 'KOTAKBANK', 'INDUSINDBK', 'FEDERALBNK', 'RBLBANK'],
  'Consumer Goods': ['HINDUNILVR', 'ITC', 'BRITANNIA', 'DABUR', 'MARICO', 'GODREJCP', 'TATACONSUM'],
  'Automotive': ['TATAMOTORS', 'M&M', 'BAJAJ-AUTO', 'HEROMOTOCO', 'EICHERMOT', 'MARUTI'],
  'Energy': ['RELIANCE', 'ONGC', 'TATAPOWER', 'NTPC', 'POWERGRID', 'ADANIGREEN', 'ADANIPOWER'],
  'Healthcare': ['SUNPHARMA', 'DRREDDY', 'CIPLA', 'DIVISLAB', 'BIOCON', 'APOLLOHOSP', 'LALPATHLAB'],
  'Real Estate': ['DLF', 'GODREJPROP', 'OBEROIRLTY', 'MAHLIFE', 'SUNTECK', 'BRIGADE'],
  'Telecom': ['BHARTIARTL', 'IDEA', 'VODAFONE', 'TATACOMM'],
  'Metals & Mining': ['TATASTEEL', 'HINDALCO', 'JINDALSTEL', 'COALINDIA', 'NMDC', 'HINDZINC'],
  'Retail': ['TITAN', 'TRENT', 'FBB', 'SHOPPERSSTOP', 'V2RETAIL', 'SPENCERS']
};

// Add stock descriptions for more information
const stockDescriptions: { [key: string]: string } = {
  'RELIANCE': 'India\'s largest conglomerate with interests in retail, telecom, and energy',
  'TCS': 'Global IT services and consulting company',
  'INFY': 'Leading IT services company with global presence',
  'HDFCBANK': 'India\'s largest private sector bank by market capitalization',
  'ICICIBANK': 'Major private sector bank with diverse financial services',
  'SBIN': 'India\'s largest public sector bank',
  'HINDUNILVR': 'Consumer goods company with strong portfolio of brands',
  'ITC': 'Diversified conglomerate with interests in FMCG, hotels, and paperboards',
  'TATAMOTORS': 'Automotive manufacturer with global presence',
  'BHARTIARTL': 'India\'s largest telecom operator',
  'SUNPHARMA': 'India\'s largest pharmaceutical company',
  'DRREDDY': 'Global pharmaceutical company with focus on generics',
  'ONGC': 'India\'s largest oil and gas exploration company',
  'TATASTEEL': 'One of India\'s largest steel manufacturers',
  'WIPRO': 'Global IT services company with focus on digital transformation',
  'AXISBANK': 'Private sector bank with strong retail and corporate banking',
  'KOTAKBANK': 'Private sector bank with focus on retail and corporate banking',
  'BRITANNIA': 'Leading food company with strong biscuit portfolio',
  'DABUR': 'Consumer goods company with focus on Ayurvedic products',
  'MARICO': 'Consumer goods company with focus on personal care products'
};

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const normalizedTicker = ticker.trim().toUpperCase()
    if (ticker.trim() === '') return
    
    // Check if the input is a direct ticker symbol
    const directTicker = Object.values(stockMapping).find(
      symbol => symbol.toLowerCase() === ticker.toLowerCase()
    )
    
    if (directTicker) {
      onSubmit(directTicker)
      setTicker('')
      return
    }
    
    // Check if the input matches a stock name
    const matchingStock = Object.keys(stockMapping).find(
      stock => stock.toLowerCase() === ticker.toLowerCase()
    )
    
    if (matchingStock) {
      onSubmit(stockMapping[matchingStock])
      setTicker('')
      return
    }
    
    // If no exact match, check for partial matches
    const partialMatches = Object.keys(stockMapping).filter(
      stock => stock.toLowerCase().includes(ticker.toLowerCase())
    )
    
    if (partialMatches.length > 0) {
      // Use the first match
      onSubmit(stockMapping[partialMatches[0]])
      setTicker('')
    }
    onSubmit(normalizedTicker)
    setTicker('')
  }

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
        setSuggestions(filteredSuggestions.slice(0, 8))
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

  // Get category for a stock
  const getStockCategory = (stockName: string) => {
    const ticker = stockMapping[stockName];
    for (const [category, stocks] of Object.entries(stockCategories)) {
      if (stocks.includes(ticker)) {
        return category;
      }
    }
    return 'Other';
  };

  // Get description for a stock
  const getStockDescription = (stockName: string) => {
    const ticker = stockMapping[stockName];
    return stockDescriptions[ticker] || 'Leading company in its sector';
  };

  // Get popular stocks by category
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getPopularStocksByCategory = (category: string) => {
    return stockCategories[category]?.slice(0, 5) || [];
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div 
          className={`absolute -inset-0.5 bg-gradient-to-r from-cyan-500/50 via-indigo-500/50 to-purple-500/50 rounded-xl blur-sm transition-all duration-300 ${
            isFocused || isHovered ? 'opacity-100 scale-[1.02]' : 'opacity-0 scale-100'
          }`} 
        />
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
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
                setSuggestions(filteredSuggestions.slice(0, 8))
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
            className={`w-full px-6 py-5 bg-[#0A0F1C]/90 border rounded-xl text-white/95 placeholder-gray-400 focus:outline-none focus:ring-1 transition-all duration-300 ${
              isFocused || isHovered 
                ? 'border-indigo-500/30 focus:ring-indigo-500/30 shadow-lg shadow-indigo-500/10' 
                : 'border-white/10 focus:ring-indigo-500/20 focus:border-indigo-500/20'
            }`}
          />
          <button 
            type="submit"
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 transition-all duration-300 ${
              isFocused || isHovered 
                ? 'text-indigo-300 scale-110' 
                : 'text-indigo-400'
            }`}
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </form>

      <AnimatePresence>
        {isFocused && (suggestions.length > 0 || noMatches) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute w-full mt-2 bg-[#0A0F1C]/95 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg shadow-indigo-500/5 overflow-hidden z-50"
          >
            {suggestions.map((suggestion, index) => {
              const category = getStockCategory(suggestion);
              const description = getStockDescription(suggestion);
              const tickerSymbol = stockMapping[suggestion];
              
              return (
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
                  className="group"
                >
                  <div className="px-6 py-4 hover:bg-white/10 cursor-pointer transition-all duration-200 border-b border-white/5 last:border-b-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <span className="text-white/90 font-medium text-lg group-hover:text-white transition-colors">
                          {suggestion}
                        </span>
                        <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-indigo-500/20 text-indigo-300 group-hover:bg-indigo-500/30 transition-colors">
                          {tickerSymbol}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 bg-white/5 px-2 py-0.5 rounded group-hover:bg-white/10 transition-colors">
                        {category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors line-clamp-2">
                      {description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
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
        className="mt-8"
      >
        
        
        
        
        
        
        <div className="text-center">
          <p className="text-sm text-gray-400 font-medium mb-3">
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
                className="px-4 py-2 rounded-lg bg-[#0A0F1C]/90 border border-white/10 text-white/80 text-sm transition-all duration-200 hover:bg-white/10 hover:shadow-md hover:shadow-white/5 hover:scale-105"
              >
                <span>{stock}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}


