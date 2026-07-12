


import styles from './RecommendationCard.module.css';
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import AssessmentIcon from "@mui/icons-material/Assessment";


function formatLargeNumber(num) {
  if (num == null || isNaN(num)) return "N/A";

  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;

  return `$${num.toLocaleString()}`;
}

function getDecisionClass(decision) {
  if (!decision) return "";

  const d = decision.toUpperCase();

  if (d === "INVEST" || d === "BUY")
    return "decisionBadge--invest";

  if (d === "PASS" || d === "SELL" || d === "AVOID")
    return "decisionBadge--pass";

  return "decisionBadge--hold";
}

function getDecisionIcon(decision) {
  if (!decision) return <AssessmentIcon />;

  const d = decision.toUpperCase();

  if (d === "INVEST" || d === "BUY")
    return <TrendingUpIcon />;

  if (d === "PASS" || d === "SELL" || d === "AVOID")
    return <TrendingDownIcon />;

  return <AssessmentIcon />;
}

function getSentimentClass(sentiment) {
  if (!sentiment) return "sentimentBadge--neutral";

  const s = sentiment.toUpperCase();

  if (s === "POSITIVE")
    return "sentimentBadge--positive";

  if (s === "NEGATIVE")
    return "sentimentBadge--negative";

  if (s === "MIXED")
    return "sentimentBadge--mixed";

  return "sentimentBadge--neutral";
}

function getConfidenceBarClass(confidence) {
  if (confidence >= 70) return "confidenceBarFill--high";
  if (confidence < 40) return "confidenceBarFill--low";
  return "";
}

function getRecommendationSummary(decision) {
  if (!decision) return "";

  const d = decision.toUpperCase();

  if (d === "INVEST" || d === "BUY") {
    return "AI believes this company shows strong investment potential.";
  }

  if (d === "PASS" || d === "SELL" || d === "AVOID") {
    return "AI does not currently recommend investing in this company.";
  }

  return "AI suggests waiting before making an investment decision.";
}

function getRecommendationReason(decision) {
  if (!decision) return "";

  const d = decision.toUpperCase();

  if (d === "INVEST" || d === "BUY") {
    return "Good long-term investment based on strong financial performance.";
  }

  if (d === "PASS" || d === "SELL" || d === "AVOID") {
    return "High risk compared to expected returns.";
  }

  return "Wait for stronger financial signals before investing.";
}

function RecommendationCard({
  verdict,
  rawFinancials,
  sentimentData,
}) {
  if (!verdict) return null;

  const { decision, confidence } = verdict;

  const overallSentiment = sentimentData?.overall;

  const companyName =
    rawFinancials?.companyName ||
    rawFinancials?.name ||
    rawFinancials?.shortName ||
    "Company";

  const price = rawFinancials?.price;
  const marketCap = rawFinancials?.marketCap;
  const sector = rawFinancials?.sector;

  const recommendationSummary =
    getRecommendationSummary(decision);

  const recommendationReason =
    getRecommendationReason(decision);

    return (
    <div className={styles.recommendationCard}>

      <div className={styles.recommendationTop}>

        <h2 className={styles.companyName}>
          {companyName}
        </h2>

        <div className={styles.recommendationCardHeader}>

          {decision && (
            <span
              className={`${styles.decisionBadge} ${styles[getDecisionClass(decision)]}`}
            >
              {getDecisionIcon(decision)}
              {decision}
            </span>
          )}

          {overallSentiment && (
            <span
              className={`${styles.sentimentBadge} ${styles[getSentimentClass(overallSentiment)]}`}
            >
              {overallSentiment} Sentiment
            </span>
          )}

        </div>

      </div>

      {confidence != null && (
        <div className={styles.confidenceSection}>

          <div className={styles.confidenceLabel}>

            <span>How confident is this recommendation?</span>

            <span className={styles.confidenceLabelValue}>
              {confidence}%
            </span>

          </div>

          <div className={styles.confidenceBar}>

            <div
              className={`${styles.confidenceBarFill} ${styles[getConfidenceBarClass(confidence)]}`}
              style={{
                width: `${Math.min(
                  Math.max(confidence, 0),
                  100
                )}%`,
              }}
            />

          </div>

        </div>
      )}

      <div className={styles.recommendationMessage}>

        <div className={styles.recommendationMessageTitle}>
          {recommendationReason}
        </div>

        <div className={styles.recommendationSummary}>
          {recommendationSummary}
        </div>

      </div>

      <div className={styles.stockStats}>

        {price != null && (
          <div className={styles.stockStat}>

            <div className={styles.stockStatLabel}>
              Current Price
            </div>

            <div className={styles.stockStatValue}>
              ${price.toFixed(2)}
            </div>

          </div>
        )}

        {marketCap != null && (
          <div className={styles.stockStat}>

            <div className={styles.stockStatLabel}>
              Market Value
            </div>

            <div className={styles.stockStatValue}>
              {formatLargeNumber(marketCap)}
            </div>

          </div>
        )}

        {sector && (
          <div className={styles.stockStat}>

            <div className={styles.stockStatLabel}>
              Industry
            </div>

            <div
              className={styles.stockStatValue}
              style={{ fontSize: "0.95rem" }}
            >
              {sector}
            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default RecommendationCard;