'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale
} from 'chart.js'
import 'chartjs-adapter-date-fns'
import { TrendingUp, TrendingDown, XCircle, Loader2, BarChart2, Gauge, Percent } from 'lucide-react'
import { stockMapping } from './StockInput'
import type { ChartOptions } from 'chart.js'

const registerChartJS = () => {
  if (typeof window !== 'undefined') {
    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend,
      Filler,
      TimeScale
    )
  }
}

interface Prediction {
  nextDayPrice: number;
  actualPrices: number[];
  predictedPrices: number[];
  futurePredictions: number[];
  mse: number;
  r2: number;
  technicalIndicators: {
    sma: number[];
    ema: number[];
    rsi: number[];
    obv: number[];
    bollingerBands: {
      upper: number[];
      middle: number[];
      lower: number[];
    };
  };
  marketData?: {
    volume: number[];
    volatility: number;
    sentiment: 'Bullish' | 'Bearish' | 'Neutral';
    riskScore: number;
  };
}

interface PredictionData {
  prediction: Prediction;
}

type TimePeriod = '1D' | '1W' | '1M';

export default function StockPrediction({ ticker }: { ticker: string }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<PredictionData | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('1M')
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    setIsClient(true)
    registerChartJS()
  }, [])

  useEffect(() => {
    // Reset state when ticker changes
    setLoading(true)
    setError(null)
    setData(null)

    // Cancel any ongoing fetch request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController()

    const fetchData = async () => {
      try {
        const host = process.env.NEXT_PUBLIC_HOST || 'http://127.0.0.1:8000'
        const tick = ticker
        const apiUrl = `${host}/api/predict/`
        
        console.log(`Fetching data for ticker: ${tick} from ${apiUrl}?ticker=${tick}`)
        
        const response = await fetch(`${apiUrl}?ticker=${tick}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          mode: 'cors',
          credentials: 'omit',
          signal: abortControllerRef.current?.signal
        })

        if (!response.ok) {
          const errorText = await response.text().catch(() => 'Unknown error')
          throw new Error(`API request failed with status ${response.status}: ${errorText}`)
        }

        const jsonData = await response.json()
        
        if (!jsonData.prediction || !jsonData.prediction.nextDayPrice) {
          throw new Error('Invalid response format from API')
        }
        
        // Only set data if the component is still mounted and this is still the current request
        setData(jsonData)
      } catch (error) {
        // Only set error if the request wasn't aborted
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error fetching prediction data:', error)
          
          if (error instanceof Error && 
              (error.message.includes('Failed to fetch') || 
               error.message.includes('NetworkError') || 
               error.message.includes('CORS'))) {
            setError('Could not connect to the prediction API. Please make sure the backend server is running at http://127.0.0.1:8000')
          } else {
            setError(error instanceof Error ? error.message : 'Failed to fetch prediction data')
          }
        }
      } finally {
        // Only update loading state if the request wasn't aborted
        if (abortControllerRef.current?.signal.aborted === false) {
          setLoading(false)
        }
      }
    }

    fetchData()

    // Cleanup function to abort any ongoing requests when component unmounts or ticker changes
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [ticker]) // Make sure ticker is in dependency array

  if (!isClient || loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-8 bg-red-900/10 border border-red-500/30 rounded-xl"
      >
        <div className="inline-block p-3 rounded-full bg-red-500/20 text-red-400 mb-4">
          <XCircle className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Error Loading Data</h3>
        <p className="text-red-300/80 mb-4">{error}</p>
        
        {error.includes('Could not connect to the prediction API') && (
          <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10 text-left">
            <h4 className="text-white/90 font-medium mb-2">Troubleshooting Steps:</h4>
            <ol className="list-decimal list-inside text-gray-300/80 space-y-1 text-sm">
              <li>Make sure the backend server is running at http://127.0.0.1:8000</li>
              <li>Check if there are any CORS issues in the browser console</li>
              <li>Try restarting the backend server</li>
              <li>If the issue persists, contact the development team</li>
            </ol>
          </div>
        )}
      </motion.div>
    )
  }

  if (!data) return null

  // Get the latest indicator values safely
  const getLatestIndicatorValue = (array: number[] | undefined) => {
    if (!array || array.length === 0) return 0;
    return array[array.length - 1];
  };

  const getFilteredData = (period: TimePeriod) => {
    if (!data) return { actualPrices: [], predictedPrices: [], dates: [] };
    
    const now = new Date();
    let daysToShow = 30; // Default to 1M
    
    switch (period) {
      case '1D':
        daysToShow = 1;
        break;
      case '1W':
        daysToShow = 7;
        break;
      case '1M':
        daysToShow = 30;
        break;
    }

    const filteredActualPrices = data.prediction.actualPrices.slice(-daysToShow);
    const filteredPredictedPrices = data.prediction.predictedPrices.slice(-daysToShow);
    const filteredDates = Array.from({ length: daysToShow }, (_, i) => {
      const date = new Date(now);
      date.setDate(date.getDate() - (daysToShow - 1 - i));
      return date;
    });

    return {
      actualPrices: filteredActualPrices,
      predictedPrices: filteredPredictedPrices,
      dates: filteredDates
    };
  };

  // Get the latest indicator values
  const latestSMA = getLatestIndicatorValue(data.prediction.technicalIndicators.sma);
  const latestEMA = getLatestIndicatorValue(data.prediction.technicalIndicators.ema);
  const latestRSI = getLatestIndicatorValue(data.prediction.technicalIndicators.rsi);
  const latestOBV = getLatestIndicatorValue(data.prediction.technicalIndicators.obv);
  const latestVolume = getLatestIndicatorValue(data.prediction.marketData?.volume);
  const volatility = data.prediction.marketData?.volatility || 0;
  const sentiment = data.prediction.marketData?.sentiment || 'Neutral';
  const riskScore = data.prediction.marketData?.riskScore || 0;

  const { actualPrices, predictedPrices, dates } = getFilteredData(selectedPeriod);

  const historicalData = {
    labels: dates,
    datasets: [
      {
        label: 'Actual Price',
        data: actualPrices,
        borderColor: 'rgb(6, 182, 212)',
        pointBackgroundColor: 'rgb(6, 182, 212)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 3,
        tension: 0.25,
        fill: false
      },
      {
        label: 'Predicted Price',
        data: predictedPrices,
        borderColor: 'rgb(168, 85, 247)',
        pointBackgroundColor: 'rgb(168, 85, 247)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 3,
        tension: 0.25,
        fill: false
      }
    ]
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        align: 'center',
        labels: {
          color: 'rgb(209, 213, 219)',
          font: {
            size: 12,
            weight: 500
          },
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 8,
          boxHeight: 8,
          padding: 20
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(10, 15, 28, 0.9)',
        titleColor: 'rgb(209, 213, 219)',
        titleFont: {
          size: 12,
          weight: 500
        },
        bodyColor: 'rgb(209, 213, 219)',
        bodyFont: {
          size: 12
        },
        padding: 12,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        displayColors: true,
        callbacks: {
          label: (context) => {
            const value = context.parsed.y as number
            return `${context.dataset.label}: ${new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR'
            }).format(value)}`
          }
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'MMM d'
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.05)'
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
          font: {
            size: 11
          },
          maxRotation: 0
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)'
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
          font: {
            size: 11
          },
          callback: (value) => {
            return new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR',
              maximumFractionDigits: 0
            }).format(value as number)
          }
        }
      }
    },
    hover: {
      mode: 'nearest',
      intersect: false
    }
  }

  const nextDayPrice = data.prediction.nextDayPrice
  const lastActualPrice = actualPrices[actualPrices.length - 1] ?? 0
  const priceChange = nextDayPrice - lastActualPrice
  const priceChangePercent = lastActualPrice ? (priceChange / lastActualPrice) * 100 : 0
  const isPositiveChange = priceChange >= 0

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Stock Title with Market Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <h2 className="text-3xl font-bold text-white">
            {Object.entries(stockMapping).reduce((name, [stockName, code]) => 
              code === ticker ? stockName : name, ticker)}
          </h2>
          <span className="px-3 py-1 text-sm font-medium rounded-full bg-white/5 text-gray-300">
            {ticker}
          </span>
        </div>
        <div className="flex items-center justify-center gap-4 text-sm">
          <span className="text-gray-400">Last Updated: {new Date().toLocaleDateString()}</span>
          <span className="text-gray-400">•</span>
          <span className="text-emerald-400">Market Open</span>
        </div>
      </motion.div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="p-4 rounded-xl bg-[#0A0F1C]/80 border border-white/10"
        >
          <div className="flex items-center gap-2 mb-2">
            <BarChart2 className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-400">Current Price</span>
          </div>
          <p className="text-xl font-semibold text-white">
            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(lastActualPrice)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="p-4 rounded-xl bg-[#0A0F1C]/80 border border-white/10"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-gray-400">Predicted Price</span>
          </div>
          <p className="text-xl font-semibold text-white">
            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(nextDayPrice)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="p-4 rounded-xl bg-[#0A0F1C]/80 border border-white/10"
        >
          <div className="flex items-center gap-2 mb-2">
            <Gauge className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-400">RSI</span>
          </div>
          <p className="text-xl font-semibold text-white">
            {latestRSI.toFixed(2)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="p-4 rounded-xl bg-[#0A0F1C]/80 border border-white/10"
        >
          <div className="flex items-center gap-2 mb-2">
            <Percent className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-400">Model Accuracy</span>
          </div>
          <p className="text-xl font-semibold text-white">
            {(data.prediction.r2 * 100).toFixed(1)}%
          </p>
        </motion.div>
      </div>

      {/* Main Chart Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="p-6 rounded-xl bg-[#0A0F1C]/80 border border-white/10"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white/95">Price Analysis</h3>
            <p className="text-sm text-gray-400">Historical prices and predictions</p>
          </div>
          <div className="flex items-center gap-2">
            {(['1D', '1W', '1M'] as TimePeriod[]).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  selectedPeriod === period
                    ? 'bg-white/10 text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        <div className="h-80 md:h-96">
          <Line data={historicalData} options={chartOptions} />
        </div>
      </motion.div>

      {/* Future Predictions Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="p-6 rounded-xl bg-[#0A0F1C]/80 border border-white/10"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white/95">10-Day Price Forecast</h3>
            <p className="text-sm text-gray-400">Predicted price movements</p>
          </div>
        </div>
        <div className="h-80 md:h-96">
          <Line data={{
            labels: Array.from({ length: data.prediction.futurePredictions.length }, (_, i) => {
              const date = new Date()
              date.setDate(date.getDate() + i)
              return date
            }),
            datasets: [
              {
                label: 'Future Predictions',
                data: data.prediction.futurePredictions,
                borderColor: 'rgb(168, 85, 247)',
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: 'rgb(168, 85, 247)',
                pointBorderColor: 'white',
                pointHoverRadius: 6,
                pointHoverBackgroundColor: 'rgb(168, 85, 247)',
                pointHoverBorderColor: 'white',
                tension: 0.4
              }
            ]
          }} options={{
            ...chartOptions,
            plugins: {
              ...chartOptions.plugins,
              title: {
                display: true,
                text: 'Predicted prices for the next 10 days',
                color: 'rgb(209, 213, 219)',
                font: {
                  size: 14,
                  weight: 500
                },
                padding: {
                  bottom: 16
                }
              }
            }
          }} />
        </div>
      </motion.div>

      {/* Technical Analysis Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.7 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="p-6 rounded-xl bg-[#0A0F1C]/80 border border-white/10">
          <h3 className="text-lg font-semibold mb-4 text-white/95">Technical Indicators</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-cyan-400" />
                <span className="text-gray-300">SMA (20)</span>
              </div>
              <span className="text-white font-medium">
                {latestSMA.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-purple-400" />
                <span className="text-gray-300">EMA (20)</span>
              </div>
              <span className="text-white font-medium">
                {latestEMA.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-emerald-400" />
                <span className="text-gray-300">RSI (14)</span>
              </div>
              <span className="text-white font-medium">
                {latestRSI.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-[#0A0F1C]/80 border border-white/10">
          <h3 className="text-lg font-semibold mb-4 text-white/95">Market Insights</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${isPositiveChange ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                {isPositiveChange ? <TrendingUp className="w-4 h-4 text-emerald-400" /> : <TrendingDown className="w-4 h-4 text-red-400" />}
              </div>
              <div>
                <p className="text-white font-medium">Price Movement</p>
                <p className="text-sm text-gray-400">
                  {isPositiveChange ? 'Bullish' : 'Bearish'} trend with {Math.abs(priceChangePercent).toFixed(2)}% change
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Gauge className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <p className="text-white font-medium">Model Performance</p>
                <p className="text-sm text-gray-400">
                  High accuracy with R² score of {data.prediction.r2.toFixed(4)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Additional Analysis Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Trading Signals */}
        <div className="p-6 rounded-xl bg-[#0A0F1C]/80 border border-white/10">
          <h3 className="text-lg font-semibold mb-4 text-white/95">Trading Signals</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${sentiment === 'Bullish' ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                  <TrendingUp className={`w-4 h-4 ${
                    sentiment === 'Bullish' ? 'text-emerald-400' :
                    'text-red-400'
                  }`} />
                </div>
                <span className="text-gray-300">Overall Sentiment</span>
              </div>
              <span className={`font-medium ${
                sentiment === 'Bullish' ? 'text-emerald-400' :
                'text-red-400'
              }`}>
                {sentiment}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Gauge className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-gray-300">RSI Signal</span>
              </div>
              <span className="font-medium text-white">
                {latestRSI > 70 ? 'Overbought' : latestRSI < 30 ? 'Oversold' : 'Neutral'}
              </span>
            </div>
          </div>
        </div>

        {/* Risk Analysis */}
        <div className="p-6 rounded-xl bg-[#0A0F1C]/80 border border-white/10">
          <h3 className="text-lg font-semibold mb-4 text-white/95">Risk Analysis</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-yellow-500/10">
                  <BarChart2 className="w-4 h-4 text-yellow-400" />
                </div>
                <span className="text-gray-300">Volatility</span>
              </div>
              <span className="text-white font-medium">{volatility.toFixed(2)}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Percent className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-gray-300">Risk Score</span>
              </div>
              <span className="text-white font-medium">
                {(riskScore / 10).toFixed(1)}/10
              </span>
            </div>
          </div>
        </div>

        {/* Market Sentiment */}
        <div className="p-6 rounded-xl bg-[#0A0F1C]/80 border border-white/10">
          <h3 className="text-lg font-semibold mb-4 text-white/95">Market Sentiment</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${
                  sentiment === 'Bullish' ? 'bg-emerald-500/10' :
                  sentiment === 'Bearish' ? 'bg-red-500/10' :
                  'bg-blue-500/10'
                }`}>
                  <TrendingUp className={`w-4 h-4 ${
                    sentiment === 'Bullish' ? 'text-emerald-400' :
                    sentiment === 'Bearish' ? 'text-red-400' :
                    'text-blue-400'
                  }`} />
                </div>
                <span className="text-gray-300">Overall Sentiment</span>
              </div>
              <span className={`font-medium ${
                sentiment === 'Bullish' ? 'text-emerald-400' :
                sentiment === 'Bearish' ? 'text-red-400' :
                'text-blue-400'
              }`}>
                {sentiment}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-pink-500/10">
                  <BarChart2 className="w-4 h-4 text-pink-400" />
                </div>
                <span className="text-gray-300">Volume Trend</span>
              </div>
              <span className={`font-medium ${
                latestVolume > 0 ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {latestVolume > 0 ? 'Increasing' : 'Decreasing'}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

