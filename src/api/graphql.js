const GRAPHQL_URL = "https://learn.reboot01.com/api/graphql-engine/v1/graphql";

export async function runQuery(query, variables = {}) {
  const token = localStorage.getItem("jwt");
  if (!token) throw new Error("Not authenticated");

  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors[0].message);
  }
  return json.data;
}