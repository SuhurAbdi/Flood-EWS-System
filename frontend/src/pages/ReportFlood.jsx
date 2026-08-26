import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { createFloodReport } from "../services/api";

function ReportFlood() {
  const [formData, setFormData] = useState({
    location: "",
    severity: "",
    flood_occurred: true,
    description: "",
  });

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // ============================================================
  // REAL LOCATION
  // ============================================================

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState("");

  // ============================================================
  // GET REAL LOCATION
  // ============================================================

  const getMyLocation = () => {
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
  };

  // ============================================================
  // HANDLE TEXT INPUT
  // ============================================================

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  // ============================================================
  // HANDLE PHOTO
  // ============================================================

  function handlePhotoChange(event) {
    const selectedPhoto = event.target.files[0];

    if (!selectedPhoto) {
      setPhoto(null);
      setPhotoPreview("");
      return;
    }

    // Make sure it is an image
    if (!selectedPhoto.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file.");

      setPhoto(null);
      setPhotoPreview("");

      return;
    }

    // Optional: limit photo size to 5 MB
    if (selectedPhoto.size > 5 * 1024 * 1024) {
      setErrorMessage("Please choose an image smaller than 5 MB.");

      setPhoto(null);
      setPhotoPreview("");

      return;
    }

    setErrorMessage("");

    setPhoto(selectedPhoto);

    // Create preview
    const previewUrl = URL.createObjectURL(selectedPhoto);

    setPhotoPreview(previewUrl);

    console.log("Selected photo:", selectedPhoto);
  }

  // ============================================================
  // SUBMIT FLOOD REPORT
  // ============================================================

  async function handleSubmit(event) {
    event.preventDefault();

    // Prevent duplicate submissions
    if (loading) {
      return;
    }

    setSuccessMessage("");
    setErrorMessage("");

    // Check location
    if (!latitude || !longitude) {
      setErrorMessage(
        "Please click '📍 Use My Current Location' before submitting.",
      );

      return;
    }

    setLoading(true);

    // Check photo
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

      const result = await createFloodReport(reportData);

      console.log("Flood report response:", result);

      setSuccessMessage("Flood report and photo submitted successfully!");

      // Reset form
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

  return (
    <div>
      <PageHeader
        title="Report a Flood"
        description="Report flooding in your area and help improve community flood warnings."
      />

      <section className="report-section">
        <div className="report-card">
          {/* INTRO */}
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
            <label>Flood Location</label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter Flood Location"
              required
            />

            {/* SEVERITY */}
            <label>Flood Severity</label>

            <select
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

            {/* REAL LOCATION */}
            <label>Your Current Location</label>

            <button
              type="button"
              onClick={getMyLocation}
              className="register-button"
              disabled={locationLoading}
            >
              {locationLoading
                ? "📍 Getting Location..."
                : "📍 Use My Current Location"}
            </button>

            {locationLoading && <p>📍 Getting your real location...</p>}

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
            <label>Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what is happening..."
              rows="5"
            />

            {/* REAL FLOOD PHOTO */}
            <label>📷 Flood Photo</label>

            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handlePhotoChange}
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
      </section>
    </div>
  );
}

export default ReportFlood;
