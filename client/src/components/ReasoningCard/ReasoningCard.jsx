

import styles from './ReasoningCard.module.css';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import PsychologyIcon from "@mui/icons-material/Psychology";

function getReasonType(text) {
  const lower = text.toLowerCase();

  if (
    lower.includes("risk") ||
    lower.includes("debt") ||
    lower.includes("concern") ||
    lower.includes("decline") ||
    lower.includes("loss") ||
    lower.includes("weak")
  ) {
    return {
      icon: <WarningAmberIcon />,
      className: `${styles.reasonCard} ${styles.reasonCardDanger}`,
      title: "Risk"
    };
  }

  if (
    lower.includes("news") ||
    lower.includes("analyst") ||
    lower.includes("sentiment") ||
    lower.includes("article")
  ) {
    return {
      icon: <NewspaperIcon />,
      className: `${styles.reasonCard} ${styles.reasonCardNeutral}`,
      title: "Market News"
    };
  }

  return {
    icon: <CheckCircleIcon />,
    className: `${styles.reasonCard} ${styles.reasonCardPositive}`,
    title: "Positive Signal"
  };
}

function ReasoningCard({ reasoning }) {
  if (!reasoning) return null;

  const reasons = reasoning
    .split(/(?<=\.)\s+/)
    .map((r) => r.trim())
    .filter((r) => r.length > 15);

  return (
    <div className="glass-card">
      <div className="section-title">
        <PsychologyIcon className="icon" />
        Why did AI recommend this?
      </div>

      <p className={styles.reasoningSubtitle}>
        These are the main factors considered before generating the investment recommendation.
      </p>

      <div className={styles.reasoningGrid}>
        {reasons.map((reason, index) => {
          const item = getReasonType(reason);

          return (
            <div key={index} className={item.className}>
              <div className={styles.reasonCardHeader}>
                {item.icon}
                <h4>{item.title}</h4>
              </div>

              <p>{reason}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ReasoningCard;