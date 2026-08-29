const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Flood XGBoost AI service is running.",
  });
});

// Prediction route
app.post("/predict", (req, res) => {
  try {
    const { rainfall, river_level, temperature, humidity } = req.body;

    // Check required data
    if (
      rainfall === undefined ||
      river_level === undefined ||
      temperature === undefined ||
      humidity === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing prediction data.",
      });
    }

    /*
     * TEMPORARY prediction logic.
     *
     * We will replace this with your
     * actual XGBoost model.
     */

    let risk = "low";

    if (rainfall >= 100 || river_level >= 4) {
      risk = "high";
    } else if (rainfall >= 50 || river_level >= 2) {
      risk = "moderate";
    }

    return res.json({
      success: true,
      risk: risk,
      message: "Flood prediction generated successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Prediction service error.",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Flood AI service running at http://127.0.0.1:${PORT}`);
});
