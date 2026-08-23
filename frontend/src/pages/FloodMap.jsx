import PageHeader from "../components/PageHeader";
import RiskCard from "../components/RiskCard";

import "../index.css";
import "../App.css";

function FloodMap() {
  return (
    <div>
      <PageHeader
        title="Flood Risk Map"
        description="Explore flood-risk areas and community reports."
      />

      <section className="map-section">
        <div className="map-container">
          <div className="map-placeholder">
            <div className="map-center">
              <div className="map-marker">📍</div>

              <h3>Interactive Flood Map</h3>

              <p>GIS flood-risk mapping will appear here.</p>
            </div>
          </div>

          <aside className="map-sidebar">
            <h2>Current Risk</h2>

            <RiskCard
              level="High"
              probability="87"
              location="Manafwa Catchment"
              description="High risk based on current forecast conditions."
            />

            <RiskCard
              level="Mild"
              probability="42"
              location="Butaleja"
              description="Monitor conditions and local alerts."
            />
          </aside>
        </div>
      </section>
    </div>
  );
}

export default FloodMap;
