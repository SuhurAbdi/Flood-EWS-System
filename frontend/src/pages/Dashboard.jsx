import { useEffect, useState } from "react";
import { getMyFloodReports } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
function Dashboard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    async function loadReports() {
      try {
        const result = await getMyFloodReports();
        setReports(result.data || []);
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
  const rejectedReports = reports.filter(
    (report) => report.status === "rejected",
  ).length;
  /* ================================================== LOADING ================================================== */ if (
    loading
  ) {
    return (
      <div className="user-dashboard-page">
        {" "}
        <div className="user-dashboard-loading">
          {" "}
          <div className="user-dashboard-spinner"></div>{" "}
          <span>Loading your dashboard...</span>{" "}
        </div>{" "}
      </div>
    );
  }
  return (
    <div className="user-dashboard-page">
      {" "}
      {/* ================================================== HEADER ================================================== */}{" "}
      <section className="user-dashboard-header">
        {" "}
        <div className="user-dashboard-header-content">
          {" "}
          <span className="user-dashboard-label">
            {" "}
            COMMUNITY DASHBOARD{" "}
          </span>{" "}
          <h1> Welcome back, {user?.name || "User"} 👋 </h1>{" "}
          <p>
            {" "}
            Monitor your flood reports and stay informed about community flood
            risks.{" "}
          </p>{" "}
        </div>{" "}
      </section>{" "}
      {/* ================================================== ERROR ================================================== */}{" "}
      {error && <div className="user-dashboard-error"> {error} </div>}{" "}
      {/* ================================================== STATISTICS ================================================== */}{" "}
      <section className="user-dashboard-stats">
        {" "}
        {/* TOTAL REPORTS */}{" "}
        <div className="user-dashboard-stat-card">
          {" "}
          <div className="user-dashboard-stat-icon"> 🌊 </div>{" "}
          <div className="user-dashboard-stat-content">
            {" "}
            <p className="user-dashboard-stat-title"> MY REPORTS </p>{" "}
            <h2> {totalReports} </h2>{" "}
            <span> Total submitted reports </span>{" "}
          </div>{" "}
        </div>{" "}
        {/* PENDING */}{" "}
        <div className="user-dashboard-stat-card">
          {" "}
          <div className="user-dashboard-stat-icon"> ⏳ </div>{" "}
          <div className="user-dashboard-stat-content">
            {" "}
            <p className="user-dashboard-stat-title"> PENDING </p>{" "}
            <h2> {pendingReports} </h2>{" "}
            <span> Awaiting verification </span>{" "}
          </div>{" "}
        </div>{" "}
        {/* VERIFIED */}{" "}
        <div className="user-dashboard-stat-card">
          {" "}
          <div className="user-dashboard-stat-icon"> ✅ </div>{" "}
          <div className="user-dashboard-stat-content">
            {" "}
            <p className="user-dashboard-stat-title"> VERIFIED </p>{" "}
            <h2> {verifiedReports} </h2> <span> Verified reports </span>{" "}
          </div>{" "}
        </div>{" "}
        {/* REJECTED */}{" "}
        <div className="user-dashboard-stat-card">
          {" "}
          <div className="user-dashboard-stat-icon"> ❌ </div>{" "}
          <div className="user-dashboard-stat-content">
            {" "}
            <p className="user-dashboard-stat-title"> REJECTED </p>{" "}
            <h2> {rejectedReports} </h2>{" "}
            <span> Reports not verified </span>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* ================================================== QUICK ACTIONS ================================================== */}{" "}
      <section className="user-dashboard-section">
        {" "}
        <div className="user-dashboard-card">
          {" "}
          <div className="user-dashboard-card-header">
            {" "}
            <div>
              {" "}
              <span className="user-dashboard-label">
                {" "}
                FLOODEWS SERVICES{" "}
              </span>{" "}
              <h2> Quick Actions </h2>{" "}
              <p> Access important FloodEWS services quickly. </p>{" "}
            </div>{" "}
          </div>{" "}
          <div className="user-dashboard-actions">
            {" "}
            {/* REPORT FLOOD */}{" "}
            <button
              className="user-dashboard-action"
              onClick={() => navigate("/report-flood")}
            >
              {" "}
              <span className="user-dashboard-action-icon"> 🌊 </span>{" "}
              <span className="user-dashboard-action-content">
                {" "}
                <strong> Report a Flood </strong>{" "}
                <small> Submit a new community flood report </small>{" "}
              </span>{" "}
              <span className="user-dashboard-action-arrow"> → </span>{" "}
            </button>{" "}
            {/* FLOOD MAP */}{" "}
            <button
              className="user-dashboard-action"
              onClick={() => navigate("/flood-map")}
            >
              {" "}
              <span className="user-dashboard-action-icon"> 🗺️ </span>{" "}
              <span className="user-dashboard-action-content">
                {" "}
                <strong> Flood Map </strong>{" "}
                <small> View flood risk information </small>{" "}
              </span>{" "}
              <span className="user-dashboard-action-arrow"> → </span>{" "}
            </button>{" "}
            {/* ALERTS */}{" "}
            <button
              className="user-dashboard-action"
              onClick={() => navigate("/alerts")}
            >
              {" "}
              <span className="user-dashboard-action-icon"> 🚨 </span>{" "}
              <span className="user-dashboard-action-content">
                {" "}
                <strong> Flood Alerts </strong>{" "}
                <small> Check current warnings and alerts </small>{" "}
              </span>{" "}
              <span className="user-dashboard-action-arrow"> → </span>{" "}
            </button>{" "}
            {/* MY REPORTS */}{" "}
            <button
              className="user-dashboard-action"
              onClick={() => {
                document
                  .querySelector(".user-dashboard-reports-section")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              {" "}
              <span className="user-dashboard-action-icon"> 📋 </span>{" "}
              <span className="user-dashboard-action-content">
                {" "}
                <strong> My Reports </strong>{" "}
                <small> Review your submitted reports </small>{" "}
              </span>{" "}
              <span className="user-dashboard-action-arrow"> → </span>{" "}
            </button>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* ================================================== MY FLOOD REPORTS ================================================== */}{" "}
      <section className="user-dashboard-section user-dashboard-reports-section">
        {" "}
        <div className="user-dashboard-card">
          {" "}
          <div className="user-dashboard-card-header">
            {" "}
            <div>
              {" "}
              <span className="user-dashboard-label">
                {" "}
                COMMUNITY REPORTING{" "}
              </span>{" "}
              <h2> My Flood Reports </h2>{" "}
              <p>
                {" "}
                Track the status of flood reports you have submitted.{" "}
              </p>{" "}
            </div>{" "}
            {reports.length > 0 && (
              <span className="user-dashboard-report-count">
                {" "}
                {reports.length} Reports{" "}
              </span>
            )}{" "}
          </div>{" "}
          {/* ================================================== NO REPORTS ================================================== */}{" "}
          {reports.length === 0 ? (
            <div className="user-dashboard-empty">
              {" "}
              <div className="user-dashboard-empty-icon"> 🌊 </div>{" "}
              <h3> No flood reports yet </h3>{" "}
              <p>
                {" "}
                You have not submitted any flood reports. Help your community by
                reporting flood events.{" "}
              </p>{" "}
              <button
                className="user-dashboard-primary-button"
                onClick={() => navigate("/report-flood")}
              >
                {" "}
                🌊 Report a Flood{" "}
              </button>{" "}
            </div>
          ) : (
            /* ================================================== REPORT LIST ================================================== */ <div className="user-dashboard-report-list">
              {" "}
              {reports.map((report) => (
                <div className="user-dashboard-report-item" key={report.id}>
                  {" "}
                  <div className="user-dashboard-report-info">
                    {" "}
                    <div className="user-dashboard-report-location">
                      {" "}
                      <span className="user-dashboard-location-icon">
                        {" "}
                        📍{" "}
                      </span>{" "}
                      <div>
                        {" "}
                        <h3> {report.location || "Unknown location"} </h3>{" "}
                        <p>
                          {" "}
                          {report.description ||
                            "No description provided."}{" "}
                        </p>{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="user-dashboard-report-details">
                      {" "}
                      <small>
                        {" "}
                        <strong> Severity: </strong>{" "}
                        {report.severity || "Not specified"}{" "}
                      </small>{" "}
                      {report.created_at && (
                        <small>
                          {" "}
                          <strong> Date: </strong>{" "}
                          {new Date(
                            report.created_at,
                          ).toLocaleDateString()}{" "}
                        </small>
                      )}{" "}
                    </div>{" "}
                  </div>{" "}
                  {/* STATUS */}{" "}
                  <span
                    className={`user-dashboard-status user-dashboard-status-${report.status}`}
                  >
                    {" "}
                    {report.status}{" "}
                  </span>{" "}
                </div>
              ))}{" "}
            </div>
          )}{" "}
        </div>{" "}
      </section>{" "}
    </div>
  );
}
export default Dashboard;
