import styles from './RisksCatalysts.module.css';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShieldIcon from '@mui/icons-material/Shield';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

function RisksCatalysts({ risks, catalysts }) {
  if ((!risks || risks.length === 0) && (!catalysts || catalysts.length === 0)) {
    return null;
  }

  return (
    <div className={styles.risksCatalystsGrid}>
      {/* Risks */}
      <div className={styles.rcCard}>
        <div className={`${styles.rcCardTitle} ${styles.rcCardTitleRisk}`}>
          <ShieldIcon style={{ fontSize: '1.1rem' }} />
          Key Risks
        </div>
        {risks && risks.length > 0 ? (
          <ul className={`${styles.rcList} ${styles.rcItems}`}>
            {risks.map((risk, i) => (
              <li key={i} className={`${styles.rcItem} ${styles.rcItemCard}`}>
                <WarningAmberIcon className={styles.rcItemIconRisk} />
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
      <div className={styles.rcCard}>
        <div className={`${styles.rcCardTitle} ${styles.rcCardTitleCatalyst}`}>
          <RocketLaunchIcon style={{ fontSize: '1.1rem' }} />
          Growth Catalysts
        </div>
        {catalysts && catalysts.length > 0 ? (
          <ul className={`${styles.rcList} ${styles.rcItems}`}>
            {catalysts.map((catalyst, i) => (
              <li key={i} className={`${styles.rcItem} ${styles.rcItemCard}`}>
                <TrendingUpIcon className={styles.rcItemIconCatalyst} />
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
