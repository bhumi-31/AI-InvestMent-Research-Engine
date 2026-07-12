

import styles from './SentimentAnalysis.module.css';
import InsightsIcon from "@mui/icons-material/Insights";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

function getSentimentClass(sentiment) {
  if (!sentiment) return "neutral";

  const s = sentiment.toUpperCase();

  if (s === "POSITIVE") return "positive";
  if (s === "NEGATIVE") return "negative";
  if (s === "MIXED") return "mixed";

  return "neutral";
}

function SentimentAnalysis({ data }) {
  if (!data) return null;

  const { overall, summary, articles = [] } = data;

  const positive = articles.filter(
    (a) => a.sentiment === "POSITIVE"
  ).length;

  const neutral = articles.filter(
    (a) => a.sentiment === "NEUTRAL"
  ).length;

  const negative = articles.filter(
    (a) => a.sentiment === "NEGATIVE"
  ).length;

  return (
    <div className="glass-card">

      <div className="section-title">
        <InsightsIcon className="icon" />
        Overall Market Mood
      </div>

      <div className={styles.sentimentOverall}>
        <span
          className={`sentiment-badge sentiment-badge--${getSentimentClass(
            overall
          )}`}
        >
          {overall}
        </span>
      </div>

      <p className={styles.sentimentSummary}>
        {summary}
      </p>

      <div className={styles.sentimentStats}>

        <div className={`${styles.sentimentStat} ${styles.positive}`}>
          <TrendingUpIcon />
          <div>
            <strong>{positive}</strong>
            <span>Positive</span>
          </div>
        </div>

        <div className={`${styles.sentimentStat} ${styles.neutral}`}>
          <TrendingFlatIcon />
          <div>
            <strong>{neutral}</strong>
            <span>Neutral</span>
          </div>
        </div>

        <div className={`${styles.sentimentStat} ${styles.negative}`}>
          <TrendingDownIcon />
          <div>
            <strong>{negative}</strong>
            <span>Negative</span>
          </div>
        </div>

      </div>

    </div>
  );
}

export default SentimentAnalysis;