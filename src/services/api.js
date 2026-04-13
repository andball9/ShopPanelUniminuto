const BASE_URL = "https://dummyjson.com";

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "No fue posible completar la solicitud.");
  }

  return data;
}

async function resolveIdentifier(identifier) {
  if (!identifier.includes("@")) {
    return identifier;
  }

  const result = await request(`/users/search?q=${encodeURIComponent(identifier)}`);
  const matchedUser = result.users.find(
    (user) => user.email.toLowerCase() === identifier.toLowerCase(),
  );

  if (!matchedUser) {
    throw new Error("No existe un usuario asociado a ese correo.");
  }

  return matchedUser.username;
}

export async function loginUser(identifier, password) {
  const username = await resolveIdentifier(identifier.trim());

  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
      expiresInMins: 30,
    }),
  });
}

export async function getProducts(query = "") {
  const path = query.trim()
    ? `/products/search?q=${encodeURIComponent(query.trim())}`
    : "/products?limit=12";
  const data = await request(path);
  return data.products;
}

export async function getProductById(id) {
  return request(`/products/${id}`);
}
