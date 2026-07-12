import NewspaperIcon from '@mui/icons-material/Newspaper';

function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

function NewsFeed({ articles }) {
  if (!articles || articles.length === 0) return null;

  return (
    <div className="glass-card">
      <div className="section-title">
        <NewspaperIcon className="icon" />
        Latest News
      </div>
      <div className="news-grid">
        {articles.map((article, i) => (
          <div key={i} className="news-article">
            <div className="news-article__title">
              {article.title || 'Untitled Article'}
            </div>
            <div className="news-article__meta">
              {article.source && (
                <span className="news-badge news-badge--source">
                  {article.source}
                </span>
              )}
              {article.date && (
                <span className="news-badge news-badge--date">
                  {formatDate(article.date)}
                </span>
              )}
            </div>
            {article.description && (
              <p className="news-article__desc">{article.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsFeed;