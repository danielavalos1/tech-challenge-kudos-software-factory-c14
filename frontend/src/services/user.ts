import { User } from "../types";
const baseurl = import.meta.env.VITE_BACKEND_URL as string;

export async function createOne(
  record: Omit<User, "id, password">,
  token: string
) {
  const response = await fetch(`${baseurl}/upload/one`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(record),
  });

  if (!response.ok) {
    return response.json();
  }

  return response.json();
}

export async function uploadFile(file: File, token: string) {
  const text = await file.text();
  const response = await fetch(`${baseurl}/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "text/csv",
    },
    body: text,
  });
  if (!response.ok) {
    throw new Error(await response.json());
  }
  return response.json();
}
