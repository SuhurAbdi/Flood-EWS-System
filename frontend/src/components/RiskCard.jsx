function RiskCard({ level, probability, location, description }) {
  return (
    <div className={`risk-card risk-${level.toLowerCase()}`}>
      <div className="risk-card-top">
        <div>
          <span className="risk-small-title">FLOOD RISK</span>

          <h2>{level}</h2>
        </div>

        <div className="risk-probability">{probability}%</div>
      </div>

      <div className="risk-location">📍 {location}</div>

      <p>{description}</p>
    </div>
  );
}

export default RiskCard;
