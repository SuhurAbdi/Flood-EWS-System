function AlertCard({ level, title, location, time, message }) {
  return (
    <div className={`alert-card alert-${level.toLowerCase()}`}>
      <div className="alert-icon">🚨</div>

      <div className="alert-content">
        <div className="alert-top">
          <span className="alert-level">{level} RISK</span>

          <span className="alert-time">{time}</span>
        </div>

        <h3>{title}</h3>

        <p className="alert-location">📍 {location}</p>

        <p>{message}</p>
      </div>
    </div>
  );
}

export default AlertCard;
