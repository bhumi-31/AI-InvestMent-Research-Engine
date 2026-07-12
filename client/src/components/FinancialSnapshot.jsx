import ShowChartIcon from '@mui/icons-material/ShowChart';

function formatValue(value, type) {
  if (value == null || value === undefined) return 'N/A';

  switch (type) {
    case 'currency':
      return `$${Number(value).toFixed(2)}`;
    case 'largeNumber': {
      const num = Number(value);
      if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
      if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
      if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
      return `$${num.toLocaleString()}`;
    }
    case 'percentage':
      return `${(Number(value) * 100).toFixed(2)}%`;
    case 'ratio':
      return Number(value).toFixed(2);
    default:
      return String(value);
  }
}

const metrics = [
  { key: 'price', label: 'Price', type: 'currency' },
  { key: 'marketCap', label: 'Market Cap', type: 'largeNumber' },
  { key: 'revenue', label: 'Revenue', type: 'largeNumber' },
  { key: 'netIncome', label: 'Net Income', type: 'largeNumber' },
  { key: 'peRatio', label: 'P/E Ratio', type: 'ratio' },
  { key: 'pbRatio', label: 'P/B Ratio', type: 'ratio' },
  { key: 'eps', label: 'EPS', type: 'currency' },
  { key: 'roe', label: 'ROE', type: 'percentage' },
  { key: 'roa', label: 'ROA', type: 'percentage' },
  { key: 'debtToEquity', label: 'Debt/Equity', type: 'ratio' },
  { key: 'currentRatio', label: 'Current Ratio', type: 'ratio' },
  { key: 'grossMargin', label: 'Gross Margin', type: 'percentage' },
];

function FinancialSnapshot({ data }) {
  if (!data) return null;

  return (
    <div>
      <div className="section-title">
        <ShowChartIcon className="icon" />
        Financial Snapshot
      </div>
      <div className="financial-grid">
        {metrics.map(({ key, label, type }) => (
          <div key={key} className="metric-card">
            <div className="metric-card__label">{label}</div>
            <div className="metric-card__value">
              {formatValue(data[key], type)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FinancialSnapshot;
