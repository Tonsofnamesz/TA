import api from "./axios";
import type { LoginResponse } from "../types/auth";

export const loginRequest = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await api.post("/login", {
    email,
    password,
  });

  return response.data;
};