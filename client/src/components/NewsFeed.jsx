

import NewspaperIcon from "@mui/icons-material/Newspaper";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

function formatDate(dateStr) {
  if (!dateStr) return "";

  try {
    const date = new Date(dateStr);

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
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
        {articles.map((article, index) => (
          <div key={index} className="news-card">

            <div className="news-card__header">

              {article.source && (
                <span className="news-source">
                  {article.source}
                </span>
              )}

              {article.date && (
                <span className="news-date">
                  {formatDate(article.date)}
                </span>
              )}

            </div>

            <h3 className="news-title">
              {article.title}
            </h3>

            {article.description && (
              <p className="news-description">
                {article.description}
              </p>
            )}

            {article.url && (
              <a
                href={article.url}
                target="_blank"
                rel="noreferrer"
                className="news-link"
              >
                Read Full Article
                <OpenInNewIcon
                  sx={{ fontSize: 18 }}
                />
              </a>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsFeed;