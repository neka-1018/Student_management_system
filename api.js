const API_URL = "http://127.0.0.1:8000/api/students/";

export async function getStudents(params = {}) {
  const query = new URLSearchParams(params).toString();
  const url = query ? `${API_URL}?${query}` : API_URL;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }
  return response.json();
}

export async function getStudent(id) {
  const response = await fetch(`${API_URL}${id}/`);
  if (!response.ok) {
    throw new Error("Failed to fetch student");
  }
  return response.json();
}

export async function createStudent(data) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) {
    const error = new Error("Validation failed");
    error.data = result;
    throw error;
  }
  return result;
}

export async function updateStudent(id, data) {
  const response = await fetch(`${API_URL}${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) {
    const error = new Error("Validation failed");
    error.data = result;
    throw error;
  }
  return result;
}

export async function deleteStudent(id) {
  const response = await fetch(`${API_URL}${id}/`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete student");
  }
  return true;
}
