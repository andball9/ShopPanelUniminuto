const BASE_URL = "http://localhost:3001";

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    ...options,
  });

  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.message || "No fue posible completar la solicitud a la API.");
  }

  return data;
}

export async function getUsers() {
  return request("/users");
}

export async function createUser(userData) {
  return request("/users", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

export async function deleteUser(id) {
  return request(`/users/${id}`, {
    method: "DELETE",
  });
}
