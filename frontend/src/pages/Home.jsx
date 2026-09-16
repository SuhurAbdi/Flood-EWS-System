import FloodQRCode from "../components/FloodQRCode";

function Home() {
  return (
    <div className="home-page">
      {/* =========================
          HERO SECTION
      ========================= */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-circle circle-one"></div>
          <div className="hero-circle circle-two"></div>
        </div>

        <div className="hero-container">
          {/* LEFT SIDE */}
          <div className="hero-content">
            <div className="hero-badge">
              <span className="pulse-dot"></span>
              AI-Powered Flood Early Warning
            </div>

            <h1>
              Know the Risk.
              <span> Act Before </span>
              the Flood.
            </h1>

            <p className="hero-description">
              GreenShield combines flood forecasts, environmental data,
              AI-powered risk prediction, and community reports to help
              communities receive warnings and take action before flooding
              becomes a disaster.
            </p>

            <div className="hero-buttons">
              <a href="/flood-map" className="hero-primary-button">
                🗺️ View Live Risk Map
              </a>

              <a href="/report-flood" className="hero-secondary-button">
                🚨 Report a Flood
              </a>
            </div>

            <div className="hero-trust">
              <div className="trust-item">
                <span>🤖</span>
                <div>
                  <strong>AI Prediction</strong>
                  <small>XGBoost powered</small>
                </div>
              </div>

              <div className="trust-item">
                <span>📍</span>
                <div>
                  <strong>Localized Risk</strong>
                  <small>Location-based alerts</small>
                </div>
              </div>

              <div className="trust-item">
                <span>🤝</span>
                <div>
                  <strong>Community</strong>
                  <small>Citizen reporting</small>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - RISK DASHBOARD */}
          <div className="hero-dashboard">
            <div className="dashboard-top">
              <div>
                <span className="dashboard-label">LIVE FLOOD MONITOR</span>
                <h3>Risk Intelligence</h3>
              </div>

              <div className="live-indicator">
                <span></span>
                LIVE
              </div>
            </div>

            <div className="risk-main-card">
              <div className="risk-main-icon">🌊</div>

              <div className="risk-main-info">
                <span>Current Flood Risk</span>
                <h2>Monitoring</h2>
                <p>
                  <span className="green-dot"></span>
                  System actively monitoring
                </p>
              </div>
            </div>

            <div className="location-card">
              <span className="location-icon">📍</span>
              <div>
                <small>Monitoring Location</small>
                <strong>Manafwa River Basin</strong>
              </div>
            </div>

            <div className="dashboard-stats">
              <div className="dashboard-stat">
                <span className="stat-icon">🌧️</span>
                <div>
                  <small>Rainfall</small>
                  <strong>--</strong>
                  <em>mm</em>
                </div>
              </div>

              <div className="dashboard-stat">
                <span className="stat-icon">🌊</span>
                <div>
                  <small>River Level</small>
                  <strong>--</strong>
                  <em>m</em>
                </div>
              </div>

              <div className="dashboard-stat">
                <span className="stat-icon">🚨</span>
                <div>
                  <small>Alerts</small>
                  <strong>--</strong>
                  <em>active</em>
                </div>
              </div>

              <div className="dashboard-stat">
                <span className="stat-icon">🤝</span>
                <div>
                  <small>Reports</small>
                  <strong>24</strong>
                  <em>community</em>
                </div>
              </div>
            </div>

            <div className="ai-status">
              <div className="ai-icon">🤖</div>

              <div>
                <strong>AI Prediction Engine</strong>
                <span>XGBoost model ready for risk analysis</span>
              </div>

              <span className="ai-active">ACTIVE</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          EMERGENCY BANNER
      ========================= */}
      <section className="alert-banner-wrapper">
        <div className="alert-banner">
          <div className="alert-symbol">🚨</div>

          <div className="alert-content">
            <span>EARLY WARNING SYSTEM</span>
            <strong>Stay informed. Act early. Protect your community.</strong>
          </div>

          <a href="/alerts" className="alert-button">
            View Alerts →
          </a>
        </div>
      </section>

      {/* =========================
          IMPACT STATS
      ========================= */}
      <section className="impact-section">
        <div className="section-heading">
          <span>GREENSHIELD AT A GLANCE</span>

          <h2>Turning Information Into Early Action</h2>

          <p>
            Green Shield brings together technology, environmental data,
            artificial intelligence, and community knowledge.
          </p>
        </div>

        <div className="impact-grid">
          <div className="impact-card">
            <div className="impact-icon">📍</div>
            <strong>12+</strong>
            <span>Areas Monitored</span>
          </div>

          <div className="impact-card">
            <div className="impact-icon">🤝</div>
            <strong>24</strong>
            <span>Community Reports</span>
          </div>

          <div className="impact-card">
            <div className="impact-icon">🤖</div>
            <strong>AI</strong>
            <span>Flood Risk Prediction</span>
          </div>

          <div className="impact-card">
            <div className="impact-icon">🚨</div>
            <strong>24/7</strong>
            <span>Risk Monitoring</span>
          </div>
        </div>
      </section>

      {/* =========================
          HOW IT WORKS
      ========================= */}
      <section className="how-section">
        <div className="section-heading">
          <span>HOW GREENSHIELD WORKS</span>

          <h2>From Data to Life-Saving Action</h2>

          <p>
            Four connected steps help transform flood information into
            meaningful early action.
          </p>
        </div>

        <div className="process-grid">
          <div className="process-card">
            <div className="process-number">01</div>
            <div className="process-icon">🌧️</div>

            <h3>Monitor</h3>

            <p>
              Collect rainfall, river, weather, forecast and environmental
              information.
            </p>

            <span className="process-tag">DATA</span>
          </div>

          <div className="process-card">
            <div className="process-number">02</div>
            <div className="process-icon">🤖</div>

            <h3>Predict</h3>

            <p>
              AI and machine learning analyze changing conditions to identify
              potential flood risk.
            </p>

            <span className="process-tag">AI / XGBOOST</span>
          </div>

          <div className="process-card">
            <div className="process-number">03</div>
            <div className="process-icon">🚨</div>

            <h3>Alert</h3>

            <p>
              Provide localized warnings that help communities understand the
              level of risk.
            </p>

            <span className="process-tag">EARLY WARNING</span>
          </div>

          <div className="process-card">
            <div className="process-number">04</div>
            <div className="process-icon">🤝</div>

            <h3>Respond</h3>

            <p>
              Communities report flooding and take early action to reduce
              disaster impacts.
            </p>

            <span className="process-tag">COMMUNITY</span>
          </div>
        </div>
      </section>
      {/* =========================
          Manafwa River Basin (Respond Page)
      ========================= */}
      <section className="home-study-area">
        <div className="home-study-area-container">
          <div className="home-study-area-content">
            <span className="home-study-area-badge">
              🌊 GREEN SHIELD STUDY AREA
            </span>

            <h2>Manafwa River Basin</h2>

            <p>
              Green Shield focuses on localized flood risk monitoring in the
              Manafwa River Basin. The system is designed to provide communities
              with timely flood information, localized risk assessment, and
              early warnings.
            </p>

            <div className="home-study-area-points">
              <div>
                <strong>📍 Localized Monitoring</strong>
                <span>
                  Focus on flood-prone locations within the study area.
                </span>
              </div>

              <div>
                <strong>⚠️ Early Warning</strong>
                <span>
                  Support communities to receive and act on flood alerts.
                </span>
              </div>

              <div>
                <strong>🗺️ Flood Risk Mapping</strong>
                <span>
                  Visualize areas with different levels of flood risk.
                </span>
              </div>
            </div>

            <button
              className="home-study-area-button"
              onClick={() => (window.location.href = "/manafwaBasin")}
            >
              🌊 ManafwaBasin River
            </button>
          </div>

          <div className="home-study-area-visual">
            <div className="home-basin-card">
              <span>🌊</span>
              <h3>Manafwa River Basin</h3>
              <p>GreenShield Localized Study Area</p>
            </div>
          </div>
        </div>
      </section>
      {/* =========================
          AI SECTION
      ========================= */}
      <section className="ai-section">
        <div className="ai-container">
          <div className="ai-visual">
            <div className="ai-glow"></div>

            <div className="ai-model-card">
              <div className="model-header">
                <span>🤖</span>
                <div>
                  <small>FLOOD PREDICTION ENGINE</small>
                  <strong>XGBoost AI Model</strong>
                </div>
              </div>

              <div className="prediction-bars">
                <div className="prediction-row">
                  <span>Normal</span>
                  <div className="prediction-bar">
                    <span style={{ width: "72%" }}></span>
                  </div>
                  <strong>72%</strong>
                </div>

                <div className="prediction-row">
                  <span>Mild</span>
                  <div className="prediction-bar">
                    <span style={{ width: "42%" }}></span>
                  </div>
                  <strong>42%</strong>
                </div>

                <div className="prediction-row">
                  <span>Advanced</span>
                  <div className="prediction-bar">
                    <span style={{ width: "28%" }}></span>
                  </div>
                  <strong>28%</strong>
                </div>

                <div className="prediction-row">
                  <span>Extreme</span>
                  <div className="prediction-bar">
                    <span style={{ width: "12%" }}></span>
                  </div>
                  <strong>12%</strong>
                </div>
              </div>

              <div className="model-footer">
                <span>● Model Ready</span>
                <span>Risk Classification: 4 Levels</span>
              </div>
            </div>
          </div>

          <div className="ai-content">
            <span className="section-mini-title">
              INTELLIGENT FLOOD PREDICTION
            </span>

            <h2>
              Predict Risk Before
              <span> Disaster Happens.</span>
            </h2>

            <p>
              Green Shield uses machine learning to analyze flood-related
              environmental patterns and classify potential flood risk. This
              helps authorities and communities move from reactive response to
              proactive preparedness.
            </p>

            <div className="ai-features">
              <div>
                <span>✓</span>
                <p>
                  <strong>Risk Classification</strong>
                  <small>Normal, Mild, Advanced and Extreme</small>
                </p>
              </div>

              <div>
                <span>✓</span>
                <p>
                  <strong>Data-Driven Decisions</strong>
                  <small>Supports faster emergency planning</small>
                </p>
              </div>

              <div>
                <span>✓</span>
                <p>
                  <strong>Early Action</strong>
                  <small>Helps communities prepare before flooding</small>
                </p>
              </div>
            </div>

            <a href="/flood-map" className="ai-button">
              Explore Flood Risk →
            </a>
          </div>
        </div>
      </section>

      {/* =========================
          COMMUNITY REPORTING
      ========================= */}
      <section className="community-section">
        <div className="community-container">
          <div className="community-content">
            <span className="section-mini-title">
              COMMUNITY-POWERED EARLY WARNING
            </span>

            <h2>
              Your Report Could
              <span> Help Save Lives.</span>
            </h2>

            <p>
              Communities are often the first to see when flooding begins.
              Report flood conditions, share local information, and help improve
              situational awareness.
            </p>

            <a href="/report-flood" className="community-button">
              🚨 Report a Flood
            </a>
          </div>

          <div className="qr-card">
            <div className="qr-header">
              <span>📱</span>
              <div>
                <strong>Quick Flood Reporting</strong>
                <small>Scan to access FloodEWS</small>
              </div>
            </div>

            <div className="qr-code-wrapper">
              <FloodQRCode />
            </div>

            <p>
              Scan the QR code to quickly access the flood reporting system.
            </p>
          </div>
        </div>
      </section>

      {/* =========================
          FINAL CTA
      ========================= */}
      <section className="final-cta">
        <div>
          <span>TOGETHER, WE CAN BUILD RESILIENCE</span>

          <h2>Be Prepared Before the Water Rises.</h2>

          <p>
            Access flood information, receive warnings and help your community
            respond earlier.
          </p>
        </div>

        <div className="final-cta-buttons">
          <a href="/flood-map">View Flood Map</a>

          <a href="/report-flood">Report Flood</a>
        </div>
      </section>
    </div>
  );
}

export default Home;
