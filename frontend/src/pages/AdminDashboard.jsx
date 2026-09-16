import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAdminDashboard,
  getAdminReports,
  getAdminUsers,
} from "../services/api";
import pages from "../data/pages";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  // --------------------------------------------------
  // MAIN VIEW
  // --------------------------------------------------
  const [activeView, setActiveView] = useState("dashboard");
  const navigate = useNavigate();
  // --------------------------------------------------
  // DATA
  // --------------------------------------------------
  const [dashboard, setDashboard] = useState(null);
  const [reports, setReports] = useState([]);
  const [users, setUsers] = useState([]);

  // --------------------------------------------------
  // UI STATES
  // --------------------------------------------------
  const [loading, setLoading] = useState(true);
  const [reportsLoading, setReportsLoading] = useState(false);
  const [usersLoading, setUsersLoading] = useState(false);
  const [error, setError] = useState("");

  // --------------------------------------------------
  // SETTINGS
  // --------------------------------------------------
  const [showSettings, setShowSettings] = useState(false);

  // --------------------------------------------------
  // TOKEN
  // --------------------------------------------------
  const token = localStorage.getItem("token");

  // --------------------------------------------------
  // LOAD DASHBOARD
  // --------------------------------------------------
  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);
      setError("");

      if (!token) {
        setError("You are not logged in.");
        return;
      }

      const data = await getAdminDashboard(token);

      setDashboard(data);
    } catch (err) {
      console.error("Dashboard error:", err);
      setError(err.message || "Unable to load admin dashboard.");
    } finally {
      setLoading(false);
    }
  }

  // --------------------------------------------------
  // LOAD REPORTS
  // --------------------------------------------------
  async function loadReports() {
    try {
      setReportsLoading(true);
      setError("");

      if (!token) {
        setError("You are not logged in.");
        return;
      }

      const data = await getAdminReports(token);

      /*
       * Supports different Laravel response formats:
       *
       * []
       * { reports: [] }
       * { data: [] }
       * { data: { reports: [] } }
       */

      let reportList = [];

      if (Array.isArray(data)) {
        reportList = data;
      } else if (Array.isArray(data?.reports)) {
        reportList = data.reports;
      } else if (Array.isArray(data?.data)) {
        reportList = data.data;
      } else if (Array.isArray(data?.data?.reports)) {
        reportList = data.data.reports;
      }

      setReports(reportList);
    } catch (err) {
      console.error("Reports error:", err);
      setError(err.message || "Unable to load flood reports.");
    } finally {
      setReportsLoading(false);
    }
  }

  // --------------------------------------------------
  // LOAD USERS
  // --------------------------------------------------
  async function loadUsers() {
    try {
      setUsersLoading(true);
      setError("");

      if (!token) {
        setError("You are not logged in.");
        return;
      }

      const data = await getAdminUsers(token);

      /*
       * Supports different Laravel response formats.
       */

      let userList = [];

      if (Array.isArray(data)) {
        userList = data;
      } else if (Array.isArray(data?.users)) {
        userList = data.users;
      } else if (Array.isArray(data?.data)) {
        userList = data.data;
      } else if (Array.isArray(data?.data?.users)) {
        userList = data.data.users;
      }

      setUsers(userList);
    } catch (err) {
      console.error("Users error:", err);
      setError(err.message || "Unable to load users.");
    } finally {
      setUsersLoading(false);
    }
  }

  // --------------------------------------------------
  // CHANGE VIEW
  // --------------------------------------------------
  function changeView(view) {
    setActiveView(view);
    setShowSettings(false);
    setError("");

    if (view === "reports") {
      loadReports();
    }

    if (view === "users") {
      loadUsers();
    }
  }

  // --------------------------------------------------
  // LOGOUT
  // --------------------------------------------------
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  }

  // --------------------------------------------------
  // SETTINGS
  // --------------------------------------------------
  function openSettings() {
    setActiveView("settings");
    setShowSettings(true);
    setError("");
  }

  // --------------------------------------------------
  // REFRESH
  // --------------------------------------------------
  function handleRefresh() {
    if (activeView === "dashboard") {
      loadDashboard();
    } else if (activeView === "reports") {
      loadReports();
    } else if (activeView === "users") {
      loadUsers();
    }
  }

  // --------------------------------------------------
  // GET DASHBOARD VALUES
  // --------------------------------------------------
  const totalUsers =
    dashboard?.total_users ??
    dashboard?.users_count ??
    dashboard?.users?.length ??
    0;

  const totalReports =
    dashboard?.total_reports ??
    dashboard?.reports_count ??
    dashboard?.reports?.length ??
    0;

  const pendingReports = dashboard?.pending_reports ?? dashboard?.pending ?? 0;

  const verifiedReports =
    dashboard?.verified_reports ?? dashboard?.verified ?? 0;

  const rejectedReports =
    dashboard?.rejected_reports ?? dashboard?.rejected ?? 0;

  const recentReports = dashboard?.reports || dashboard?.recent_reports || [];

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------
  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <h2>Loading FloodEWS...</h2>
        <p>Preparing the administration dashboard.</p>
      </div>
    );
  }

  // --------------------------------------------------
  // MAIN DASHBOARD
  // --------------------------------------------------
  return (
    <div className="admin-layout">
      {/* ==================================================
          SIDEBAR
      ================================================== */}
      <aside className="sidebar">
        {/* LOGO */}
        <div className="sidebar-logo">
          <div className="logo-symbol">🌊</div>

          <div className="logo-text">
            <h2>GreenShield</h2>
            <span>Early Warning System</span>
          </div>
        </div>

        {/* ADMIN PROFILE */}
        <div className="admin-profile">
          <div className="admin-avatar">A</div>

          <div className="admin-profile-info">
            <strong>Administrator</strong>
            <span>System Admin</span>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="sidebar-menu">
          <button
            className={`sidebar-link ${
              activeView === "dashboard" ? "active" : ""
            }`}
            onClick={() => changeView("dashboard")}
          >
            <span className="menu-icon">🏠</span>
            <span className="menu-label">Dashboard</span>
          </button>

          <button
            className={`sidebar-link ${
              activeView === "reports" ? "active" : ""
            }`}
            onClick={() => changeView("reports")}
          >
            <span className="menu-icon">🌊</span>

            <span className="menu-label">Flood Reports</span>
          </button>

          <button
            className={`sidebar-link ${
              activeView === "alerts" ? "active" : ""
            }`}
            onClick={() => changeView("alerts")}
          >
            <span className="menu-icon">🚨</span>
            <span className="menu-label">Alerts</span>
          </button>

          <button
            className={`sidebar-link ${activeView === "users" ? "active" : ""}`}
            onClick={() => changeView("users")}
          >
            <span className="menu-icon">👥</span>
            <span className="menu-label">Users</span>
          </button>

          <button
            className={`sidebar-link ${activeView === "map" ? "active" : ""}`}
            onClick={() => changeView("map")}
          >
            <span className="menu-icon">🗺️</span>
            <span className="menu-label">Flood Map</span>
          </button>

          <button
            className={`sidebar-link ${activeView === "manafwaBasin" ? "active" : ""}`}
            onClick={() => changeView("manafwaBasin")}
          >
            <span className="menu-icon">🌊</span>
            <span className="menu-label">ManafwaBasin</span>
          </button>

          <button
            className={`sidebar-link ${activeView === "pages" ? "active" : ""}`}
            onClick={() => changeView("pages")}
          >
            <span className="menu-icon">📄</span>
            <span className="menu-label">Pages</span>
          </button>
          <div className="menu-section-title">GENERAL</div>

          <button
            className={`sidebar-link ${
              activeView === "settings" ? "active" : ""
            }`}
            onClick={openSettings}
          >
            <span className="menu-icon">⚙️</span>
            <span className="menu-label">Settings</span>
          </button>

          <button className="sidebar-link logout-link" onClick={handleLogout}>
            <span className="menu-icon">🚪</span>
            <span className="menu-label">Logout</span>
          </button>
        </nav>

        {/* SIDEBAR FOOTER */}
        <div className="sidebar-footer">
          <div className="system-status-dot"></div>

          <div>
            <strong>System Online</strong>
            <span>FloodEWS Operational</span>
          </div>
        </div>
      </aside>

      {/* ==================================================
          MAIN AREA
      ================================================== */}
      <main className="dashboard-main">
        {/* HEADER */}
        <header className="dashboard-header">
          <div className="header-left">
            <div className="header-label">ADMINISTRATION</div>

            <h1>
              {activeView === "dashboard" && "Dashboard"}
              {activeView === "reports" && "Flood Reports"}
              {activeView === "users" && "Users"}
              {activeView === "alerts" && "Alerts"}
              {activeView === "map" && "Flood Map"}
              {activeView === "pages" && "Pages"}
              {activeView === "settings" && "Settings"}
            </h1>

            <p>
              {activeView === "dashboard" &&
                "Monitor and manage the Flood Early Warning System."}

              {activeView === "reports" &&
                "Review and manage community flood reports."}

              {activeView === "users" && "Manage registered FloodEWS users."}

              {activeView === "alerts" &&
                "Monitor and manage flood warning alerts."}

              {activeView === "map" &&
                "View flood risk locations and community reports."}

              {activeView === "pages" && "Manage FloodEWS website pages."}

              {activeView === "settings" &&
                "Manage your FloodEWS administration settings."}
            </p>
          </div>

          <div className="header-actions">
            <div className="system-online">
              <span></span>
              System Online
            </div>

            <button className="refresh-button" onClick={handleRefresh}>
              ↻ Refresh
            </button>
          </div>
        </header>

        {/* ERROR */}
        {error && (
          <div className="dashboard-error">
            <strong>⚠️ Error:</strong>
            <span>{error}</span>

            <button onClick={handleRefresh}>Try Again</button>
          </div>
        )}

        {/* ==================================================
            DASHBOARD VIEW
        ================================================== */}
        {activeView === "dashboard" && (
          <div className="dashboard-content">
            {/* STATISTICS */}
            <section className="statistics-grid">
              <button className="stat-card" onClick={() => changeView("users")}>
                <div className="stat-icon green">👥</div>

                <div className="stat-content">
                  <span>Total Users</span>
                  <strong>{totalUsers}</strong>
                  <small>Registered users</small>
                </div>
              </button>

              <button
                className="stat-card"
                onClick={() => changeView("reports")}
              >
                <div className="stat-icon blue">🌊</div>

                <div className="stat-content">
                  <span>Flood Reports</span>
                  <strong>{totalReports}</strong>
                  <small>Total submitted reports</small>
                </div>
              </button>

              <button
                className="stat-card"
                onClick={() => changeView("reports")}
              >
                <div className="stat-icon orange">⏳</div>

                <div className="stat-content">
                  <span>Pending Reports</span>
                  <strong>{pendingReports}</strong>
                  <small>Awaiting verification</small>
                </div>
              </button>

              <button
                className="stat-card"
                onClick={() => changeView("reports")}
              >
                <div className="stat-icon verified">✓</div>

                <div className="stat-content">
                  <span>Verified Reports</span>
                  <strong>{verifiedReports}</strong>
                  <small>Confirmed reports</small>
                </div>
              </button>
            </section>

            {/* OPERATIONAL STATUS */}
            <section className="operational-grid">
              <div className="panel system-panel">
                <div className="panel-header">
                  <div>
                    <span className="panel-label">SYSTEM</span>
                    <h2>Operational Status</h2>
                  </div>

                  <span className="status-online">● Online</span>
                </div>

                <div className="status-list">
                  <div className="status-row">
                    <span>Flood Reporting</span>
                    <strong className="status-good">Operational</strong>
                  </div>

                  <div className="status-row">
                    <span>Early Warning System</span>
                    <strong className="status-good">Operational</strong>
                  </div>

                  <div className="status-row">
                    <span>Database</span>
                    <strong className="status-good">Connected</strong>
                  </div>

                  <div className="status-row">
                    <span>Community Reports</span>
                    <strong className="status-good">Active</strong>
                  </div>
                </div>
              </div>

              <div className="panel report-summary-panel">
                <div className="panel-header">
                  <div>
                    <span className="panel-label">REPORT STATUS</span>

                    <h2>Flood Reports</h2>
                  </div>

                  <button
                    className="view-all-button"
                    onClick={() => changeView("reports")}
                  >
                    View All →
                  </button>
                </div>

                <div className="report-summary-grid">
                  <div className="summary-box pending">
                    <span>Pending</span>
                    <strong>{pendingReports}</strong>
                  </div>

                  <div className="summary-box verified">
                    <span>Verified</span>
                    <strong>{verifiedReports}</strong>
                  </div>

                  <div className="summary-box rejected">
                    <span>Rejected</span>
                    <strong>{rejectedReports}</strong>
                  </div>
                </div>
              </div>
            </section>

            {/* RECENT REPORTS */}
            <section className="panel recent-reports">
              <div className="panel-header">
                <div>
                  <span className="panel-label">COMMUNITY</span>

                  <h2>Recent Flood Reports</h2>
                </div>

                <button
                  className="view-all-button"
                  onClick={() => changeView("reports")}
                >
                  View All Reports →
                </button>
              </div>

              {recentReports.length > 0 ? (
                <div className="recent-report-list">
                  {recentReports.slice(0, 5).map((report) => (
                    <div className="recent-report-item" key={report.id}>
                      <div className="report-number">#{report.id}</div>

                      <div className="report-main-info">
                        <strong>{report.location || "Unknown location"}</strong>

                        <span>
                          📍 {report.latitude ?? "N/A"},{" "}
                          {report.longitude ?? "N/A"}
                        </span>
                      </div>

                      <div className="report-severity">
                        <span
                          className={`severity ${report.severity || "unknown"}`}
                        >
                          {report.severity || "Unknown"}
                        </span>
                      </div>

                      <div className="report-status">
                        <span
                          className={`status ${report.status || "pending"}`}
                        >
                          {report.status || "Pending"}
                        </span>
                      </div>

                      <div className="report-date">
                        {report.created_at
                          ? new Date(report.created_at).toLocaleDateString()
                          : "N/A"}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div>🌊</div>
                  <h3>No flood reports yet</h3>
                  <p>Community flood reports will appear here.</p>
                </div>
              )}
            </section>
          </div>
        )}

        {/* ==================================================
            FLOOD REPORTS VIEW
        ================================================== */}
        {activeView === "reports" && (
          <div className="page-content reports-page">
            <div className="page-title-row">
              <div>
                <span className="panel-label">FLOOD MONITORING</span>

                <h2>All Flood Reports</h2>

                <p>
                  All community flood reports stored in the FloodEWS database.
                </p>
              </div>

              <button className="refresh-button" onClick={loadReports}>
                ↻ Refresh Reports
              </button>
            </div>

            {reportsLoading ? (
              <div className="page-loading">
                <div className="small-spinner"></div>
                <p>Loading flood reports...</p>
              </div>
            ) : reports.length === 0 ? (
              <div className="empty-page">
                <div className="empty-icon">🌊</div>
                <h2>No Flood Reports Found</h2>
                <p>There are currently no flood reports available.</p>
              </div>
            ) : (
              <div className="report-table-container">
                <table className="report-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Location & GPS</th>
                      <th>Severity</th>
                      <th>Description</th>
                      <th>Photo</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {reports.map((report) => {
                      const photoUrl = report.photo
                        ? `http://127.0.0.1:8000/storage/${report.photo}`
                        : null;

                      return (
                        <tr key={report.id}>
                          <td>
                            <strong>#{report.id}</strong>
                          </td>

                          <td>
                            <div className="location-cell">
                              <strong>{report.location || "Unknown"}</strong>

                              <span className="gps-location">
                                📍 {report.latitude ?? "N/A"},{" "}
                                {report.longitude ?? "N/A"}
                              </span>
                            </div>
                          </td>

                          <td>
                            <span
                              className={`severity ${
                                report.severity || "unknown"
                              }`}
                            >
                              {report.severity || "Unknown"}
                            </span>
                          </td>
                          <td>
                            <span className="severity">
                              {" "}
                              {report.description ||
                                "No description provided"}{" "}
                            </span>
                          </td>

                          <td>
                            {photoUrl ? (
                              <img
                                src={photoUrl}
                                alt="Flood report"
                                className="report-photo"
                                onClick={() => window.open(photoUrl, "_blank")}
                              />
                            ) : (
                              <span className="no-photo">No photo</span>
                            )}
                          </td>

                          <td>
                            <span
                              className={`status ${report.status || "pending"}`}
                            >
                              {report.status || "Pending"}
                            </span>
                          </td>

                          <td>
                            {report.created_at
                              ? new Date(report.created_at).toLocaleDateString()
                              : "N/A"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ==================================================
            USERS VIEW
        ================================================== */}
        {activeView === "users" && (
          <div className="page-content users-page">
            <div className="page-title-row">
              <div>
                <span className="panel-label">USER MANAGEMENT</span>

                <h2>Registered Users</h2>

                <p>Users registered in the FloodEWS platform.</p>
              </div>

              <button className="refresh-button" onClick={loadUsers}>
                ↻ Refresh Users
              </button>
            </div>

            {usersLoading ? (
              <div className="page-loading">
                <div className="small-spinner"></div>
                <p>Loading users...</p>
              </div>
            ) : users.length === 0 ? (
              <div className="empty-page">
                <div className="empty-icon">👥</div>
                <h2>No Users Found</h2>
                <p>There are currently no users available.</p>
              </div>
            ) : (
              <div className="users-table-container">
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>User</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Registered</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <strong>#{user.id}</strong>
                        </td>

                        <td>
                          <div className="user-cell">
                            <div className="user-table-avatar">
                              {(user.name || user.email || "U")
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <strong>{user.name || "Unknown User"}</strong>
                          </div>
                        </td>

                        <td>{user.email || "N/A"}</td>

                        <td>
                          <span className="role-badge">
                            {user.role || "User"}
                          </span>
                        </td>

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

        {/* ==================================================
            ALERTS VIEW
        ================================================== */}
        {activeView === "alerts" && (
          <div className="page-content">{navigate("/alerts")}</div>
        )}

        {/* ==================================================
            FLOOD MAP VIEW
        ================================================== */}

        {activeView === "map" && (
          <div className="page-content">{navigate("/flood-map")}</div>
        )}
        {/* ==================================================
            ManafwaBasin VIEW
        ================================================== */}

        {activeView === "manafwaBasin" && (
          <div className="page-content">{navigate("/manafwaBasin")}</div>
        )}
        {/* ==================================================
    PAGES VIEW
================================================== */}
        {activeView === "pages" && (
          <div className="page-content pages-management">
            {/* PAGE HEADER */}
            <div className="pages-top-header">
              <div>
                <span className="panel-label">CONTENT MANAGEMENT</span>

                <h2>FloodEWS Website Pages</h2>

                <p>
                  Manage and monitor the pages available on the FloodEWS
                  platform.
                </p>
              </div>

              <button
                className="add-page-button"
                onClick={() => navigate("/pages")}
              >
                📄 Manage Pages
              </button>
            </div>

            {/* PAGE SUMMARY */}

            {/* WEBSITE PAGES HEADER */}
            <div className="pages-section-header">
              <div>
                <h3>Website Pages</h3>

                <p>All active pages currently available in FloodEWS.</p>
              </div>

              <div className="pages-count">{pages.length} Active</div>
            </div>

            {/* PAGE CARDS */}
            <div className="pages-grid">
              {pages.map((page, index) => (
                <div className="website-page-card" key={index}>
                  {/* CARD TOP */}
                  <div className="website-page-top">
                    <div className="website-page-icon">{page.icon}</div>

                    <span className="page-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* PAGE NAME */}
                  <div className="website-page-info">
                    <div className="page-title-row">
                      <h3>{page.name}</h3>

                      <span className="page-status">Active</span>
                    </div>

                    <p>{page.description || `FloodEWS ${page.name} page.`}</p>

                    {/* ROUTE */}
                    <div className="page-route">
                      <span>↗</span>
                      <span>{page.path}</span>
                    </div>
                  </div>

                  {/* FOOTER */}
                  <div className="website-page-footer">
                    <span className="page-type">FloodEWS Page</span>

                    <button
                      className="view-page-button"
                      onClick={() => navigate(page.path)}
                    >
                      View Page →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================
            SETTINGS VIEW
        ================================================== */}
        {activeView === "settings" && (
          <div className="page-content settings-page">
            <div className="page-title-row">
              <div>
                <span className="panel-label">SYSTEM CONFIGURATION</span>

                <h2>Settings</h2>

                <p>Manage your FloodEWS administration preferences.</p>
              </div>
            </div>

            <div className="settings-grid">
              <div className="settings-card">
                <div className="settings-icon">👤</div>

                <div>
                  <h3>Administrator Account</h3>

                  <p>Manage administrator account information and access.</p>
                </div>

                <button className="settings-button">Manage</button>
              </div>

              <div className="settings-card">
                <div className="settings-icon">🔔</div>

                <div>
                  <h3>Notifications</h3>

                  <p>Configure flood report and warning notifications.</p>
                </div>

                <button className="settings-button">Configure</button>
              </div>

              <div className="settings-card">
                <div className="settings-icon">🔐</div>

                <div>
                  <h3>Security</h3>

                  <p>Manage system security and authentication settings.</p>
                </div>

                <button className="settings-button">Manage</button>
              </div>

              <div className="settings-card">
                <div className="settings-icon">🌊</div>

                <div>
                  <h3>FloodEWS System</h3>

                  <p>Configure operational flood warning system settings.</p>
                </div>

                <button className="settings-button">Configure</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
