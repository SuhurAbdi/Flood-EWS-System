import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About */}
        <div className="footer-column">
          <h2>
            🌊 Flood<span> EWS</span>
          </h2>

          <p>
            A community-focused flood early warning system designed to support
            safer and more resilient communities.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>

          <Link to="/about">About</Link>

          <Link to="/flood-map">Flood Map</Link>

          <Link to="/alerts">Alerts</Link>
        </div>

        {/* Community */}
        <div className="footer-column">
          <h3>Community</h3>

          <Link to="/report-flood">Report a Flood</Link>

          <Link to="/register">Create Account</Link>

          <Link to="/login">Login</Link>
        </div>

        {/* Contact */}
        <div className="footer-column">
          <h3>Emergency Information</h3>

          <p>Follow official emergency instructions during flood events.</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 FloodEWS. Community Flood Early Warning System.</p>
      </div>
    </footer>
  );
}

export default Footer;
