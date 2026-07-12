import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShieldIcon from '@mui/icons-material/Shield';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

function RisksCatalysts({ risks, catalysts }) {
  if ((!risks || risks.length === 0) && (!catalysts || catalysts.length === 0)) {
    return null;
  }

  return (
    <div className="risks-catalysts-grid">
      {/* Risks */}
      <div className="rc-card">
        <div className="rc-card__title rc-card__title--risk">
          <ShieldIcon style={{ fontSize: '1.1rem' }} />
          Key Risks
        </div>
        {risks && risks.length > 0 ? (
          <ul className="rc-list">
            {risks.map((risk, i) => (
              <li key={i} className="rc-item">
                <WarningAmberIcon className="rc-item__icon--risk" />
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            No risks identified.
          </p>
        )}
      </div>

      {/* Catalysts */}
      <div className="rc-card">
        <div className="rc-card__title rc-card__title--catalyst">
          <RocketLaunchIcon style={{ fontSize: '1.1rem' }} />
          Growth Catalysts
        </div>
        {catalysts && catalysts.length > 0 ? (
          <ul className="rc-list">
            {catalysts.map((catalyst, i) => (
              <li key={i} className="rc-item">
                <TrendingUpIcon className="rc-item__icon--catalyst" />
                <span>{catalyst}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            No catalysts identified.
          </p>
        )}
      </div>
    </div>
  );
}

export default RisksCatalysts;
