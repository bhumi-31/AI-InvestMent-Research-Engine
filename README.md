# AI Investment Research Engine

## Overview

AI Investment Research Engine is a multi-agent AI application that helps users evaluate whether a company is a good investment opportunity. The application researches a company, analyzes its financial performance, studies the latest news, evaluates market sentiment, and finally provides an AI-generated investment recommendation.

Instead of relying on a single LLM prompt, the system is built using **LangGraph**, where multiple specialized AI agents collaborate to produce a final recommendation. The results are displayed through a clean and beginner-friendly dashboard so that even users with limited financial knowledge can understand the analysis.

---

# Features

- Multi-agent architecture using LangGraph
- Company profile generation
- Live financial data analysis
- Latest company news collection
- AI-powered news sentiment analysis
- Final investment recommendation (INVEST / PASS)
- Confidence score
- Financial health indicators
- Risk analysis
- Growth opportunities
- Modern React dashboard

---

# Tech Stack

## Frontend

- React.js
- CSS
- Material UI

## Backend

- Node.js
- Express.js

## AI & Frameworks

- OpenAI GPT
- LangChain
- LangGraph

## External APIs

- Yahoo Finance API
- NewsAPI

---

# Folder Structure

```
AI_INVESTMENT_RESEARCH_ENGINE

├── client
│   ├── src
│   │   ├── components
│   │   ├── services
│   │   ├── assets
│   │   └── App.jsx
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

## 1. Clone the Repository

```bash
git clone <repository-url>

cd AI_INVESTMENT_RESEARCH_ENGINE
```

---

## 2. Install Dependencies

### Backend

```bash
cd server
npm install
```

### Frontend

```bash
cd client
npm install
```

---

## 3. Create Environment Variables

Inside the **server** folder create a `.env` file.

```env
OPENAI_API_KEY=your_openai_api_key

NEWS_API_KEY=your_newsapi_key
```

---

## 4. Start Backend

```bash
cd server

npm run dev
```

Backend runs on

```
http://localhost:8000
```

---

## 5. Start Frontend

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

The application follows a multi-agent workflow.

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

Recommendation Dashboard
```

---

## Agent Responsibilities

### 1. Company Research Agent

Collects company information including:

- Company overview
- Industry
- CEO
- Headquarters
- Founding year
- Products and services

---

### 2. Financial Analysis Agent

Retrieves live financial data from Yahoo Finance and evaluates metrics such as:

- Revenue
- Net Income
- Market Capitalization
- P/E Ratio
- P/B Ratio
- ROE
- ROA
- Debt to Equity
- Current Ratio

The AI then converts these metrics into beginner-friendly financial insights.

---

### 3. News Collection Agent

Fetches the latest company-related news articles using NewsAPI.

---

### 4. Sentiment Analysis Agent

Analyzes each news article and determines:

- Positive
- Neutral
- Negative
- Mixed

It also generates an overall market sentiment summary.

---

### 5. Decision Making Agent

Combines all previous outputs including:

- Company Profile
- Financial Analysis
- Latest News
- News Sentiment

to generate:

- INVEST / PASS recommendation
- Confidence score
- AI reasoning
- Key risks
- Growth opportunities

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
             Final Recommendation
```

---

# Key Decisions & Trade-offs

## Decision 1

Used **LangGraph** instead of a single LLM prompt.

### Why?

Breaking the workflow into specialized AI agents makes the system modular, easier to maintain, and allows each agent to focus on a specific responsibility.

---

## Decision 2

Used Yahoo Finance for financial data.

### Why?

It provides reliable and up-to-date financial information without requiring paid APIs.

---

## Decision 3

Used NewsAPI for collecting recent company news.

### Why?

Recent news plays an important role in short-term investment decisions.

---

## Decision 4

Designed a beginner-friendly dashboard.

### Why?

Many investment dashboards assume prior financial knowledge. This application explains results in simple language so that non-finance users can also understand the recommendation.

---

## Trade-offs

Due to time constraints, the following features were not implemented:

- Historical stock price charts
- Portfolio tracking
- User authentication
- Company comparison
- PDF report generation
- Real-time market streaming

---

# Example Runs

## Example 1

### Company

Apple

### Recommendation

**INVEST**

### Reason

- Strong financial performance
- Healthy profitability
- Positive market sentiment
- Stable long-term outlook

---

## Example 2

### Company

Intel

### Recommendation

**PASS**

### Reason

- Higher investment risk
- Weak recent financial indicators
- Current valuation not attractive

---

## Example 3

### Company

Tata Motors

### Recommendation

**PASS**

### Reason

- Mixed financial performance
- High debt levels
- Positive news but higher investment risk

---

# Future Improvements

If given additional development time, I would like to add:

- Portfolio management
- Historical stock charts
- Company comparison dashboard
- Better explainable AI
- Indian stock exchange support
- User accounts and saved reports
- AI-generated PDF investment reports
- More advanced financial metrics

---

# LLM Usage

This project was developed with the assistance of ChatGPT throughout the entire development process.

The LLM was used for:

- Designing the LangGraph workflow
- Prompt engineering
- Backend architecture
- Debugging
- UI improvements
- Financial explanation refinement
- Documentation

The complete development chat transcripts have been included separately as bonus material.

---

# Author

**Bhumika Narula**

B.Tech Computer Science Engineering

Lovely Professional University
