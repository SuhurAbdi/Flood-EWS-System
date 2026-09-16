import React, { useEffect, useState } from "react";
import "../styles/alertrobot.css";

const riskMessages = {
  Normal: {
    title: "Normal Flood Risk",
    message:
      "Conditions are currently normal. Continue monitoring FloodEWS alerts.",
    status: "SAFE",
    icon: "🛡️",
    chest: "FLOOD",
    action: "Monitoring the environment",
  },

  Mild: {
    title: "Mild Flood Risk",
    message:
      "Some flood risk has been detected. Stay informed and monitor local conditions.",
    status: "WATCH",
    icon: "⚠️",
    chest: "WATCH",
    action: "Watching water level changes",
  },

  Advanced: {
    title: "Advanced Flood Risk",
    message:
      "High flood risk detected. Stay away from flood-prone areas and follow local warnings.",
    status: "WARNING",
    icon: "🚨",
    chest: "WARN",
    action: "Warning community members",
  },

  Extreme: {
    title: "Extreme Flood Risk",
    message:
      "Extreme flood risk detected. Move to a safer area if advised and follow official instructions.",
    status: "DANGER",
    icon: "🚨",
    chest: "ALERT",
    action: "Emergency warning activated",
  },
};

function AlertRobot({ riskLevel = "Normal" }) {
  /*
   * ==========================================
   * NORMALIZE RISK LEVEL
   * ==========================================
   */

  const normalizeRiskLevel = (value) => {
    const risk = String(value || "Normal")
      .toLowerCase()
      .trim();

    if (risk === "extreme" || risk === "severe") {
      return "Extreme";
    }

    if (risk === "advanced" || risk === "moderate") {
      return "Advanced";
    }

    if (risk === "mild") {
      return "Mild";
    }

    return "Normal";
  };

  const currentRisk = normalizeRiskLevel(riskLevel);
  const currentMessage = riskMessages[currentRisk];

  /*
   * ==========================================
   * ROBOT STATES
   * ==========================================
   */

  const [scanning, setScanning] = useState(true);
  const [alertPulse, setAlertPulse] = useState(false);

  /*
   * ==========================================
   * SCANNING / MONITORING
   * ==========================================
   */

  useEffect(() => {
    const timer = setInterval(
      () => {
        setScanning((previous) => !previous);
      },
      currentRisk === "Normal" ? 1800 : 900,
    );

    return () => clearInterval(timer);
  }, [currentRisk]);

  /*
   * ==========================================
   * EXTREME ALERT PULSE
   * ==========================================
   */

  useEffect(() => {
    if (currentRisk !== "Extreme") {
      setAlertPulse(false);
      return;
    }

    const timer = setInterval(() => {
      setAlertPulse((previous) => !previous);
    }, 350);

    return () => clearInterval(timer);
  }, [currentRisk]);

  /*
   * ==========================================
   * ROBOT MOVEMENT
   * ==========================================
   */

  const robotMovementClass = {
    Normal: "robot-normal",
    Mild: "robot-mild",
    Advanced: "robot-advanced",
    Extreme: "robot-extreme",
  };

  /*
   * ==========================================
   * STATUS TEXT
   * ==========================================
   */

  const getRobotStatus = () => {
    if (currentRisk === "Normal") {
      return scanning ? "SCANNING..." : "MONITORING";
    }

    if (currentRisk === "Mild") {
      return scanning ? "WATCHING..." : "MONITORING";
    }

    if (currentRisk === "Advanced") {
      return scanning ? "WARNING..." : "DETECTING RISK";
    }

    return scanning ? "🚨 EMERGENCY..." : "🚨 ALERT ACTIVE";
  };

  /*
   * ==========================================
   * COMPONENT
   * ==========================================
   */

  return (
    <div
      className={`
        alert-robot-card
        risk-${currentRisk.toLowerCase()}
        ${alertPulse ? "alert-pulse" : ""}
      `}
    >
      {/* =====================================
          LEFT SIDE - ROBOT
      ====================================== */}

      <div className="robot-stage">
        {/* Monitoring badge */}

        <div className="robot-floating-status">
          <span className="live-dot"></span>
          {getRobotStatus()}
        </div>

        {/* Radar */}

        <div className="robot-radar">
          <div className="radar-ring radar-ring-one"></div>
          <div className="radar-ring radar-ring-two"></div>
          <div className="radar-ring radar-ring-three"></div>

          <div className="radar-line"></div>

          <div className="radar-cross-horizontal"></div>
          <div className="radar-cross-vertical"></div>
        </div>

        {/* Robot */}

        <div className={`robot-wrapper ${robotMovementClass[currentRisk]}`}>
          {/* Antenna */}

          <div className="robot-antenna">
            <span></span>
          </div>

          {/* Head */}

          <div className="robot-head">
            <div className="robot-eyes">
              <span></span>
              <span></span>
            </div>

            <div className="robot-mouth">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          {/* Body */}

          <div className="robot-body">
            <div className="robot-chest-screen">
              <span className="chest-icon">{currentMessage.icon}</span>

              <span className="chest-text">{currentMessage.chest}</span>
            </div>

            <div className="robot-body-light"></div>
          </div>

          {/* Left arm */}

          <div className="robot-arm robot-arm-left">
            <div className="robot-hand"></div>
          </div>

          {/* Right arm */}

          <div className="robot-arm robot-arm-right">
            <div className="robot-hand"></div>
          </div>

          {/* Legs */}

          <div className="robot-leg robot-leg-left"></div>
          <div className="robot-leg robot-leg-right"></div>
        </div>

        {/* Ground */}

        <div className="robot-ground"></div>
      </div>

      {/* =====================================
          RIGHT SIDE - INFORMATION
      ====================================== */}

      <div className="robot-information">
        {/* Header */}

        <div className="robot-header">
          <div>
            <span className="robot-label">FLOODEWS</span>

            <h3>Alert Robot</h3>
          </div>

          <span className="robot-status-badge">
            <span className="status-dot"></span>
            {currentMessage.status}
          </span>
        </div>

        {/* Current Risk */}

        <div className="robot-risk">
          <span>Current Risk</span>

          <strong>{currentRisk}</strong>
        </div>

        {/* Message */}

        <h4>{currentMessage.title}</h4>

        <p>{currentMessage.message}</p>

        {/* Robot Status */}

        <div className="robot-action">
          <span className="action-icon">
            {currentRisk === "Normal" && "🟢"}
            {currentRisk === "Mild" && "🟡"}
            {currentRisk === "Advanced" && "🟠"}
            {currentRisk === "Extreme" && "🔴"}
          </span>

          <div>
            <strong>Robot Status</strong>

            <small>{currentMessage.action}</small>
          </div>
        </div>

        {/* Footer */}

        <div className="robot-footer">
          <span>📍 Manafwa Catchment</span>

          <span>● Live Monitoring</span>
        </div>
      </div>
    </div>
  );
}

export default AlertRobot;
