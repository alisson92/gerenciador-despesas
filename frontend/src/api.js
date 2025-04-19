// src/api.js
const API_URL = "http://localhost:3000/api";

export async function apiRegister({ nome, email, senha }) {
  const res = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email, senha })
  });
  return res.json();
}

export async function apiLogin({ email, senha }) {
  const res = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha })
  });
  return res.json();
}

export async function apiGetDespesas(token) {
  const res = await fetch(`${API_URL}/despesas`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}

export async function apiCreateDespesa(token, despesa) {
  const res = await fetch(`${API_URL}/despesas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(despesa)
  });
  return res.json();
}
