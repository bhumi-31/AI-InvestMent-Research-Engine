# AI Investment Research Engine

An AI-powered investment research platform that analyzes publicly traded companies using a multi-agent workflow built with **LangGraph**. The application researches a company, evaluates its financial performance, analyzes recent news, determines market sentiment, and generates an AI-based investment recommendation in a beginner-friendly dashboard.

---

# Live Demo

### Frontend (Vercel)

https://ai-invest-ment-research-engine.vercel.app/

### Backend (Render)

https://ai-investment-research-engine.onrender.com/

---

# Overview

The AI Investment Research Engine helps users make informed investment decisions by combining financial analysis, company research, and news sentiment into a single recommendation.

Instead of relying on one large prompt, the application follows a **multi-agent architecture**, where each AI agent is responsible for a single task. This approach makes the system modular, maintainable, and produces more structured results.

The final recommendation is presented in a clean dashboard designed for both finance and non-finance users.

---

# Features

- Multi-agent workflow using LangGraph
- Company profile generation
- Live financial data analysis
- Latest company news
- AI-powered sentiment analysis
- Final investment recommendation (INVEST / PASS)
- AI confidence score
- Financial health indicators
- Risk analysis
- Growth opportunities
- Beginner-friendly explanations
- Modern responsive React dashboard
- Deployed on Vercel and Render

---

# Tech Stack

## Frontend

- React.js
- CSS3
- Material UI
- Axios

## Backend

- Node.js
- Express.js

## AI

- OpenAI GPT
- LangChain
- LangGraph

## APIs

- Yahoo Finance
- NewsAPI
- Tavily Search

---

# Project Structure

```
AI_INVESTMENT_RESEARCH_ENGINE

│
├── client
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── services
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server
│   ├── config
│   ├── graph
│   ├── nodes
│   ├── routes
│   ├── tools
│   ├── index.js
│   └── package.json
│
└── README.md
```

---

# How to Run

## Option 1 — Use the Deployed Version

Frontend

https://ai-invest-ment-research-engine.vercel.app/

Backend

https://ai-investment-research-engine.onrender.com/

No setup required.

---

## Option 2 — Run Locally

### Clone Repository

```bash
git clone <repository-url>

cd AI_INVESTMENT_RESEARCH_ENGINE
```

---

### Install Backend

```bash
cd server

npm install
```

---

### Install Frontend

```bash
cd client

npm install
```

---

# Environment Variables

Create a `.env` file inside the **server** folder.

```env
OPENAI_API_KEY=your_openai_api_key

NEWS_API_KEY=your_newsapi_key

TAVILY_API_KEY=your_tavily_api_key
```

---

# Start Backend

```bash
cd server

npm run dev
```

Backend runs on

```
http://localhost:8000
```

---

# Start Frontend

```bash
cd client

npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# How It Works

The application follows a multi-agent workflow built using LangGraph.

```
User

↓

Company Research Agent

↓

Financial Analysis Agent

↓

News Collection Agent

↓

Sentiment Analysis Agent

↓

Decision Making Agent

↓

Investment Recommendation Dashboard
```

---

# Agent Responsibilities

## Company Research Agent

Researches the company and generates:

- Company overview
- Industry
- CEO
- Headquarters
- Products and services
- Market position

---

## Financial Analysis Agent

Fetches live financial data from Yahoo Finance and evaluates metrics including:

- Market Capitalization
- Revenue
- Net Income
- P/E Ratio
- P/B Ratio
- EPS
- ROE
- ROA
- Debt-to-Equity
- Current Ratio

The AI converts these metrics into easy-to-understand financial insights.

---

## News Collection Agent

Collects recent company-related news using NewsAPI and Tavily Search.

---

## Sentiment Analysis Agent

Analyzes each news article and determines:

- Positive
- Neutral
- Negative
- Mixed

It also generates an overall market sentiment summary.

---

## Decision Making Agent

Combines:

- Company Profile
- Financial Analysis
- News
- Sentiment Analysis

to generate:

- Final Recommendation (INVEST / PASS)
- Confidence Score
- AI Reasoning
- Key Risks
- Growth Opportunities

---

# Architecture

```
                    React Frontend
                           │
                           ▼
                    Express Backend
                           │
                           ▼
                   LangGraph Workflow
                           │
        ┌────────────────────────────────┐
        │ Company Research Agent         │
        │ Financial Analysis Agent       │
        │ News Collection Agent          │
        │ Sentiment Analysis Agent       │
        │ Decision Making Agent          │
        └────────────────────────────────┘
                           │
                           ▼
               Final Investment Recommendation
```

---

# Key Decisions & Trade-offs

## Why LangGraph?

Instead of asking one LLM prompt to perform every task, the application divides the workflow into multiple AI agents. This makes the system easier to maintain, debug, and extend.

---

## Why Yahoo Finance?

Yahoo Finance provides reliable financial metrics that can be used to generate data-driven investment recommendations.

---

## Why NewsAPI + Tavily?

Financial decisions are influenced by recent events. NewsAPI provides current company news while Tavily improves search-based company research.

---

## Why a Beginner-Friendly UI?

Many investment tools assume financial knowledge. This application simplifies financial concepts using AI explanations and intuitive visualizations so that beginners can also understand the recommendations.

---

# Trade-offs

Due to limited development time, the following features were left for future work:

- Historical stock price charts
- Portfolio tracking
- Company comparison
- User authentication
- AI-generated PDF reports
- Watchlist functionality
- Real-time stock streaming

---

# Example Runs

The following screenshots demonstrate the application's output for different companies.

### Example 1

Company: Apple

Recommendation: INVEST

*(Insert Screenshot Here)*

---

### Example 2

Company: Intel

Recommendation: PASS

*(Insert Screenshot Here)*

---

### Example 3

Company: Tata Motors

Recommendation: PASS

*(Insert Screenshot Here)*

---

# Future Improvements

If additional development time were available, the following features would be added:

- Portfolio Management
- Historical Stock Charts
- Company Comparison Dashboard
- Explainable AI with source citations
- Indian Stock Exchange Support
- User Authentication
- Saved Investment Reports
- AI-generated PDF Reports
- Improved News Sentiment Calibration

---

# LLM Usage

This project was developed with the assistance of ChatGPT throughout the entire development lifecycle.

The LLM was used for:

- Designing the LangGraph workflow
- Prompt engineering
- Backend architecture
- React component development
- Debugging
- UI improvements
- Financial explanation refinement
- Documentation

The complete development conversation logs have been included separately as bonus material to demonstrate the design process and implementation decisions.

---

# Author

**Bhumika Narula**

B.Tech Computer Science Engineering

Lovely Professional University
