import axios, { AxiosInstance } from "axios";
import { getCookie } from "cookies-next";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const createApiInstance = (): AxiosInstance => {
  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
  });

  api.interceptors.request.use((config) => {
    const token = getCookie("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return api;
};

const api = createApiInstance();

export interface UserData {
  id: string;
  username: string;
  email: string;
  password: string;
  age: number;
  gender: string;
  interests: string[];
  friends: string[];
}

export const fetchUserData = async (userId: string): Promise<UserData> => {
  const response = await api.get<UserData>(`/api/fetch-user-data/${userId}`);
  return response.data;
};

export const fetchAllUsers = async (): Promise<UserData[]> => {
  const response = await api.get<UserData[]>(`/api/fetch-all-users`);
  return response.data;
};

export const updateUserData = async (
  userId: string,
  data: Partial<UserData>
): Promise<UserData> => {
  const response = await api.put<UserData>(
    `/api/update-user-data/${userId}`,
    data
  );
  return response.data;
};
