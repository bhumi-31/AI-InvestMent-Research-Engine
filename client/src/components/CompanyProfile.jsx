import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import BusinessIcon from '@mui/icons-material/Business';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function CompanyProfile({ data }) {
  const [open, setOpen] = useState(false);

  if (!data) return null;

  return (
    <div className={`accordion ${open ? 'accordion--open' : ''}`}>
      <div className="accordion__header" onClick={() => setOpen(!open)}>
        <div className="accordion__header-left">
          <BusinessIcon style={{ fontSize: '1.1rem', opacity: 0.7 }} />
          Company Profile
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

export default CompanyProfile;