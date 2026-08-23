import PageHeader from "../components/PageHeader";
import AlertCard from "../components/AlertCard";

function Alerts() {
  return (
    <div>
      <PageHeader
        title="Flood Alerts"
        description="Stay informed about flood risks in monitored areas."
      />

      <section className="alerts-section">
        <div className="alerts-summary">
          <div>
            <span>ACTIVE ALERTS</span>
            <h2>2</h2>
          </div>

          <div>
            <span>AREAS MONITORED</span>
            <h2>12</h2>
          </div>

          <div>
            <span>SYSTEM STATUS</span>
            <h2 className="online">Online</h2>
          </div>
        </div>

        <div className="alerts-list">
          <AlertCard
            level="High"
            title="High Flood Risk Detected"
            location="Manafwa Catchment"
            time="10 minutes ago"
            message="Residents in low-lying areas should monitor official guidance and prepare for possible flooding."
          />

          <AlertCard
            level="Mild"
            title="Flood Conditions Being Monitored"
            location="Butaleja"
            time="35 minutes ago"
            message="Current conditions indicate a mild risk. Continue monitoring local updates."
          />
        </div>
      </section>
    </div>
  );
}

export default Alerts;
