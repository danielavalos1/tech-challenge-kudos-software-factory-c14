const baseurl = import.meta.env.VITE_BACKEND_URL as string;

export async function login(email: string, password: string) {
  const response = await fetch(`${baseurl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(await response.json());
  }

  return response.json();
}

export default {
  login,
};
