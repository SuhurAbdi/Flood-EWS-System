import { useEffect, useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import AlertRobot from "../pages/AlertRobot";
import { getFloodAlerts } from "../services/api";

import flood1 from "../images/flood1.png";
import flood2 from "../images/flood2.png";
import flood3 from "../images/flood3.png";
import flood4 from "../images/flood4.png";
import flood5 from "../images/flood5.png";

const floodImages = [
  {
    image: flood1,
    title: "Flood Risk Monitoring",
    description:
      "FloodEWS monitors flood conditions and provides early warnings to communities.",
  },
  {
    image: flood2,
    title: "Community Flood Warning",
    description:
      "Stay alert and follow official warnings when flood risks increase.",
  },
  {
    image: flood3,
    title: "Flood Emergency",
    description:
      "Move to a safe location when an extreme flood warning is issued.",
  },
  {
    image: flood4,
    title: "Stay Safe",
    description:
      "Know the risk, act early and protect your family and community.",
  },
  {
    image: flood5,
    title: "Community Preparedness",
    description:
      "Prepared communities can respond faster when flood conditions change.",
  },
];

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentSlide, setCurrentSlide] = useState(0);

  /*
   * ==========================================================
   * ROBOT REPORT
   * ==========================================================
   *
   * This stores the latest report submitted from ReportFlood.
   */

  const [robotReport, setRobotReport] = useState(null);

  /*
   * ==========================================================
   * LOAD FLOOD ALERTS
   * ==========================================================
   */

  async function loadAlerts() {
    try {
      setLoading(true);
      setError("");

      const data = await getFloodAlerts();

      console.log("🚨 FloodEWS alerts received:", data);

      setAlerts(data?.alerts || []);
    } catch (error) {
      console.error("Flood alerts error:", error);
      setError("Unable to load flood alerts.");
    } finally {
      setLoading(false);
    }
  }

  /*
   * ==========================================================
   * LOAD LATEST ROBOT REPORT FROM LOCAL STORAGE
   * ==========================================================
   */

  function loadRobotReport() {
    try {
      const savedReport = localStorage.getItem("latestFloodRobotReport");

      if (!savedReport) {
        console.log("🤖 No robot report found.");
        return;
      }

      const parsedReport = JSON.parse(savedReport);

      console.log("🤖 Latest Flood Robot Report:", parsedReport);

      setRobotReport(parsedReport);
    } catch (error) {
      console.error("Unable to read robot report:", error);
    }
  }

  /*
   * ==========================================================
   * INITIAL LOAD
   * ==========================================================
   */

  useEffect(() => {
    loadAlerts();

    // Load the latest report immediately
    loadRobotReport();

    /*
     * Listen for new reports submitted from ReportFlood.
     */

    const handleFloodReportUpdate = (event) => {
      console.log("🚨 NEW FLOOD REPORT RECEIVED!");

      /*
       * If ReportFlood sends the report inside
       * CustomEvent.detail, use it immediately.
       */

      if (event?.detail) {
        console.log("🤖 Robot received:", event.detail);

        setRobotReport(event.detail);
      } else {
        /*
         * Otherwise read from localStorage.
         */

        loadRobotReport();
      }

      /*
       * Also refresh backend alerts.
       */

      loadAlerts();
    };

    window.addEventListener("floodReportUpdated", handleFloodReportUpdate);

    /*
     * Cleanup
     */

    return () => {
      window.removeEventListener("floodReportUpdated", handleFloodReportUpdate);
    };
  }, []);

  /*
   * ==========================================================
   * CHECK LOCAL STORAGE WHEN ALERTS PAGE OPENS
   * ==========================================================
   */

  useEffect(() => {
    const reportUpdated = localStorage.getItem("floodReportUpdated");

    if (reportUpdated) {
      console.log("🚨 Recent flood report detected.");

      loadRobotReport();

      loadAlerts();
    }
  }, []);

  /*
   * ==========================================================
   * AUTOMATIC SLIDESHOW
   * ==========================================================
   */

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((previous) =>
        previous === floodImages.length - 1 ? 0 : previous + 1,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  function nextSlide() {
    setCurrentSlide((previous) =>
      previous === floodImages.length - 1 ? 0 : previous + 1,
    );
  }

  function previousSlide() {
    setCurrentSlide((previous) =>
      previous === 0 ? floodImages.length - 1 : previous - 1,
    );
  }

  function goToSlide(index) {
    setCurrentSlide(index);
  }

  /*
   * ==========================================================
   * FLOODEWS → ALERT ROBOT RISK ENGINE
   * ==========================================================
   *
   * Priority:
   *
   * Extreme  = 4
   * Advanced = 3
   * Mild     = 2
   * Normal   = 1
   *
   * IMPORTANT:
   * The newest ReportFlood result gets priority so the robot
   * can react immediately.
   */

  const robotRisk = useMemo(() => {
    /*
     * --------------------------------------------------------
     * 1. USE THE NEWEST REPORT FIRST
     * --------------------------------------------------------
     */

    if (robotReport?.riskLevel) {
      const savedRisk = String(robotReport.riskLevel).toLowerCase();

      if (savedRisk === "extreme") {
        return "Extreme";
      }

      if (savedRisk === "advanced") {
        return "Advanced";
      }

      if (savedRisk === "mild") {
        return "Mild";
      }

      if (savedRisk === "normal") {
        return "Normal";
      }
    }

    /*
     * --------------------------------------------------------
     * 2. OTHERWISE CHECK BACKEND ALERTS
     * --------------------------------------------------------
     */

    if (!alerts || alerts.length === 0) {
      return "Normal";
    }

    let highestRisk = "Normal";
    let highestScore = 1;

    const riskScores = {
      Normal: 1,
      Mild: 2,
      Advanced: 3,
      Extreme: 4,
    };

    alerts.forEach((alert) => {
      const severity = String(alert.severity || "").toLowerCase();

      const riskLevel = String(alert.risk_level || "").toLowerCase();

      let detectedRisk = "Normal";

      /*
       * First use AI/model risk_level.
       */

      if (riskLevel === "extreme") {
        detectedRisk = "Extreme";
      } else if (riskLevel === "advanced") {
        detectedRisk = "Advanced";
      } else if (riskLevel === "mild") {
        detectedRisk = "Mild";
      } else if (severity === "severe") {
        detectedRisk = "Extreme";
      } else if (severity === "moderate") {
        detectedRisk = "Advanced";
      } else if (severity === "mild") {
        detectedRisk = "Mild";
      }

      /*
       * Keep highest risk.
       */

      if (riskScores[detectedRisk] > highestScore) {
        highestRisk = detectedRisk;
        highestScore = riskScores[detectedRisk];
      }
    });

    return highestRisk;
  }, [alerts, robotReport]);

  /*
   * ==========================================================
   * ROBOT STATUS TEXT
   * ==========================================================
   */

  const robotSummary = {
    Normal: "FloodEWS is monitoring conditions normally.",

    Mild: "Early warning detected. Continue monitoring conditions.",

    Advanced: "Elevated flood risk detected in the monitored area.",

    Extreme: "Emergency flood risk detected. Immediate attention required.",
  };

  /*
   * ==========================================================
   * PAGE
   * ==========================================================
   */

  return (
    <div className="alerts-page">
      <PageHeader
        title="Flood Alerts Robot"
        description="Stay informed about flood risks in monitored areas."
      />

      <section className="alerts-section">
        {/* ==================================================
            ALERT ROBOT
        ================================================== */}

        <div className="alerts-robot-section">
          <div className="alerts-robot-heading">
            <div>
              <span className="alerts-section-label">
                FLOODEWS INTELLIGENT WARNING SYSTEM
              </span>

              <h2>🤖 Smart Alert Robot</h2>

              <p>{robotSummary[robotRisk]}</p>

              {/* Show latest submitted location */}

              {robotReport?.location && (
                <small>
                  📍 Monitoring: <strong>{robotReport.location}</strong>
                </small>
              )}
            </div>

            <div className="robot-live-indicator">
              <span></span>
              LIVE SYSTEM
            </div>
          </div>

          {/* ==================================================
              ROBOT
          ================================================== */}

          <AlertRobot riskLevel={robotRisk} />
        </div>

        {/* ==================================================
            MAIN ALERT CONTENT
        ================================================== */}

        <div className="alerts-layout">
          {/* ==================================================
              LEFT SIDE — FLOOD ALERTS
          ================================================== */}

          <div className="alerts-main">
            <div className="alerts-header">
              <div>
                <h2>🚨 Current Flood Alerts</h2>

                <p>
                  Monitor the latest flood reports and warnings in monitored
                  areas.
                </p>
              </div>

              <button
                className="register-button"
                onClick={() => {
                  loadAlerts();
                  loadRobotReport();
                }}
                disabled={loading}
              >
                {loading ? "⏳ Loading..." : "🔄 Refresh"}
              </button>
            </div>

            {/* Loading */}

            {loading && (
              <div className="alerts-loading">
                <div className="loading-spinner"></div>
                Loading FloodEWS alerts...
              </div>
            )}

            {/* Error */}

            {error && <div className="alerts-error">❌ {error}</div>}

            {/* No alerts */}

            {!loading && !error && alerts.length === 0 && (
              <div className="no-alerts">
                <div className="no-alerts-icon">✅</div>

                <h3>No Active Flood Alerts</h3>

                <p>
                  There are currently no active flood alerts in monitored areas.
                </p>

                <span className="system-safe">
                  🟢 FloodEWS monitoring is active
                </span>
              </div>
            )}

            {/* Alert list */}

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
                      <span>
                        🌊 Flood Risk: {alert.risk_level || alert.severity}
                      </span>

                      <span>
                        📅 {new Date(alert.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ==================================================
              RIGHT SIDE — FLOOD AWARENESS
          ================================================== */}

          <aside className="flood-alert-slideshow">
            <div className="slideshow-header">
              <span className="slideshow-label">FLOOD AWARENESS</span>

              <h3>Flood Alert Information</h3>

              <p>Stay informed. Act early. Stay safe.</p>
            </div>

            {/* IMAGE */}

            <div className="slideshow-image-container">
              <img
                src={floodImages[currentSlide].image}
                alt={floodImages[currentSlide].title}
                className="slideshow-image"
              />

              <div className="slideshow-overlay">
                <h4>{floodImages[currentSlide].title}</h4>

                <p>{floodImages[currentSlide].description}</p>
              </div>
            </div>

            {/* DOTS */}

            <div className="slideshow-dots">
              {floodImages.map((_, index) => (
                <button
                  key={index}
                  className={
                    currentSlide === index ? "slide-dot active" : "slide-dot"
                  }
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* CONTROLS */}

            <div className="slideshow-controls">
              <button onClick={previousSlide} className="slide-control">
                ← Previous
              </button>

              <span>
                {currentSlide + 1} / {floodImages.length}
              </span>

              <button onClick={nextSlide} className="slide-control">
                Next →
              </button>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

export default Alerts;
