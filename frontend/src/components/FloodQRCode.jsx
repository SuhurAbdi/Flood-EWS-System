import { QRCodeCanvas } from "qrcode.react";

function FloodQRCode({ area }) {
  const reportUrl = `${window.location.origin}/report-flood?area=${encodeURIComponent(area)}`;

  return (
    <div className="qr-card">
      <h2>Report a Flood</h2>

      <p>Scan this QR code to report flooding in {area}.</p>

      <div className="qr-container">
        <QRCodeCanvas value={reportUrl} size={220} level="H" />
      </div>

      <p className="qr-area">
        Area: <strong>{area}</strong>
      </p>
    </div>
  );
}

export default FloodQRCode;
