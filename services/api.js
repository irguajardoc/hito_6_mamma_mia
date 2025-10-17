const RAW_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:5000";
export const API_BASE = RAW_BASE.replace(/\/+$/, "");

async function apiRequest(path, options = {}) {
  const url = `${API_BASE}${path}`; // path debe iniciar con "/"
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${url} → ${res.status} ${res.statusText} ${text?.slice(0, 140) || ""}`);
  }
  return res.json();
}

// Lista de pizzas
export async function getPizzas() {
  return apiRequest("/api/pizzas");
}

export async function getPizzaById(id) {
  if (!id) throw new Error("id requerido en getPizzaById");
  return apiRequest(`/api/pizzas/${encodeURIComponent(id)}`);
}
