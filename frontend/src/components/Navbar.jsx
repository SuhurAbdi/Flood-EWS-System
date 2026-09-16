import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <span className="logo-icon">🌊</span>

          <span>
            Green<span className="logo-green">Shield</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="nav-links">
          <Link to="/">Home</Link>

          <Link to="/about">About</Link>

          <Link to="/flood-map">Flood Map</Link>

          <Link to="/alerts">Alerts</Link>

          <Link to="/report-flood">Report Flood</Link>
        </nav>

        {/* Authentication */}
        <div className="nav-actions">
          <Link to="/login" className="login-link">
            Login
          </Link>

          <Link to="/register" className="register-button">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
