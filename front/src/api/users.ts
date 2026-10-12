
import api from "./axios";

export interface UserRole {
    id: number;
    name: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    roles: UserRole[];
    created_at: string;
}

export interface CreateUserData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: "admin" | "viewer";
}

export interface UpdateUserData {
    name?: string;
    email?: string;
    password?: string;
    password_confirmation?: string;
    role?: "admin" | "viewer";
}

export const getUsers = async (): Promise<User[]> => {
    const res = await api.get("/users");
    return res.data;
};

export const createUser = async (data: CreateUserData) => {
    const res = await api.post("/users", data);
    return res.data;
};

export const updateUser = async (
    id: number,
    data: UpdateUserData
) => {
    const res = await api.put(`/users/${id}`, data);
    return res.data;
};

export const deleteUser = async (id: number) => {
    const res = await api.delete(`/users/${id}`);
    return res.data;
};
