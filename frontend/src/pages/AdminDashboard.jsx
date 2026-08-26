import { useEffect, useState } from "react";
import {
  getAdminDashboard,
  getAdminReports,
  getAdminUsers,
} from "../services/api";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [reports, setReports] = useState([]);
  const [showReports, setShowReports] = useState(false);
  const [reportsLoading, setReportsLoading] = useState(false);
  const loadAllReports = async () => {
    try {
      setReportsLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("You are not logged in.");
        return;
      }

      const data = await getAdminReports(token);

      setReports(data.reports || []);
      setShowReports(true);
    } catch (err) {
      console.error("Reports error:", err);
      setError("Unable to load flood reports.");
    } finally {
      setReportsLoading(false);
    }
  };
  // Add User State

  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [usersLoading, setUsersLoading] = useState(false);
  const loadAllUsers = async () => {
    try {
      setUsersLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("You are not logged in.");
        return;
      }

      const data = await getAdminUsers(token);

      setUsers(data.users || []);
      setShowUsers(true);
    } catch (err) {
      console.error("Users error:", err);
      setError("Unable to load users.");
    } finally {
      setUsersLoading(false);
    }
  };
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
        <div className="stat-card clickable-card" onClick={loadAllUsers}>
          <div className="stat-card-header">
            <div className="stat-icon users-icon">👥</div>
          </div>

          <h3>Total Users</h3>

          <h2>{dashboard?.total_users ?? 0}</h2>
          <p className="click-hint"></p>
        </div>

        <div className="stat-card clickable-card" onClick={loadAllReports}>
          <div className="stat-card-header">
            <div className="stat-icon reports-icon">🌊</div>
          </div>

          <h3>Total Reports</h3>

          <h2>{dashboard?.total_reports ?? 0}</h2>

          <p className="click-hint"></p>
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

      {/* Show Flood Reports */}
      {showReports && (
        <div className="dashboard-panel all-reports-panel">
          <div className="reports-header">
            <div>
              <h2>🌊 All Flood Reports</h2>

              <p>Total reports: {reports.length}</p>
            </div>

            <button
              className="dashboard-button"
              onClick={() => setShowReports(false)}
            >
              ✕ Close
            </button>
          </div>

          {reportsLoading ? (
            <p>Loading flood reports...</p>
          ) : reports.length === 0 ? (
            <p>No flood reports found.</p>
          ) : (
            <div className="table-container">
              <table className="report-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Description</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {reports.map((report) => (
                    <tr key={report.id}>
                      <td>#{report.id}</td>

                      <td>{report.location || "N/A"}</td>

                      <td>
                        <span className={`status ${report.status}`}>
                          {report.status}
                        </span>
                      </td>

                      <td>{report.description || "No description"}</td>

                      <td>
                        {report.created_at
                          ? new Date(report.created_at).toLocaleDateString()
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      {/* Shows Users No Register */}
      {showUsers && (
        <div className="dashboard-panel all-reports-panel">
          <div className="reports-header">
            <div>
              <h2>👥 All Registered Users</h2>

              <p>Total users: {users.length}</p>
            </div>

            <button
              className="dashboard-button"
              onClick={() => setShowUsers(false)}
            >
              ✕ Close
            </button>
          </div>

          {usersLoading ? (
            <p>Loading users...</p>
          ) : users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <div className="table-container">
              <table className="report-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Registered</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>#{user.id}</td>

                      <td>{user.name}</td>

                      <td>{user.email}</td>

                      <td>
                        {user.created_at
                          ? new Date(user.created_at).toLocaleDateString()
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <div className="dashboard-content">
        <div className="dashboard-panel">
          <h2>Recent Flood Reports</h2>

          <table className="report-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Location & GPS</th>
                <th>Photo</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.reports && dashboard.reports.length > 0 ? (
                dashboard.reports.map((report) => (
                  <tr key={report.id}>
                    <td>#{report.id}</td>

                    <td>
                      <strong>{report.location}</strong>

                      <div className="gps-location">
                        📍 {report.latitude}, {report.longitude}
                      </div>
                    </td>

                    <td>
                      {report.photo ? (
                        <img
                          src={`http://127.0.0.1:8000/storage/${report.photo}`}
                          alt="Flood"
                          style={{
                            width: "100%",
                            maxWidth: "90px",
                            maxHeight: "80px",
                            objectFit: "cover",
                            borderRadius: "10px",
                          }}
                          onClick={() =>
                            window.open(
                              `http://127.0.0.1:8000/storage/${report.photo}`,
                              "_blank",
                            )
                          }
                        />
                      ) : (
                        <span className="no-photo">No photo</span>
                      )}
                    </td>

                    <td>
                      <span className={`status ${report.status}`}>
                        {report.status}
                      </span>
                    </td>

                    <td>
                      {report.created_at
                        ? new Date(report.created_at).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "center",
                      padding: "30px",
                    }}
                  >
                    No flood reports found.
                  </td>
                </tr>
              )}
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
