import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import PsychologyIcon from '@mui/icons-material/Psychology';

function ReasoningCard({ reasoning }) {
  if (!reasoning) return null;

  // Split reasoning into sentences for bullet points
  const sentences = reasoning
    .split(/(?<=\.)\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 5);

  return (
    <div className="glass-card">
      <div className="section-title">
        <PsychologyIcon className="icon" />
        AI Reasoning
      </div>
      <ul className="reasoning-list">
        {sentences.map((sentence, i) => (
          <li key={i} className="reasoning-item">
            <CheckCircleOutlineIcon className="reasoning-item__icon" />
            <span>{sentence}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReasoningCard;
