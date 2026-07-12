import InsightsIcon from '@mui/icons-material/Insights';

function getSentimentClass(sentiment) {
  if (!sentiment) return 'neutral';
  const s = sentiment.toUpperCase();
  if (s === 'POSITIVE') return 'positive';
  if (s === 'NEGATIVE') return 'negative';
  if (s === 'MIXED') return 'mixed';
  return 'neutral';
}

function SentimentAnalysis({ data }) {
  if (!data) return null;

  const { overall, summary, articles } = data;

  return (
    <div className="glass-card">
      <div className="section-title">
        <InsightsIcon className="icon" />
        Sentiment Analysis
      </div>

      {/* Overall Badge */}
      {overall && (
        <div className="sentiment-overall">
          <span className={`sentiment-badge sentiment-badge--${getSentimentClass(overall)}`}>
            {overall}
          </span>
        </div>
      )}

      {/* Summary */}
      {summary && (
        <p className="sentiment-summary">{summary}</p>
      )}

      {/* Article-wise sentiment */}
      {articles && articles.length > 0 && (
        <div className="sentiment-articles">
          {articles.map((article, i) => {
            const sentClass = getSentimentClass(article.sentiment);
            return (
              <div key={i} className="sentiment-article-item">
                <span className={`sentiment-dot sentiment-dot--${sentClass}`} />
                <div className="sentiment-article-item__content">
                  <div className="sentiment-article-item__title">
                    {article.title || 'Untitled'}
                  </div>
                  {article.reason && (
                    <div className="sentiment-article-item__reason">
                      {article.reason}
                    </div>
                  )}
                </div>
                <span
                  className={`sentiment-badge sentiment-badge--${sentClass} sentiment-article-item__badge`}
                >
                  {article.sentiment || 'N/A'}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SentimentAnalysis;
