import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/manafwaBasin.css";
import "../images/manafwa.png";
import "../images/river.png";
import manafwaImage from "../images/manafwa.png";
import riverImage from "../images/river.png";

function ManafwaBasin() {
  const navigate = useNavigate();

  // Manafwa River approximate source-to-downstream coordinates
  // Source: published studies on the Manafwa River.
  const manafwaCenter = [1.02, 34.25];

  return (
    <div className="manafwa-basin-page">
      {/* ==================================================
          HERO
      ================================================== */}
      <section className="manafwa-basin-hero">
        <div className="manafwa-basin-hero-content">
          <span className="manafwa-basin-label">SYSTEM STUDY AREA</span>

          <h1>Manafwa River Basin</h1>

          <p>
            Manafwa River focuses on localized flood risk monitoring and early
            warning within the Manafwa River Basin in Eastern Uganda.
          </p>

          <div className="manafwa-basin-actions">
            <button
              className="manafwa-basin-primary-button"
              onClick={() => navigate("/flood-map?area=manafwa")}
            >
              🗺️ View Flood Map
            </button>

            <button
              className="manafwa-basin-secondary-button"
              onClick={() => navigate("/report-flood?area=manafwa")}
            >
              🌊 Report a Flood
            </button>
          </div>
        </div>

        <div className="manafwa-basin-hero-visual">
          <div className="manafwa-basin-river-card">
            <span className="manafwa-basin-river-icon">🌊</span>

            <strong>Manafwa Basin</strong>

            <span>Localized Flood Monitoring</span>
          </div>
        </div>
      </section>

      {/* ==================================================
          Pictures 
      ================================================== */}
      <section className="manafwa-basin-visuals">
        <div className="manafwa-basin-visuals-heading">
          <span>THE STUDY AREA</span>
          <h2>Manafwa River and Basin</h2>
          <p>
            The system focuses on localized flood-prone areas within the Manafwa
            River Basin in Eastern Uganda.
          </p>
        </div>

        <div className="manafwa-basin-image-grid">
          {/* Manafwa River Photo */}
          <div className="manafwa-basin-image-card">
            <img
              src={riverImage}
              alt="Manafwa River Basin"
              className="manafwa-basin-picture"
            />

            <div className="manafwa-basin-image-caption">
              <span>01</span>
              <div>
                <h3>Manafwa River</h3>
                <p>
                  The river and surrounding landscape form an important part of
                  the System study area.
                </p>
              </div>
            </div>
          </div>

          {/* Manafwa Basin Map */}
          <div className="manafwa-basin-image-card">
            <img
              src={manafwaImage}
              alt="Manafwa River in Eastern Uganda"
              className="manafwa-basin-picture"
            />

            <div className="manafwa-basin-image-caption">
              <span>02</span>
              <div>
                <h3>Manafwa Basin Study Area</h3>
                <p>
                  The map highlights the geographical area where System focuses
                  on localized flood risk.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ==================================================
          LOCATION MAP
      ================================================== */}
      <section className="manafwa-basin-map-section">
        <div className="manafwa-basin-map-heading">
          <span className="manafwa-basin-small-label">STUDY AREA LOCATION</span>

          <h2>Manafwa River Basin Location</h2>

          <p>
            Explore the geographical location of the Manafwa River Basin and the
            area covered by System.
          </p>
        </div>

        <div className="manafwa-basin-map-wrapper">
          <MapContainer
            center={manafwaCenter}
            zoom={10}
            scrollWheelZoom={true}
            className="manafwa-basin-map"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Manafwa River source */}
            <CircleMarker
              center={[1.089092, 34.46106]}
              radius={9}
              pathOptions={{
                color: "#14532D",
                fillColor: "#16A34A",
                fillOpacity: 0.9,
              }}
            >
              <Popup>
                <strong>Manafwa River Source</strong>
                <br />
                Eastern Uganda
              </Popup>
            </CircleMarker>

            {/* Manafwa downstream location */}
            <CircleMarker
              center={[0.943084, 33.98428]}
              radius={9}
              pathOptions={{
                color: "#14532D",
                fillColor: "#16A34A",
                fillOpacity: 0.9,
              }}
            >
              <Popup>
                <strong>Manafwa River Downstream</strong>
                <br />
                Butaleja area
              </Popup>
            </CircleMarker>

            {/* Main FloodEWS study-area marker */}
            <Marker position={[1.02, 34.25]}>
              <Popup>
                <div className="manafwa-basin-popup">
                  <strong>Manafwa River Basin</strong>

                  <p>FloodEWS localized study area</p>

                  <button onClick={() => navigate("/flood-map?area=manafwa")}>
                    Open Flood Map
                  </button>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* MAP INFORMATION */}
        <div className="manafwa-basin-map-info">
          <div className="manafwa-basin-map-info-card">
            <span>📍</span>

            <div>
              <strong>Location</strong>

              <p>Eastern Uganda, near Mount Elgon</p>
            </div>
          </div>

          <div className="manafwa-basin-map-info-card">
            <span>🌊</span>

            <div>
              <strong>River System</strong>

              <p>Manafwa River and connected drainage network</p>
            </div>
          </div>

          <div className="manafwa-basin-map-info-card">
            <span>⚠️</span>

            <div>
              <strong>Flood Focus</strong>

              <p>Localized flood-prone communities and areas</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          ABOUT THE STUDY AREA
      ================================================== */}
      <section className="manafwa-basin-section">
        <div className="manafwa-basin-section-heading">
          <span className="manafwa-basin-small-label">
            ABOUT THE STUDY AREA
          </span>

          <h2>Understanding the Manafwa River Basin</h2>

          <p>
            The Manafwa River Basin is located in Eastern Uganda and extends
            from the Mount Elgon highlands toward the low-lying areas
            downstream. The river system passes through several districts and is
            affected by flooding, runoff, sedimentation, and environmental
            changes.
          </p>
        </div>

        <div className="manafwa-basin-info-grid">
          <div className="manafwa-basin-info-card">
            <div className="manafwa-basin-info-icon">📍</div>

            <h3>Study Area</h3>

            <p>
              System focuses on localized areas within the Manafwa catchment
              rather than applying a global flood-risk approach.
            </p>
          </div>

          <div className="manafwa-basin-info-card">
            <div className="manafwa-basin-info-icon">🌧️</div>

            <h3>Flood Risk</h3>

            <p>
              Heavy rainfall, runoff, river-level changes and vulnerable
              low-lying areas can contribute to flood impacts.
            </p>
          </div>

          <div className="manafwa-basin-info-card">
            <div className="manafwa-basin-info-icon">👥</div>

            <h3>Communities</h3>

            <p>
              System is designed to provide understandable, location-specific
              information that supports community preparedness and early action.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================
          WHY MANAFWA
      ================================================== */}
      <section className="manafwa-basin-focus">
        <div className="manafwa-basin-focus-content">
          <span className="manafwa-basin-small-label">WHY MANAFWA?</span>

          <h2>Localized Flood Risk Needs Localized Solutions</h2>

          <p>
            Flood risk varies from one location to another.System therefore
            focuses on the Manafwa study area so that flood information,
            mapping, reports and warnings can be connected to the locations
            where they matter most.
          </p>

          <p>
            The system combines flood-risk information, community reporting,
            mapping, alerts and early-warning concepts to support preparedness
            and early action.
          </p>
        </div>

        <div className="manafwa-basin-focus-points">
          <div className="manafwa-basin-focus-item">
            <span>01</span>

            <div>
              <strong>Localized Monitoring</strong>

              <p>
                Focus on relevant flood-prone locations within the Manafwa study
                area.
              </p>
            </div>
          </div>

          <div className="manafwa-basin-focus-item">
            <span>02</span>

            <div>
              <strong>Risk Assessment</strong>

              <p>
                Analyze available information to identify changing flood-risk
                conditions.
              </p>
            </div>
          </div>

          <div className="manafwa-basin-focus-item">
            <span>03</span>

            <div>
              <strong>Community Reporting</strong>

              <p>
                Allow communities to contribute observations about flood events.
              </p>
            </div>
          </div>

          <div className="manafwa-basin-focus-item">
            <span>04</span>

            <div>
              <strong>Early Warning</strong>

              <p>
                Communicate relevant flood information so people can prepare and
                act early.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          FLOOD EWS APPROACH
      ================================================== */}
      <section className="manafwa-basin-section">
        <div className="manafwa-basin-section-heading">
          <span className="manafwa-basin-small-label">SYSTEM APPROACH</span>

          <h2>From Monitoring to Early Action</h2>

          <p>
            FloodEWS connects information, risk assessment, communication and
            community action.
          </p>
        </div>

        <div className="manafwa-basin-process">
          <div className="manafwa-basin-process-step">
            <span>01</span>
            <h3>Monitor</h3>
            <p>Monitor relevant flood and environmental information.</p>
          </div>

          <div className="manafwa-basin-process-line"></div>

          <div className="manafwa-basin-process-step">
            <span>02</span>
            <h3>Assess</h3>
            <p>Assess information to identify potential flood risks.</p>
          </div>

          <div className="manafwa-basin-process-line"></div>

          <div className="manafwa-basin-process-step">
            <span>03</span>
            <h3>Warn</h3>
            <p>Communicate relevant flood warnings to users.</p>
          </div>

          <div className="manafwa-basin-process-line"></div>

          <div className="manafwa-basin-process-step">
            <span>04</span>
            <h3>Act</h3>
            <p>Support communities to prepare and respond early.</p>
          </div>
        </div>
      </section>

      {/* ==================================================
          CTA
      ================================================== */}
      <section className="manafwa-basin-cta">
        <div>
          <span className="manafwa-basin-small-label">
            FLOOD RISK AWARENESS
          </span>

          <h2>Know the Risk. Act Early. Stay Safe.</h2>

          <p>
            Explore the Manafwa flood-risk information or contribute a community
            flood report.
          </p>
        </div>

        <div className="manafwa-basin-cta-actions">
          <button
            className="manafwa-basin-primary-button"
            onClick={() => navigate("/flood-map?area=manafwa")}
          >
            🗺️ Explore Flood Map
          </button>

          <button
            className="manafwa-basin-secondary-button"
            onClick={() => navigate("/alerts")}
          >
            🚨 View Alerts
          </button>
        </div>
      </section>
    </div>
  );
}

export default ManafwaBasin;
