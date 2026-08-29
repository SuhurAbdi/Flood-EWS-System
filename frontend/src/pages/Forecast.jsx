import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { getMyFloodReports } from "../services/api";

function Forecast() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================================================
  // LOAD FLOOD REPORT FROM DATABASE
  // ============================================================

  useEffect(() => {
    async function loadFloodReport() {
      try {
        setLoading(true);
        setError("");

        const result = await getMyFloodReports();

        console.log("Flood reports from database:", result);

        // Laravel returns:
        // {
        //   success: true,
        //   data: [...]
        // }

        if (result?.data && result.data.length > 0) {
          // Show the newest report
          setReport(result.data[0]);
        } else {
          setReport(null);
        }
      } catch (err) {
        console.error("Forecast error:", err);

        setError(err.message || "Unable to load flood report.");
      } finally {
        setLoading(false);
      }
    }

    loadFloodReport();
  }, []);

  // ============================================================
  // RISK ICON
  // ============================================================

  function getRiskIcon(risk) {
    const value = String(risk || "").toLowerCase();

    if (value === "normal") {
      return "🟢";
    }

    if (value === "medium" || value === "mild" || value === "moderate") {
      return "🟠";
    }

    if (value === "very risk" || value === "extreme" || value === "severe") {
      return "🔴";
    }

    return "⚪";
  }

  // ============================================================
  // RISK CSS CLASS
  // ============================================================

  function getRiskClass(risk) {
    const value = String(risk || "").toLowerCase();

    if (value === "normal") {
      return "risk-normal";
    }

    if (value === "medium" || value === "mild" || value === "moderate") {
      return "risk-medium";
    }

    if (value === "very risk" || value === "extreme" || value === "severe") {
      return "risk-very-risk";
    }

    return "risk-unknown";
  }

  // ============================================================
  // DATE
  // ============================================================

  function formatDate(date) {
    if (!date) {
      return "Date unavailable";
    }

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div>
        <PageHeader
          title="Flood Forecast"
          description="View the latest flood risk forecast."
        />

        <section className="forecast-page">
          <div className="forecast-card">
            <h2>🌊 Flood Forecast</h2>

            <p>Loading flood report...</p>
          </div>
        </section>
      </div>
    );
  }

  // ============================================================
  // ERROR
  // ============================================================

  if (error) {
    return (
      <div>
        <PageHeader
          title="Flood Forecast"
          description="View the latest flood risk forecast."
        />

        <section className="forecast-page">
          <div className="forecast-card">
            <div className="error-message">❌ {error}</div>
          </div>
        </section>
      </div>
    );
  }

  // ============================================================
  // NO REPORT
  // ============================================================

  if (!report) {
    return (
      <div>
        <PageHeader
          title="Flood Forecast"
          description="View the latest flood risk forecast."
        />

        <section className="forecast-page">
          <div className="forecast-card">
            <div className="forecast-header">
              <div className="forecast-icon">🌊</div>

              <div>
                <h2>Flood Forecast</h2>

                <p>Manafwa Flood Early Warning</p>
              </div>
            </div>

            <div className="forecast-note">
              ℹ️ No flood report has been submitted yet.
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ============================================================
  // DATABASE REPORT
  // ============================================================

  const risk = report.risk_level;

  return (
    <div>
      <PageHeader
        title="Flood Forecast"
        description="View the latest flood risk forecast from your flood report."
      />

      <section className="forecast-page">
        <div className="forecast-card">
          {/* HEADER */}

          <div className="forecast-header">
            <div className="forecast-icon">🌊</div>

            <div>
              <h2>Manafwa Flood Early Warning</h2>

              <p>Latest Flood Forecast</p>
            </div>
          </div>

          {/* DATE */}

          <div className="forecast-info">
            <p>
              <strong>📅 Forecast Date</strong>
            </p>

            <div className="forecast-value">
              {formatDate(report.created_at)}
            </div>
          </div>

          {/* LOCATION */}

          <div className="forecast-info">
            <p>
              <strong>📍 Flood Location</strong>
            </p>

            <div className="forecast-value">
              {report.location || "Not available"}
            </div>
          </div>

          {/* RISK LEVEL */}

          <div className={`forecast-risk ${getRiskClass(risk)}`}>
            <div className="forecast-risk-icon">{getRiskIcon(risk)}</div>

            <div>
              <p>RISK LEVEL</p>

              <h2>{risk || "Pending"}</h2>
            </div>
          </div>

          {/* SEVERITY */}

          <div className="forecast-info">
            <p>
              <strong>⚠️ Reported Severity</strong>
            </p>

            <div className="forecast-value">
              {report.severity
                ? report.severity.charAt(0).toUpperCase() +
                  report.severity.slice(1)
                : "Not available"}
            </div>
          </div>

          {/* FLOOD OCCURRED */}

          <div className="forecast-info">
            <p>
              <strong>🌊 Flood Occurred</strong>
            </p>

            <div className="forecast-value">
              {report.flood_occurred ? "Yes" : "No"}
            </div>
          </div>

          {/* GPS */}

          <div className="forecast-info">
            <p>
              <strong>📍 GPS Coordinates</strong>
            </p>

            <div className="forecast-value">
              {report.latitude && report.longitude
                ? `${report.latitude}, ${report.longitude}`
                : "GPS not available"}
            </div>
          </div>

          {/* DESCRIPTION */}

          {report.description && (
            <div className="forecast-info">
              <p>
                <strong>📝 Report Description</strong>
              </p>

              <div className="forecast-value">{report.description}</div>
            </div>
          )}

          {/* STATUS */}

          <div className="forecast-info">
            <p>
              <strong>📋 Report Status</strong>
            </p>

            <div className="forecast-value">{report.status || "Pending"}</div>
          </div>

          {/* INFORMATION */}

          <div className="forecast-note">
            ℹ️ This forecast is based on the latest flood report saved in the
            database.
          </div>
        </div>
      </section>
    </div>
  );
}

export default Forecast;
