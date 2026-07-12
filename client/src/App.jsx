import { useState } from 'react';
import './App.css';
import { researchCompany } from './services/api';

import SearchBar from './components/SearchBar';
import RecommendationCard from './components/RecommendationCard';
import FinancialSnapshot from './components/FinancialSnapshot';
import ReasoningCard from './components/ReasoningCard';
import RisksCatalysts from './components/RisksCatalysts';
import NewsFeed from './components/NewsFeed';
import SentimentAnalysis from './components/SentimentAnalysis';
import CompanyProfile from './components/CompanyProfile';
import DetailedFinancials from './components/DetailedFinancials';
import Footer from './components/Footer';

const loadingSteps = [
   "Identifying company and validating ticker...",
  "Collecting financial statements...",
  "Scanning latest market news...",
  "Evaluating market sentiment with AI...",
  "Generating investment recommendation..."
];

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const handleSearch = async (companyName) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setActiveStep(0);

    const stepInterval = setInterval(() => {
      setActiveStep((prev) =>
        prev < loadingSteps.length - 1 ? prev + 1 : prev
      );
    }, 4000);

    try {
      const response = await researchCompany(companyName);

      clearInterval(stepInterval);

      if (response?.success && response.data) {
        setResult(response.data);
      } else {
        setError('No data returned.');
      }
    } catch (err) {
      clearInterval(stepInterval);

      setError(
        err?.response?.data?.message ||
        err.message ||
        'Something went wrong.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="header__title">
          AI Investment Research Engine
        </h1>

        <p className="header__subtitle">
          Intelligent analysis powered by AI agents
        </p>
      </header>

      <SearchBar
        onSearch={handleSearch}
        loading={loading}
      />

      <main className="main-content">

        {loading && (
          <div className="loading-container">

            <div className="spinner" />

            <p className="loading-text">
              Analyzing company...
            </p>

            <div className="loading-steps">

              {loadingSteps.map((step, i) => (

                <div
                  key={i}
                  className={`loading-step ${i <= activeStep
                      ? 'loading-step--active'
                      : ''
                    }`}
                >

                  <span className="loading-step__dot" />

                  {step}

                </div>

              ))}

            </div>

          </div>
        )}

        {error && !loading && (
          <div className="error-container">
            <p className="error-message">
              {error}
            </p>
          </div>
        )}

        {result && !loading && (

          <div className="results-section">

            <RecommendationCard
              verdict={result.verdict}
              rawFinancials={result.rawFinancials}
              sentimentData={result.sentimentData}
            />

            <FinancialSnapshot
              data={result.rawFinancials}
            />

            <ReasoningCard
              reasoning={result.verdict?.reasoning}
            />

            <RisksCatalysts
              risks={result.verdict?.risks}
              catalysts={result.verdict?.catalysts}
            />

            <NewsFeed
              articles={result.newsArticles}
            />

            <SentimentAnalysis
              data={result.sentimentData}
            />

            <CompanyProfile
              data={result.companyProfile}
            />

            <DetailedFinancials
              data={result.financialData}
            />

            <Footer />

          </div>

        )}
      </main>
    </div>
  );
}

export default App;