# 🧠 StockSage AI

<div align="center">
  <h3>Intelligent Stock Market Analysis & Prediction Platform</h3>
  
  <p>
    <a href="#overview">Overview</a> •
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#usage">Usage</a> •
    <a href="#future">Future Roadmap</a>
  </p>
  
  <p>
    <img src="https://img.shields.io/badge/Next.js-15.1.4-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/Django-5.1.4-green?style=for-the-badge&logo=django&logoColor=white" alt="Django" />
    <img src="https://img.shields.io/badge/Python-3.9-blue?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
    <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License" />
  </p>
  
  <p>
    <a href="#getting-started"><img src="https://img.shields.io/badge/Getting%20Started-1.0.0-blue?style=for-the-badge" alt="Getting Started" /></a>
    <a href="#features"><img src="https://img.shields.io/badge/Features-10+-green?style=for-the-badge" alt="Features" /></a>
    <a href="#future"><img src="https://img.shields.io/badge/Roadmap-Active-orange?style=for-the-badge" alt="Roadmap" /></a>
  </p>
</div>

---

## 📊 Overview

StockSage AI is a sophisticated stock market analysis and prediction platform that leverages machine learning and technical analysis to provide actionable investment insights. The application combines a modern, responsive frontend built with Next.js and a powerful backend powered by Django to deliver comprehensive stock analysis tools.

## ✨ Features

<div align="center">
  <table>
    <tr>
      <td width="33%" style="background-color: #1a1a1a; border-radius: 10px; padding: 15px;">
        <h3>📈 Stock Analysis</h3>
        <ul>
          <li>Real-time stock data</li>
          <li>Technical indicators (SMA, EMA, RSI)</li>
          <li>Bollinger Bands visualization</li>
          <li>Volume analysis</li>
        </ul>
      </td>
      <td width="33%" style="background-color: #1a1a1a; border-radius: 10px; padding: 15px;">
        <h3>🔮 Predictions</h3>
        <ul>
          <li>ML-based price forecasting</li>
          <li>Future price projections</li>
          <li>Historical vs. predicted analysis</li>
          <li>Accuracy metrics</li>
        </ul>
      </td>
      <td width="33%" style="background-color: #1a1a1a; border-radius: 10px; padding: 15px;">
        <h3>📊 Market Insights</h3>
        <ul>
          <li>Volatility analysis</li>
          <li>Risk assessment</li>
          <li>Market sentiment</li>
          <li>Trading signals</li>
        </ul>
      </td>
    </tr>
  </table>
</div>

## 🛠️ Tech Stack

<div align="center">
  <table>
    <tr>
      <td align="center" width="50%" style="background-color: #1a1a1a; border-radius: 10px; padding: 15px;">
        <h3>Frontend</h3>
        <img src="https://img.shields.io/badge/Next.js-15.1.4-black?style=flat-square&logo=next.js&logoColor=white" alt="Next.js" />
        <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
        <img src="https://img.shields.io/badge/Chart.js-4.4.7-blue?style=flat-square&logo=chart.js&logoColor=white" alt="Chart.js" />
        <img src="https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
        <img src="https://img.shields.io/badge/Framer_Motion-11.17.0-0055FF?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion" />
        <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React" />
      </td>
      <td align="center" width="50%" style="background-color: #1a1a1a; border-radius: 10px; padding: 15px;">
        <h3>Backend</h3>
        <img src="https://img.shields.io/badge/Django-5.1.4-green?style=flat-square&logo=django&logoColor=white" alt="Django" />
        <img src="https://img.shields.io/badge/Pandas-2.2.3-150458?style=flat-square&logo=pandas&logoColor=white" alt="Pandas" />
        <img src="https://img.shields.io/badge/YFinance-0.2.51-2496ED?style=flat-square&logo=yahoo&logoColor=white" alt="YFinance" />
        <img src="https://img.shields.io/badge/XGBoost-2.1.3-0176FE?style=flat-square&logo=xgboost&logoColor=white" alt="XGBoost" />
        <img src="https://img.shields.io/badge/Pandas_TA-0.3.14b0-2496ED?style=flat-square&logo=pandas&logoColor=white" alt="Pandas-TA" />
        <img src="https://img.shields.io/badge/Scikit_Learn-1.6.1-F7931E?style=flat-square&logo=scikit-learn&logoColor=white" alt="Scikit-Learn" />
      </td>
    </tr>
  </table>
</div>

## 🚀 Getting Started

### **Prerequisites**
  - Node.js (v14 or higher)
  - Python (v3.9 or higher)
  - npm or yarn

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/Yashparmar1125/StockSage-AI
   cd stock-sage
   ```

2. **Set up the backend**
   ```bash
   cd backend
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```

3. **Set up the frontend**
   ```bash
   cd stock-sage
   npm install
   npm run dev
   ```

4. **Access the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 Usage Guide

<div align="center">
  <table>
    <tr>
      <td width="25%" style="background-color: #1a1a1a; border-radius: 10px; padding: 15px;">
        <h3>1️⃣ Select Stock</h3>
        <p>Enter a stock ticker (e.g., TCS, RELIANCE, INFY)</p>
      </td>
      <td width="25%" style="background-color: #1a1a1a; border-radius: 10px; padding: 15px;">
        <h3>2️⃣ View Analysis</h3>
        <p>Explore technical indicators and price predictions</p>
      </td>
      <td width="25%" style="background-color: #1a1a1a; border-radius: 10px; padding: 15px;">
        <h3>3️⃣ Adjust Timeframe</h3>
        <p>Switch between 1D, 1W, and 1M views</p>
      </td>
      <td width="25%" style="background-color: #1a1a1a; border-radius: 10px; padding: 15px;">
        <h3>4️⃣ Analyze Signals</h3>
        <p>Check trading signals and market sentiment</p>
      </td>
    </tr>
  </table>
</div>

## 🔮 Future Roadmap

<div align="center">
  <table>
    <tr>
      <td width="50%" style="background-color: #1a1a1a; border-radius: 10px; padding: 15px;">
        <h3>Planned Features</h3>
        <ul>
          <li>Portfolio Management</li>
          <li>Fundamental Analysis</li>
          <li>Social Sentiment Analysis</li>
          <li>Custom Alerts</li>
        </ul>
      </td>
      <td width="50%" style="background-color: #1a1a1a; border-radius: 10px; padding: 15px;">
        <h3>Platform Expansion</h3>
        <ul>
          <li>Mobile Application</li>
          <li>API Access</li>
          <li>Premium Features</li>
          <li>Community Forums</li>
        </ul>
      </td>
    </tr>
  </table>
</div>

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributors

<div align="center">
  <table>
    <tr>
      <td align="center">
        <a href="https://github.com/Yashparmar1125">
          <b>Yash Parmar</b>
        </a>
      </td>
    </tr>
  </table>
</div>

## 🙏 Acknowledgments

<div align="center">
  <table>
    <tr>
      <td align="center" width="33%">
        <a href="https://finance.yahoo.com/">
          <b>Yahoo Finance</b>
        </a>
      </td>
      <td align="center" width="33%">
        <a href="https://www.chartjs.org/">
          <b>Chart.js</b>
        </a>
      </td>
      <td align="center" width="33%">
        <a href="https://github.com/twopirllc/pandas-ta">
          <b>Pandas-TA</b>
        </a>
      </td>
    </tr>
  </table>
</div>

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/Yashparmar1125">Yash Parmar</a></p>
  <p>
    <a href="https://github.com/Yashparmar1125/StockSage-AI">
      <img src="https://img.shields.io/github/stars/Yashparmar1125/stock-sage?style=social" alt="GitHub Stars" />
    </a>
    <a href="https://github.com/Yashparmar1125/stock-sage/fork">
      <img src="https://img.shields.io/github/forks/Yashparmar1125/stock-sage?style=social" alt="GitHub Forks" />
    </a>
    <a href="https://github.com/Yashparmar1125/stock-sage/issues">
      <img src="https://img.shields.io/github/issues/Yashparmar1125/stock-sage?style=social" alt="GitHub Issues" />
    </a>
  </p>
</div>
