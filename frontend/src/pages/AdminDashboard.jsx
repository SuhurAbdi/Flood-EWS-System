import { useEffect, useState } from "react";
import { getAdminDashboard, getAdminReports } from "../services/api";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  // Load dashboard data
  const loadDashboard = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("You are not logged in.");
        return;
      }

      const data = await getAdminDashboard(token);

      setDashboard(data);
    } catch (err) {
      console.error("Dashboard error:", err);
      setError("Unable to load admin dashboard.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Load dashboard when page opens
  useEffect(() => {
    loadDashboard();
  }, []);

  // First loading
  if (loading) {
    return <div className="dashboard-loading">Loading Admin Dashboard...</div>;
  }

  // Error
  if (error && !dashboard) {
    return (
      <div className="admin-dashboard">
        <div className="dashboard-error">{error}</div>

        <button
          className="dashboard-button refresh-button"
          onClick={() => loadDashboard(true)}
        >
          🔄 Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}

      <div className="dashboard-header">
        <div>
          <h1>🌊 Flood EWS Admin Dashboard</h1>

          <p>Monitor and manage flood reports and system users.</p>
        </div>

        {/* REAL REFRESH BUTTON */}

        <button
          className="register-button"
          onClick={() => loadDashboard(true)}
          disabled={refreshing}
        >
          {refreshing ? "⟳ Refreshing..." : "🔄 Refresh"}
        </button>
      </div>

      {/* Error message */}

      {error && <div className="dashboard-error">{error}</div>}

      {/* Statistics */}

      <div className="dashboard-cards">
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-icon users-icon">👥</div>
          </div>

          <h3>Total Users</h3>

          <h2>{dashboard?.total_users ?? 0}</h2>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-icon reports-icon">🌊</div>
          </div>

          <h3>Total Reports</h3>

          <h2>{dashboard?.total_reports ?? 0}</h2>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-icon pending-icon">⏳</div>
          </div>

          <h3>Pending</h3>

          <h2>{dashboard?.pending_reports ?? 0}</h2>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-icon verified-icon">✅</div>
          </div>

          <h3>Verified</h3>

          <h2>{dashboard?.verified_reports ?? 0}</h2>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-icon rejected-icon">❌</div>
          </div>

          <h3>Rejected</h3>

          <h2>{dashboard?.rejected_reports ?? 0}</h2>
        </div>
      </div>

      {/* Main Content */}

      <div className="dashboard-content">
        <div className="dashboard-panel">
          <h2>Recent Flood Reports</h2>

          <table className="report-table">
            <thead>
              <tr>
                <th>Report</th>
                <th>Location</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Flood Report #001</td>

                <td>Hargeisa</td>

                <td>
                  <span className="status pending">Pending</span>
                </td>

                <td>Today</td>
              </tr>

              <tr>
                <td>Flood Report #002</td>

                <td>Gabiley</td>

                <td>
                  <span className="status verified">Verified</span>
                </td>

                <td>Yesterday</td>
              </tr>

              <tr>
                <td>Flood Report #003</td>

                <td>Berbera</td>

                <td>
                  <span className="status rejected">Rejected</span>
                </td>

                <td>2 days ago</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* System Summary */}

        <div className="dashboard-panel">
          <h2>System Summary</h2>

          <p>👥 Users: {dashboard?.total_users ?? 0}</p>

          <p>🌊 Reports: {dashboard?.total_reports ?? 0}</p>

          <p>⏳ Pending: {dashboard?.pending_reports ?? 0}</p>

          <p>✅ Verified: {dashboard?.verified_reports ?? 0}</p>

          <p>❌ Rejected: {dashboard?.rejected_reports ?? 0}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
