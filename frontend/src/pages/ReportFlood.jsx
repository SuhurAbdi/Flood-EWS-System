import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { createFloodReport, getMyFloodReports } from "../services/api";

function ReportFlood() {
  // ============================================================
  // REPORT FORM
  // ============================================================

  const [formData, setFormData] = useState({
    location: "",
    severity: "",
    flood_occurred: true,
    description: "",
  });

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // ============================================================
  // LOADING / MESSAGES
  // ============================================================

  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [locationError, setLocationError] = useState("");

  // ============================================================
  // DATABASE REPORT
  // ============================================================

  const [databaseReport, setDatabaseReport] = useState(null);
  const [reportLoading, setReportLoading] = useState(true);
  const [reportError, setReportError] = useState("");

  // ============================================================
  // RISK
  // ============================================================

  const [riskLevel, setRiskLevel] = useState("");

  // ============================================================
  // LOAD LATEST REPORT FROM DATABASE
  // ============================================================

  async function loadDatabaseReport() {
    try {
      setReportLoading(true);
      setReportError("");

      const result = await getMyFloodReports();

      console.log("DATABASE REPORT:", result);

      if (result?.data && result.data.length > 0) {
        // Laravel should return newest report first
        const latestReport = result.data[0];

        setDatabaseReport(latestReport);

        // Also show risk from database
        setRiskLevel(latestReport.risk_level || "");
      } else {
        setDatabaseReport(null);
        setRiskLevel("");
      }
    } catch (error) {
      console.error("Database report error:", error);

      setReportError(
        error.message || "Unable to read flood report from database.",
      );
    } finally {
      setReportLoading(false);
    }
  }

  // Load report when page opens
  useEffect(() => {
    loadDatabaseReport();
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
  // FORMAT DATE
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
  // HANDLE INPUT
  // ============================================================

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setErrorMessage("");

    if (name === "location" || name === "severity") {
      setRiskLevel("");
    }
  }

  // ============================================================
  // GET GPS LOCATION
  // ============================================================

  function getMyLocation() {
    setLocationLoading(true);
    setLocationError("");
    setErrorMessage("");

    if (!navigator.geolocation) {
      setLocationError("Your browser does not support location services.");

      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setLatitude(lat);
        setLongitude(lng);

        setLocationLoading(false);

        console.log("Real Latitude:", lat);
        console.log("Real Longitude:", lng);
      },

      (error) => {
        console.error("Location error:", error);

        setLocationLoading(false);

        if (error.code === 1) {
          setLocationError(
            "Location permission was denied. Please allow location access.",
          );
        } else if (error.code === 2) {
          setLocationError("Your location could not be determined.");
        } else if (error.code === 3) {
          setLocationError(
            "Getting your location took too long. Please try again.",
          );
        } else {
          setLocationError("Unable to get your location.");
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  }

  // ============================================================
  // PHOTO
  // ============================================================

  function handlePhotoChange(event) {
    const selectedPhoto = event.target.files?.[0];

    setErrorMessage("");

    if (!selectedPhoto) {
      setPhoto(null);
      setPhotoPreview("");
      return;
    }

    if (!selectedPhoto.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file.");

      event.target.value = "";
      setPhoto(null);
      setPhotoPreview("");

      return;
    }

    if (selectedPhoto.size > 5 * 1024 * 1024) {
      setErrorMessage("Please choose an image smaller than 5 MB.");

      event.target.value = "";
      setPhoto(null);
      setPhotoPreview("");

      return;
    }

    setPhoto(selectedPhoto);

    const previewUrl = URL.createObjectURL(selectedPhoto);

    setPhotoPreview(previewUrl);
  }

  // ============================================================
  // CLEAN PHOTO URL
  // ============================================================

  useEffect(() => {
    return () => {
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  // ============================================================
  // SUBMIT FLOOD REPORT
  // ============================================================

  async function handleSubmit(event) {
    event.preventDefault();

    if (loading) {
      return;
    }

    setSuccessMessage("");
    setErrorMessage("");
    setRiskLevel("");

    // Location
    if (!formData.location.trim()) {
      setErrorMessage("Please enter the flood location.");
      return;
    }

    // Severity
    if (!formData.severity) {
      setErrorMessage("Please select the flood severity.");
      return;
    }

    // GPS
    if (!latitude || !longitude) {
      setErrorMessage(
        "Please click '📍 Use My Current Location' before submitting.",
      );
      return;
    }

    // Photo
    if (!photo) {
      setErrorMessage("Please select a real flood photo before submitting.");
      return;
    }

    setLoading(true);

    try {
      const reportData = {
        location: formData.location,
        severity: formData.severity,

        flood_occurred:
          formData.flood_occurred === true ||
          formData.flood_occurred === "true",

        description: formData.description,

        latitude: latitude,
        longitude: longitude,

        photo: photo,
      };

      console.log("Submitting flood report:", reportData);

      // Send report to Laravel
      const result = await createFloodReport(reportData);

      console.log("Flood report response:", result);

      // ========================================================
      // GET RISK FROM RESPONSE
      // ========================================================

      const savedRiskLevel = result?.data?.risk_level;

      if (savedRiskLevel) {
        setRiskLevel(savedRiskLevel);
      }

      setSuccessMessage("Flood report and photo submitted successfully!");

      // ========================================================
      // IMPORTANT:
      // READ NEW REPORT FROM DATABASE
      // ========================================================

      await loadDatabaseReport();

      // ========================================================
      // RESET FORM
      // ========================================================

      setFormData({
        location: "",
        severity: "",
        flood_occurred: true,
        description: "",
      });

      setPhoto(null);
      setPhotoPreview("");

      setLatitude("");
      setLongitude("");

      setLocationError("");

      const fileInput = document.querySelector('input[name="photo"]');

      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error) {
      console.error("Flood report error:", error);

      setErrorMessage(
        error.message ||
          "Something went wrong while submitting the flood report.",
      );
    } finally {
      setLoading(false);
    }
  }

  // ============================================================
  // UI
  // ============================================================

  return (
    <div>
      <PageHeader
        title="Report a Flood"
        description="Report flooding in your area and help improve community flood warnings."
      />

      <section className="report-section">
        <div className="report-layout">
          {/* ====================================================
              LEFT SIDE — REPORT FORM
              ==================================================== */}

          <div className="report-card">
            <div className="report-intro">
              <div className="report-icon">🚨</div>

              <h2>Report Flooding</h2>

              <p>Please provide accurate information about the flooding.</p>
            </div>

            {/* SUCCESS */}

            {successMessage && (
              <div className="success-message">✅ {successMessage}</div>
            )}

            {/* ERROR */}

            {errorMessage && (
              <div className="error-message">❌ {errorMessage}</div>
            )}

            <form className="report-form" onSubmit={handleSubmit}>
              {/* LOCATION */}

              <label htmlFor="location">Flood Location</label>

              <input
                id="location"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter Flood Location"
                required
              />

              {/* SEVERITY */}

              <label htmlFor="severity">Flood Severity</label>

              <select
                id="severity"
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                required
              >
                <option value="">Select severity</option>

                <option value="mild">Mild</option>

                <option value="moderate">Moderate</option>

                <option value="severe">Severe</option>
              </select>

              {/* GPS */}

              <label>Your Current Location</label>

              <button
                type="button"
                onClick={getMyLocation}
                className="register-button"
                disabled={locationLoading || loading}
              >
                {locationLoading
                  ? "📍 Getting Location..."
                  : "📍 Use My Current Location"}
              </button>

              {locationLoading && <p>📍 Getting your real GPS location...</p>}

              {latitude && longitude && (
                <div className="location-success">
                  <p>✅ Location detected successfully</p>

                  <p>
                    <strong>Latitude:</strong> {latitude}
                  </p>

                  <p>
                    <strong>Longitude:</strong> {longitude}
                  </p>
                </div>
              )}

              {locationError && (
                <p className="location-error">❌ {locationError}</p>
              )}

              {/* DESCRIPTION */}

              <label htmlFor="description">Description</label>

              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe what is happening..."
                rows="4"
              />

              {/* PHOTO */}

              <label htmlFor="photo">📷 Flood Photo</label>

              <input
                id="photo"
                type="file"
                name="photo"
                accept="image/*"
                onChange={handlePhotoChange}
                required
              />

              <small>
                Please upload a real photo of the flooding. Maximum size: 5 MB.
              </small>

              {/* PHOTO PREVIEW */}

              {photoPreview && (
                <div className="photo-preview">
                  <p>
                    <strong>Selected Flood Photo:</strong>
                  </p>
                  <img
                    src={photoPreview}
                    alt="Flood preview"
                    style={{
                      width: "100%",
                      maxWidth: "300px",
                      maxHeight: "250px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                </div>
              )}

              {/* SUBMIT */}

              <button
                className="register-button"
                type="submit"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Flood Report"}
              </button>
            </form>
          </div>

          {/* ====================================================
              RIGHT SIDE — DATABASE FORECAST
              ==================================================== */}

          <div className="forecast-card">
            {/* HEADER */}

            <div className="forecast-header">
              <div className="forecast-icon">🌊</div>

              <div>
                <h2>Flood Forecast</h2>

                <p>Manafwa Flood Early Warning</p>
              </div>
            </div>

            {/* LOADING */}

            {reportLoading && (
              <div className="forecast-note">
                🔄 Reading flood report from database...
              </div>
            )}

            {/* ERROR */}

            {!reportLoading && reportError && (
              <div className="error-message">❌ {reportError}</div>
            )}

            {/* DATABASE REPORT */}

            {!reportLoading && !reportError && databaseReport && (
              <>
                {/* DATE */}

                <div className="forecast-info">
                  <p>
                    <strong>📅 Report Date</strong>
                  </p>

                  <div className="forecast-value">
                    {formatDate(databaseReport.created_at)}
                  </div>
                </div>

                {/* LOCATION */}

                <div className="forecast-info">
                  <p>
                    <strong>📍 Flood Location</strong>
                  </p>

                  <div className="forecast-value">
                    {databaseReport.location || "Location unavailable"}
                  </div>
                </div>

                {/* RISK */}

                <div
                  className={`forecast-risk ${getRiskClass(
                    databaseReport.risk_level,
                  )}`}
                >
                  <div className="forecast-risk-icon">
                    {getRiskIcon(databaseReport.risk_level)}
                  </div>

                  <div>
                    <p>RISK LEVEL</p>

                    <h2>{databaseReport.risk_level || "Pending"}</h2>
                  </div>
                </div>

                {/* SEVERITY */}

                <div className="forecast-info">
                  <p>
                    <strong>⚠️ Reported Severity</strong>
                  </p>

                  <div className="forecast-value">
                    {databaseReport.severity
                      ? databaseReport.severity.charAt(0).toUpperCase() +
                        databaseReport.severity.slice(1)
                      : "Not available"}
                  </div>
                </div>

                {/* FLOOD OCCURRED */}

                <div className="forecast-info">
                  <p>
                    <strong>🌊 Flood Occurred</strong>
                  </p>

                  <div className="forecast-value">
                    {databaseReport.flood_occurred ? "Yes" : "No"}
                  </div>
                </div>

                {/* GPS */}

                <div className="forecast-info">
                  <p>
                    <strong>📍 GPS Coordinates</strong>
                  </p>

                  <div className="forecast-value">
                    {databaseReport.latitude && databaseReport.longitude
                      ? `${databaseReport.latitude}, ${databaseReport.longitude}`
                      : "GPS not available"}
                  </div>
                </div>

                {/* DESCRIPTION */}

                {databaseReport.description && (
                  <div className="forecast-info">
                    <p>
                      <strong>📝 Description</strong>
                    </p>

                    <div className="forecast-value">
                      {databaseReport.description}
                    </div>
                  </div>
                )}

                {/* STATUS */}

                <div className="forecast-info">
                  <p>
                    <strong>📋 Report Status</strong>
                  </p>

                  <div className="forecast-value">
                    {databaseReport.status || "Pending"}
                  </div>
                </div>

                {/* INFORMATION */}

                <div className="forecast-note">
                  <span>ℹ️</span>

                  <p className="latest-flood">
                    This information is read from your latest flood report
                  </p>
                </div>
              </>
            )}

            {/* NO REPORT */}

            {!reportLoading && !reportError && !databaseReport && (
              <div>ℹ️ No flood report found in the database.</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ReportFlood;
