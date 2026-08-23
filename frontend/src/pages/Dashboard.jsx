import { useEffect, useState } from "react";
import { getMyFloodReports } from "../services/api";
import { getAdminDashboard } from "../services/api";

function Dashboard() {
  const [reports, setReports] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    async function loadReports() {
      try {
        const result = await getMyFloodReports();

        setReports(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadReports();
  }, []);

  const totalReports = reports.length;

  const pendingReports = reports.filter(
    (report) => report.status === "pending",
  ).length;

  const verifiedReports = reports.filter(
    (report) => report.status === "verified",
  ).length;

  if (loading) {
    return (
      <div className="dashboard-page">
        <h2>Loading dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <section className="dashboard-header">
        <div>
          <span className="section-label">COMMUNITY DASHBOARD</span>

          <h1>Welcome back, {user?.name || "User"} 👋</h1>

          <p>Monitor your flood reports and community flood information.</p>
        </div>
      </section>

      {error && <div className="error-message">{error}</div>}

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>

          <div>
            <p className="stat-title">MY REPORTS</p>

            <h2>{totalReports}</h2>

            <span>Total submitted reports</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏳</div>

          <div>
            <p className="stat-title">PENDING</p>

            <h2>{pendingReports}</h2>

            <span>Awaiting verification</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>

          <div>
            <p className="stat-title">VERIFIED</p>

            <h2>{verifiedReports}</h2>

            <span>Verified reports</span>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="content-card">
          <h2>My Flood Reports</h2>

          {reports.length === 0 ? (
            <p>You have not submitted any flood reports yet.</p>
          ) : (
            <div className="reports-list">
              {reports.map((report) => (
                <div className="report-item" key={report.id}>
                  <div>
                    <h3>{report.location}</h3>

                    <p>{report.description}</p>

                    <small>Severity: {report.severity}</small>
                  </div>

                  <span className={`status-${report.status}`}>
                    {report.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
