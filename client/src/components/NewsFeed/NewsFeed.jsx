

import styles from './NewsFeed.module.css';
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

      <div className={styles.newsGrid}>
        {articles.map((article, index) => (
          <div key={index} className={styles.newsCard}>

            <div className={styles.newsCardHeader}>

              {article.source && (
                <span className={`${styles.newsSource} ${styles.newsChip}`}>
                  {article.source}
                </span>
              )}

              {article.date && (
                <span className={styles.newsDate}>
                  {formatDate(article.date)}
                </span>
              )}

            </div>

            <h3 className={styles.newsTitle}>
              {article.title}
            </h3>

            {article.description && (
              <p className={styles.newsDescription}>
                {article.description}
              </p>
            )}

            {article.url && (
              <a
                href={article.url}
                target="_blank"
                rel="noreferrer"
                className={styles.newsLink}
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