import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function DetailedFinancials({ data }) {
  const [open, setOpen] = useState(false);

  if (!data) return null;

  return (
    <div className={`accordion ${open ? 'accordion--open' : ''}`}>
      <div className="accordion__header" onClick={() => setOpen(!open)}>
        <div className="accordion__header-left">
          <AnalyticsIcon style={{ fontSize: '1.1rem', opacity: 0.7 }} />
          Detailed Financial Analysis
        </div>
        <ExpandMoreIcon
          className={`accordion__icon ${open ? 'accordion__icon--open' : ''}`}
        />
      </div>
      {open && (
        <div className="accordion__body">
          <div className="markdown-content">
            <ReactMarkdown>{data}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailedFinancials;
