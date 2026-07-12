import styles from './CompanyProfile.module.css';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import BusinessIcon from '@mui/icons-material/Business';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function CompanyProfile({ data }) {
  const [open, setOpen] = useState(false);

  if (!data) return null;

  return (
    <div className={`${styles.accordion} ${open ? styles.accordionOpen : ''}`}>
      <div className={styles.accordionHeader} onClick={() => setOpen(!open)}>
        <div className={styles.accordionHeaderLeft}>
          <BusinessIcon style={{ fontSize: '1.1rem', opacity: 0.7 }} />
          Company Profile
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

export default CompanyProfile;