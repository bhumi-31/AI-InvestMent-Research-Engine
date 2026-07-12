

import styles from './FinancialSnapshot.module.css';
import ShowChartIcon from "@mui/icons-material/ShowChart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorIcon from "@mui/icons-material/Error";

function formatValue(value, type) {
  if (value == null || value === undefined) return "N/A";

  switch (type) {
    case "currency":
      return `$${Number(value).toFixed(2)}`;

    case "largeNumber": {
      const num = Number(value);

      if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
      if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
      if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;

      return `$${num.toLocaleString()}`;
    }

    default:
      return value;
  }
}

const topMetrics = [
  {
    key: "price",
    label: "Current Price",
    type: "currency",
  },
  {
    key: "marketCap",
    label: "Market Value",
    type: "largeNumber",
  },
  {
    key: "revenue",
    label: "Annual Revenue",
    type: "largeNumber",
  },
  {
    key: "netIncome",
    label: "Net Profit",
    type: "largeNumber",
  },
];

function HealthCard({ title, status, description, color }) {
  return (
    <div className={styles.healthCard}>

      <div className={styles.healthCardHeader}>

        {color === "green" && <CheckCircleIcon className={styles.green} />}

        {color === "yellow" && <WarningAmberIcon className={styles.yellow} />}

        {color === "red" && <ErrorIcon className={styles.red} />}

        <h4>{title}</h4>

      </div>

      <div className={`${styles.healthStatus} ${styles[color]}`}>
        {status}
      </div>

      <p>{description}</p>

    </div>
  );
}

function FinancialSnapshot({ data }) {
  if (!data) return null;

  return (
    <div className={styles.financialSection}>

      <div className="section-title">
        <ShowChartIcon className="icon" />
        Financial Health
      </div>

      {/* Top Numbers */}

      <div className={styles.financialGrid}>

        {topMetrics.map(({ key, label, type }) => (

          <div key={key} className={styles.metricCard}>

            <div className={styles.metricCardLabel}>
              {label}
            </div>

            <div className={styles.metricCardValue}>
              {formatValue(data[key], type)}
            </div>

          </div>

        ))}

      </div>

      {/* Health Report */}

      <div className={styles.healthGrid}>

        <HealthCard
          title="Stock Valuation"
          color={
            data.peRatio < 20
              ? "green"
              : data.peRatio < 35
              ? "yellow"
              : "red"
          }
          status={
            data.peRatio < 20
              ? "Looks Cheap"
              : data.peRatio < 35
              ? "Fairly Valued"
              : "Expensive"
          }
          description="Compares the stock price with company earnings."
        />

        <HealthCard
          title="Profitability"
          color={
            data.roe > 0.20
              ? "green"
              : data.roe > 0.10
              ? "yellow"
              : "red"
          }
          status={
            data.roe > 0.20
              ? "Excellent"
              : data.roe > 0.10
              ? "Average"
              : "Weak"
          }
          description="Shows how efficiently the company generates profits."
        />

        <HealthCard
          title="Debt Level"
          color={
            data.debtToEquity < 1
              ? "green"
              : data.debtToEquity < 2
              ? "yellow"
              : "red"
          }
          status={
            data.debtToEquity < 1
              ? "Low"
              : data.debtToEquity < 2
              ? "Moderate"
              : "High"
          }
          description="Lower debt generally means lower financial risk."
        />

        <HealthCard
          title="Liquidity"
          color={
            data.currentRatio > 1.5
              ? "green"
              : data.currentRatio >= 1
              ? "yellow"
              : "red"
          }
          status={
            data.currentRatio > 1.5
              ? "Healthy"
              : data.currentRatio >= 1
              ? "Average"
              : "Weak"
          }
          description="Ability to pay short-term obligations."
        />

      </div>

    </div>
  );
}

export default FinancialSnapshot;