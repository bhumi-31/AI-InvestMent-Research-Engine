import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AssessmentIcon from '@mui/icons-material/Assessment';

function formatLargeNumber(num) {
  if (num == null || isNaN(num)) return 'N/A';
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  return `$${num.toLocaleString()}`;
}

function getDecisionClass(decision) {
  if (!decision) return '';
  const d = decision.toUpperCase();
  if (d === 'INVEST' || d === 'BUY') return 'decision-badge--invest';
  if (d === 'PASS' || d === 'SELL' || d === 'AVOID') return 'decision-badge--pass';
  return 'decision-badge--hold';
}

function getDecisionIcon(decision) {
  if (!decision) return <AssessmentIcon />;
  const d = decision.toUpperCase();
  if (d === 'INVEST' || d === 'BUY') return <TrendingUpIcon />;
  if (d === 'PASS' || d === 'SELL' || d === 'AVOID') return <TrendingDownIcon />;
  return <AssessmentIcon />;
}

function getSentimentClass(sentiment) {
  if (!sentiment) return 'sentiment-badge--neutral';
  const s = sentiment.toUpperCase();
  if (s === 'POSITIVE') return 'sentiment-badge--positive';
  if (s === 'NEGATIVE') return 'sentiment-badge--negative';
  if (s === 'MIXED') return 'sentiment-badge--mixed';
  return 'sentiment-badge--neutral';
}

function getConfidenceBarClass(confidence) {
  if (confidence >= 70) return 'confidence-bar__fill--high';
  if (confidence < 40) return 'confidence-bar__fill--low';
  return '';
}

function RecommendationCard({ verdict, rawFinancials, sentimentData }) {
  if (!verdict) return null;

  const { decision, confidence } = verdict;
  const overallSentiment = sentimentData?.overall;
  const price = rawFinancials?.price;
  const marketCap = rawFinancials?.marketCap;

  return (
    <div className="recommendation-card">
      {/* Decision + Sentiment */}
      <div className="recommendation-card__header">
        {decision && (
          <span className={`decision-badge ${getDecisionClass(decision)}`}>
            {getDecisionIcon(decision)}
            {decision}
          </span>
        )}
        {overallSentiment && (
          <span className={`sentiment-badge ${getSentimentClass(overallSentiment)}`}>
            Sentiment: {overallSentiment}
          </span>
        )}
      </div>

      {/* Confidence Bar */}
      {confidence != null && (
        <div className="confidence-section">
          <div className="confidence-label">
            <span>Confidence</span>
            <span className="confidence-label__value">{confidence}%</span>
          </div>
          <div className="confidence-bar">
            <div
              className={`confidence-bar__fill ${getConfidenceBarClass(confidence)}`}
              style={{ width: `${Math.min(Math.max(confidence, 0), 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Stock Stats */}
      {(price != null || marketCap != null) && (
        <div className="stock-stats">
          {price != null && (
            <div className="stock-stat">
              <div className="stock-stat__label">Stock Price</div>
              <div className="stock-stat__value">${price.toFixed(2)}</div>
            </div>
          )}
          {marketCap != null && (
            <div className="stock-stat">
              <div className="stock-stat__label">Market Cap</div>
              <div className="stock-stat__value">{formatLargeNumber(marketCap)}</div>
            </div>
          )}
          {rawFinancials?.sector && (
            <div className="stock-stat">
              <div className="stock-stat__label">Sector</div>
              <div className="stock-stat__value" style={{ fontSize: '0.95rem' }}>
                {rawFinancials.sector}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default RecommendationCard;
