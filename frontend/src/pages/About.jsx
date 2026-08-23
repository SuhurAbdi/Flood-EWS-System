import PageHeader from "../components/PageHeader";

import "../App.css";
function About() {
  return (
    <div>
      <PageHeader
        title="About FloodEWS"
        description="Using technology, data, and community knowledge to support better flood preparedness."
      />

      <section className="content-section">
        <div className="content-grid">
          <div className="content-card">
            <span className="section-label">OUR MISSION</span>

            <h2>Helping communities act before floods become disasters.</h2>

            <p>
              FloodEWS is a community-focused flood early warning system
              designed to connect flood forecasts with local communities.
            </p>

            <p>
              The system provides localized risk information, flood alerts, and
              a way for communities to report what actually happens on the
              ground.
            </p>
          </div>

          <div className="about-visual">
            <div className="about-icon">🌍</div>

            <h3>Community + Technology</h3>

            <p>
              Combining digital technology with local knowledge can support
              stronger disaster preparedness.
            </p>
          </div>
        </div>
      </section>

      <section className="content-section light-section">
        <div className="section-heading">
          <span>HOW IT WORKS</span>

          <h2>From Forecast to Community Action</h2>
        </div>

        <div className="process-grid">
          <div className="process-card">
            <span>01</span>
            <h3>Monitor</h3>
            <p>
              Collect flood forecasts and relevant environmental information.
            </p>
          </div>

          <div className="process-card">
            <span>02</span>
            <h3>Assess</h3>
            <p>
              Translate forecast information into understandable local risk
              levels.
            </p>
          </div>

          <div className="process-card">
            <span>03</span>
            <h3>Alert</h3>
            <p>Provide communities with localized flood warnings.</p>
          </div>

          <div className="process-card">
            <span>04</span>
            <h3>Learn</h3>
            <p>
              Use verified community reports to improve local prediction
              accuracy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
