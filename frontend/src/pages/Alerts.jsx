import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import AlertCard from "../components/AlertCard";
import { getFloodAlerts } from "../services/api";

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAlerts();
  }, []);

  async function loadAlerts() {
    try {
      setLoading(true);
      setError("");

      const data = await getFloodAlerts();

      setAlerts(data.alerts || []);
    } catch (error) {
      console.error(error);
      setError("Unable to load flood alerts.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="alerts-page">
      <PageHeader
        title="Flood Alerts"
        description="Stay informed about flood risks in monitored areas."
      />

      <section className="alerts-section">
        <div className="alerts-header">
          <div>
            <h2>🚨 Current Flood Alerts</h2>

            <p>Monitor the latest flood reports and warnings in your area.</p>
          </div>

          <button className="register-button" onClick={loadAlerts}>
            🔄 Refresh
          </button>
        </div>

        {loading && (
          <div className="alerts-loading">Loading flood alerts...</div>
        )}

        {error && <div className="alerts-error">❌ {error}</div>}

        {!loading && !error && alerts.length === 0 && (
          <div className="no-alerts">
            <div className="no-alerts-icon">✅</div>

            <h3>No Active Flood Alerts</h3>

            <p>
              There are currently no active flood alerts in monitored areas.
            </p>
          </div>
        )}

        <div className="alerts-list">
          {alerts.map((alert) => (
            <div className={`alert-card ${alert.severity}`} key={alert.id}>
              <div className="alert-icon">
                {alert.severity === "severe"
                  ? "🚨"
                  : alert.severity === "moderate"
                    ? "⚠️"
                    : "ℹ️"}
              </div>

              <div className="alert-content">
                <div className="alert-top">
                  <h3>{alert.title}</h3>

                  <span className={`alert-badge ${alert.severity}`}>
                    {alert.severity}
                  </span>
                </div>

                <p className="alert-location">📍 {alert.location}</p>

                <p className="alert-description">{alert.description}</p>

                <div className="alert-details">
                  <span>🌊 Flood Risk: {alert.severity}</span>

                  <span>
                    📅 {new Date(alert.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Alerts;
