const SIGNIN_URL = "https://learn.reboot01.com/api/auth/signin";
const GRAPHQL_URL = "https://learn.reboot01.com/api/graphql-engine/v1/graphql";

export async function login(identifier, password) {
  const token = btoa(`${identifier}:${password}`);

  const res = await fetch(SIGNIN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${token}`,
    },
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Invalid username/email or password.");
    }
    throw new Error(`Server error: ${res.status}`);
  }

  let jwt = await res.text();
  jwt = jwt.replace(/^"|"$/g, "");

  localStorage.setItem("jwt", jwt);
  return jwt;
}

export default function logout() {
  localStorage.removeItem("jwt");
}

export function getToken() {
  return localStorage.getItem("jwt");
}

export async function isAuthenticated() {
  const token = getToken();
  if (!token) return false;

  const query = `{ user { id login } }`;

  try {
    const res = await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    });
    const json = await res.json();
    return Boolean(json.data?.user?.length);
  } catch (err) {
    console.error("Auth check failed:", err);
    return false;
  }
}