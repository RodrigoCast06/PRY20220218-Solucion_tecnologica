import { baseUrl } from "./base";

export const fetchCustom = async ({ path, method = "GET", body }: any) => {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};
