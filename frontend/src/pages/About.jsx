import PageHeader from "../components/PageHeader";
import "../App.css";

function About() {
  return (
    <div className="about-page">
      {/* =========================================
          PAGE HEADER
      ========================================= */}
      <PageHeader
        title="About Green Shield System"
        description="Building a future where communities have the information, tools, and confidence to act before floods become disasters."
      />

      {/* =========================================
          INTRODUCTION
      ========================================= */}
      <section className="about-story-section">
        <div className="about-story-container">
          <div className="about-story-label">ABOUT THE SYSTEM</div>

          <h2>
            Early warning should lead to
            <span> early action.</span>
          </h2>

          <p className="about-story-lead">
            Green Shield is a community-focused flood early warning platform
            that connects data, technology, and local knowledge to support
            communities before, during, and after flood events.
          </p>

          <div className="about-story-line"></div>

          <p>
            Flooding can develop quickly, but the impacts can last much longer.
            Communities need timely information that is easy to understand and
            relevant to their location. FloodEWS was designed around this need.
          </p>

          <p>
            The platform brings together flood risk information, forecasting,
            alerts, mapping, and community observations to create a stronger
            connection between early warning information and action on the
            ground.
          </p>
        </div>
      </section>

      {/* =========================================
          THE CHALLENGE
      ========================================= */}
      <section className="about-challenge-section">
        <div className="about-challenge-container">
          <div className="about-challenge-content">
            <span className="about-eyebrow">THE CHALLENGE</span>

            <h2>
              When information does not reach people, risk becomes greater.
            </h2>

            <p>
              Flood risk is not only a question of whether a flood will happen.
              It is also about whether people receive useful information early
              enough to prepare.
            </p>

            <p>
              Forecasts and environmental data can provide valuable signals, but
              communities also need localized warnings, understandable risk
              levels, and a way to communicate what they are experiencing.
            </p>
          </div>

          <div className="about-challenge-visual">
            <div className="about-risk-box">
              <div className="about-risk-number">01</div>

              <h3>Information</h3>

              <p>Flood forecasts and environmental observations.</p>
            </div>

            <div className="about-risk-arrow">↓</div>

            <div className="about-risk-box about-risk-active">
              <div className="about-risk-number">02</div>

              <h3>Understanding</h3>

              <p>Clear and localized flood risk information.</p>
            </div>

            <div className="about-risk-arrow">↓</div>

            <div className="about-risk-box">
              <div className="about-risk-number">03</div>

              <h3>Action</h3>

              <p>Communities prepare and respond earlier.</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          OUR APPROACH
      ========================================= */}
      <section className="about-approach-section">
        <div className="about-approach-header">
          <span className="about-eyebrow">OUR APPROACH</span>

          <h2>Connecting the pieces of early warning</h2>

          <p>
            Green Shield is built around a simple principle: useful information
            should become useful action.
          </p>
        </div>

        <div className="about-approach-grid">
          <div className="about-approach-item">
            <div className="about-approach-icon">📊</div>

            <span>01</span>

            <h3>Data</h3>

            <p>
              Use relevant environmental and flood information to understand
              changing conditions.
            </p>
          </div>

          <div className="about-approach-item">
            <div className="about-approach-icon">🧠</div>

            <span>02</span>

            <h3>Intelligence</h3>

            <p>
              Apply analytical and AI-supported approaches to help identify
              potential flood risks.
            </p>
          </div>

          <div className="about-approach-item">
            <div className="about-approach-icon">📍</div>

            <span>03</span>

            <h3>Local Context</h3>

            <p>
              Connect broader information with local conditions and observations
              from communities.
            </p>
          </div>

          <div className="about-approach-item">
            <div className="about-approach-icon">🤝</div>

            <span>04</span>

            <h3>Community</h3>

            <p>
              Give communities a role in reporting, verifying, understanding,
              and responding to flood risks.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          MISSION AND VISION
      ========================================= */}
      <section className="about-mission-section">
        <div className="about-mission-container">
          <div className="about-mission-block">
            <span className="about-eyebrow">OUR MISSION</span>

            <h2>
              Make flood risk information accessible, understandable, and
              actionable.
            </h2>

            <p>
              Green Shield aims to support communities and stakeholders with
              timely information that can strengthen preparedness, early action,
              and disaster risk reduction.
            </p>
          </div>

          <div className="about-mission-divider"></div>

          <div className="about-mission-block">
            <span className="about-eyebrow">OUR VISION</span>

            <h2>Communities that are informed, prepared, and resilient.</h2>

            <p>
              We envision a future where technology and local knowledge work
              together so that people can better understand flood risks and take
              action before hazards become disasters.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          WHO FLOODEWS SERVES
      ========================================= */}
      <section className="about-community-section">
        <div className="about-community-container">
          <div className="about-community-heading">
            <span className="about-eyebrow">WHO WE SUPPORT</span>

            <h2>Designed around the people who need early information</h2>
          </div>

          <div className="about-community-list">
            <div className="about-community-item">
              <span className="about-community-number">01</span>

              <div>
                <h3>Communities</h3>

                <p>
                  Access understandable flood risk information and report
                  conditions from the ground.
                </p>
              </div>
            </div>

            <div className="about-community-item">
              <span className="about-community-number">02</span>

              <div>
                <h3>Local Authorities</h3>

                <p>
                  Support preparedness, monitoring, coordination, and informed
                  decision-making.
                </p>
              </div>
            </div>

            <div className="about-community-item">
              <span className="about-community-number">03</span>

              <div>
                <h3>Disaster Response Actors</h3>

                <p>
                  Provide another source of localized information for
                  preparedness and response activities.
                </p>
              </div>
            </div>

            <div className="about-community-item">
              <span className="about-community-number">04</span>

              <div>
                <h3>Researchers & Data Users</h3>

                <p>
                  Support the use of flood observations and information for
                  learning and improvement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          WHAT MAKES FLOODEWS DIFFERENT
      ========================================= */}
      <section className="about-difference-section">
        <div className="about-difference-container">
          <div className="about-difference-text">
            <span className="about-eyebrow">WHY GREEN SHIELD</span>

            <h2>More than a warning. A connection between data and people.</h2>
          </div>

          <div className="about-difference-points">
            <div>
              <strong>Local</strong>

              <p>
                Information designed to be meaningful at the community level.
              </p>
            </div>

            <div>
              <strong>Connected</strong>

              <p>
                Forecasts, alerts, maps, and community reports work together.
              </p>
            </div>

            <div>
              <strong>Action-oriented</strong>

              <p>
                The purpose of early warning is to help people make decisions
                before impacts occur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          CLOSING MESSAGE
      ========================================= */}
      <section className="about-final-section">
        <div className="about-final-box">
          <span>GREEN SHIELD SYSTEM</span>

          <h2>Better information. Earlier action. Stronger communities.</h2>

          <p>
            Green Shield brings technology, data, and community knowledge
            together to strengthen flood preparedness and resilience.
          </p>

          <div className="about-final-line"></div>

          <strong>Know the Risk. Act Early. Stay Safe.</strong>
        </div>
      </section>
    </div>
  );
}

export default About;
