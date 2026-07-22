import { api } from "@/api/client";

export async function registerUser(
  username: string,
  email: string,
  password: string,
) {
  const response = await api.post("/auth/register", {
    username,
    email,
    password,
  });

  return response.data;
}

export async function loginUser(
  email: string,
  password: string,
) {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;
}