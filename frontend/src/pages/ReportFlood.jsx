import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { createFloodReport } from "../services/api";

function ReportFlood() {
  const [formData, setFormData] = useState({
    location: "",
    severity: "",
    flood_occurred: true,
    description: "",
    photo: "",
  });

  const [loading, setLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  /*
    |--------------------------------------------------------------------------
    | Handle input changes
    |--------------------------------------------------------------------------
    */

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  /*
    |--------------------------------------------------------------------------
    | Submit report
    |--------------------------------------------------------------------------
    */

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);

    setSuccessMessage("");

    setErrorMessage("");

    try {
      const result = await createFloodReport({
        location: formData.location,

        severity: formData.severity,

        flood_occurred:
          formData.flood_occurred === true ||
          formData.flood_occurred === "true",

        description: formData.description,

        photo: formData.photo || null,
      });

      console.log("Flood report:", result.data);

      setSuccessMessage("Flood report submitted successfully!");

      setFormData({
        location: "",
        severity: "",
        flood_occurred: true,
        description: "",
        photo: "",
      });
    } catch (error) {
      console.error(error);

      setErrorMessage(error.message || "Something went wrong.");
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
          <div className="report-intro">
            <div className="report-icon">🚨</div>

            <h2>Report Flooding</h2>

            <p>Please provide accurate information about the flooding.</p>
          </div>

          {successMessage && (
            <div className="success-message">✅ {successMessage}</div>
          )}

          {errorMessage && (
            <div className="error-message">❌ {errorMessage}</div>
          )}

          <form className="report-form" onSubmit={handleSubmit}>
            {/* Location */}

            <label>Flood Location</label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Example: Hargeisa"
              required
            />

            {/* Severity */}

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

            {/* Flood occurred */}

            <label>Did flooding occur?</label>

            <select
              name="flood_occurred"
              value={String(formData.flood_occurred)}
              onChange={handleChange}
            >
              <option value="true">Yes</option>

              <option value="false">No</option>
            </select>

            {/* Description */}

            <label>Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what is happening..."
              rows="5"
            />

            {/* Photo */}

            <label>Photo URL</label>

            <input
              type="text"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              placeholder="Optional"
            />

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="register-button"
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
