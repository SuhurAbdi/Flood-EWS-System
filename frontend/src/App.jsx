import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./index.css";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Alerts from "./pages/Alerts";
import FloodMap from "./pages/FloodMap";
import ReportFlood from "./pages/ReportFlood";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Forecast from "./pages/Forecast";
import ManafwaBasin from "./pages/ManafwaBasin";
import AlertRobot from "./pages/AlertRobot";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="/alerts" element={<Alerts />} />

          <Route path="/flood-map" element={<FloodMap />} />

          <Route path="/report-flood" element={<ReportFlood />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/manafwaBasin" element={<ManafwaBasin />} />
          <Route path="/alertrobot" element={<AlertRobot />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
