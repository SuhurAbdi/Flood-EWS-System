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
export async function createFloodReport(reportData) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("You are not logged in.");
  }

  const formData = new FormData();

  // Text fields
  formData.append("location", reportData.location);
  formData.append("severity", reportData.severity);
  formData.append("flood_occurred", reportData.flood_occurred ? "1" : "0");
  formData.append("description", reportData.description || "");

  // Real GPS location
  formData.append("latitude", reportData.latitude);

  formData.append("longitude", reportData.longitude);

  // Real flood photo
  if (reportData.photo) {
    formData.append("photo", reportData.photo);
  }

  const response = await fetch("http://127.0.0.1:8000/api/flood-reports", {
    method: "POST",

    headers: {
      Accept: "application/json",

      Authorization: `Bearer ${token}`,
    },

    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to submit flood report.");
  }

  return data;
}

export async function getMyFloodReports() {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:8000/api/my-flood-reports", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get flood reports");
  }

  return data;
}
export async function getAdminDashboard(token) {
  const response = await fetch("http://127.0.0.1:8000/api/admin/dashboard", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Dashboard request failed: ${response.status}`);
  }

  return await response.json();
}
export async function getAdminReports(token) {
  const response = await fetch("http://127.0.0.1:8000/api/admin/reports", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Reports request failed: ${response.status}`);
  }

  return await response.json();
}
export async function getAdminUsers(token) {
  const response = await fetch("http://127.0.0.1:8000/api/admin/users", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Users request failed: ${response.status}`);
  }

  return await response.json();
}
export async function getFloodAlerts() {
  const response = await fetch("http://127.0.0.1:8000/api/flood-alerts", {
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
