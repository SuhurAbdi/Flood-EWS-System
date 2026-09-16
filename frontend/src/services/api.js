const API_URL = "http://127.0.0.1:8000/api";

/*
|--------------------------------------------------------------------------
| Register
|--------------------------------------------------------------------------
*/

export async function registerUser(userData) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed.");
  }

  return data;
}

/*
|--------------------------------------------------------------------------
| Login
|--------------------------------------------------------------------------
*/

export async function loginUser(credentials) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed.");
  }
  // SAVE SANCTUM TOKEN
  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  return data;
}

/*
|--------------------------------------------------------------------------
| Get authenticated user
|--------------------------------------------------------------------------
*/

export async function getAuthenticatedUser(token) {
  const response = await fetch(`${API_URL}/user`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to get user.");
  }

  return data;
}

/*
|--------------------------------------------------------------------------
| Logout
|--------------------------------------------------------------------------
*/

export async function logoutUser(token) {
  const response = await fetch(`${API_URL}/logout`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Logout failed.");
  }

  return data;
}

/*
|--------------------------------------------------------------------------
| Create Flood Report
|--------------------------------------------------------------------------
|
| Sends:
| - location
| - severity
| - flood_occurred
| - description
| - latitude
| - longitude
| - photo
|
| Uses FormData because we are uploading an image.
|--------------------------------------------------------------------------
*/

export async function createFloodReport(reportData) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("You are not logged in.");
  }

  const formData = new FormData();

  // Text fields
  formData.append("location", reportData.location);
  formData.append("severity", reportData.severity);

  // Laravel can receive this as 1 or 0
  formData.append("flood_occurred", reportData.flood_occurred ? "1" : "0");

  formData.append("description", reportData.description || "");

  // GPS coordinates
  formData.append("latitude", String(reportData.latitude));

  formData.append("longitude", String(reportData.longitude));

  // Flood photo
  if (reportData.photo) {
    formData.append("photo", reportData.photo, reportData.photo.name);
  }

  // Debugging
  console.log("Sending flood report:");

  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

  const response = await fetch(`${API_URL}/flood-reports`, {
    method: "POST",

    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },

    // IMPORTANT:
    // Do NOT add Content-Type here.
    // Browser automatically creates:
    // multipart/form-data; boundary=...
    body: formData,
  });

  let data;

  try {
    data = await response.json();
  } catch (error) {
    throw new Error(
      `Server returned an invalid response. Status: ${response.status}`,
    );
  }

  if (!response.ok) {
    throw new Error(
      data.message || data.error || "Failed to submit flood report.",
    );
  }

  return data;
}

/*
|--------------------------------------------------------------------------
| Get My Flood Reports
|--------------------------------------------------------------------------
*/

export async function getMyFloodReports() {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("You are not logged in.");
  }

  const response = await fetch(`${API_URL}/flood-reports`, {
    method: "GET",

    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  let data;

  try {
    data = await response.json();
  } catch (error) {
    throw new Error(
      `Server returned an invalid response. Status: ${response.status}`,
    );
  }

  if (!response.ok) {
    throw new Error(
      data.message || data.error || "Failed to load flood reports.",
    );
  }

  return data;
}
/*
|--------------------------------------------------------------------------
| Admin Dashboard
|--------------------------------------------------------------------------
*/

export async function getAdminDashboard(token) {
  const response = await fetch(`${API_URL}/admin/dashboard`, {
    method: "GET",

    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || `Dashboard request failed: ${response.status}`,
    );
  }

  return data;
}

/*
|--------------------------------------------------------------------------
| Admin Reports
|--------------------------------------------------------------------------
*/

export async function getAdminReports(token) {
  const response = await fetch(`${API_URL}/admin/reports`, {
    method: "GET",

    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || `Reports request failed: ${response.status}`,
    );
  }

  return data;
}

/*
|--------------------------------------------------------------------------
| Admin Users
|--------------------------------------------------------------------------
*/

export async function getAdminUsers(token) {
  const response = await fetch(`${API_URL}/admin/users`, {
    method: "GET",

    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `Users request failed: ${response.status}`);
  }

  return data;
}

/*
|--------------------------------------------------------------------------
| Flood Alerts
|--------------------------------------------------------------------------
*/

export async function getFloodAlerts() {
  const response = await fetch(`${API_URL}/flood-alerts`, {
    method: "GET",

    headers: {
      Accept: "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to load flood alerts.");
  }

  return data;
}
/*
|--------------------------------------------------------------------------
| Alert Robot
|--------------------------------------------------------------------------
*/
export async function getFloodRisk() {
  const response = await fetch(`${API_URL}/flood-risk`);

  if (!response.ok) {
    throw new Error("Unable to load flood risk");
  }

  return response.json();
}
