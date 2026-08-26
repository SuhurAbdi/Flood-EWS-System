import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";

function FloodMap() {
  const [myLocation, setMyLocation] = useState(null);
  const [error, setError] = useState("");

  const findMyLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setMyLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        setError("");
      },
      () => {
        setError("Location permission was denied.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };

  return (
    <div className="flood-map">
      <button onClick={findMyLocation} className="location-button">
        📍 Find My Location
      </button>

      {error && <p className="location-error">{error}</p>}

      <MapContainer
        center={[9.5624, 44.077]}
        zoom={10}
        style={{
          height: "600px",
          width: "100%",
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {myLocation && (
          <Marker position={[myLocation.latitude, myLocation.longitude]}>
            <Popup>
              📍 <strong>Your Current Location</strong>
              <br />
              Latitude: {myLocation.latitude}
              <br />
              Longitude: {myLocation.longitude}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default FloodMap;
