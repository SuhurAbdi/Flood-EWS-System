import FloodQRCode from "../components/FloodQRCode";
function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}

      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              🌍 Climate Resilience & Early Warning
            </div>

            <h1>
              Know the Risk.
              <span> Act Early.</span>
              <br />
              Stay Safe.
            </h1>

            <p>
              A community-focused flood early warning system that combines flood
              forecasts, local risk information, and community reports to
              support faster and safer action.
            </p>

            <div className="hero-buttons">
              <a href="/flood-map" className="hero-primary-button">
                View Flood Risk Map
              </a>

              <a href="/report-flood" className="hero-secondary-button">
                Report a Flood
              </a>
            </div>
          </div>

          {/* Hero visual */}

          <div className="hero-card">
            <div className="risk-card">
              <div className="risk-icon">🌊</div>

              <div>
                <p className="risk-label">Current Flood Risk</p>

                <h2>Monitoring</h2>
              </div>
            </div>

            <div className="risk-stat">
              <span>Community Reports</span>

              <strong>24</strong>
            </div>

            <div className="risk-stat">
              <span>Areas Monitored</span>

              <strong>12</strong>
            </div>

            <div className="risk-status">
              <span className="status-dot"></span>
              System Operational
            </div>
          </div>
        </div>
      </section>

      {/* Features */}

      <section className="features-section">
        <div className="section-heading">
          <span>HOW IT WORKS</span>

          <h2>Turning Flood Data Into Action</h2>

          <p>
            The system connects forecasts with local communities and verified
            flood reports.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🌧️</div>

            <h3>Monitor</h3>

            <p>
              Monitor flood forecasts and local environmental risk information.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🚨</div>

            <h3>Alert</h3>

            <p>
              Provide localized warnings so communities can understand their
              flood risk.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🤝</div>

            <h3>Report</h3>

            <p>
              Communities can report what actually happened during a flood
              event.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🤖</div>

            <h3>Learn</h3>

            <p>
              Verified community information helps improve local risk
              predictions over time.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}

      <section className="cta-section">
        <div>
          <h2>Help Build Safer Communities</h2>

          <p>
            Report flooding in your area and help improve future flood warnings.
          </p>
        </div>

        <a href="/report-flood" className="cta-button">
          Report a Flood
        </a>
      </section>
    </div>
  );
}

export default Home;
