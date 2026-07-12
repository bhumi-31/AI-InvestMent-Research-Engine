import styles from './DetailedFinancials.module.css';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function DetailedFinancials({ data }) {
  const [open, setOpen] = useState(false);

  if (!data) return null;

  return (
    <div className={`${styles.accordion} ${open ? styles.accordionOpen : ''}`}>
      <div className={styles.accordionHeader} onClick={() => setOpen(!open)}>
        <div className={styles.accordionHeaderLeft}>
          <AnalyticsIcon style={{ fontSize: '1.1rem', opacity: 0.7 }} />
          Detailed Financial Analysis
        </div>
        <ExpandMoreIcon
          className={`${styles.accordionIcon} ${open ? styles.accordionIconOpen : ''}`}
        />
      </div>
      {open && (
        <div className={styles.accordionBody}>
          <div className={styles.markdownContent}>
            <ReactMarkdown>{data}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailedFinancials;
