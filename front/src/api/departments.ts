
import api from "./axios";

export interface Department {
    id: number;
    name: string;
    created_at?: string;
    updated_at?: string;
}

export const getDepartments = async (): Promise<Department[]> => {
    const res = await api.get("/departments");
    return res.data;
};

export const createDepartment = async (
    data: { name: string }
): Promise<Department> => {
    const res = await api.post("/departments", data);
    return res.data;
};

export const updateDepartment = async (
    id: number,
    data: { name: string }
): Promise<Department> => {
    const res = await api.put(`/departments/${id}`, data);
    return res.data;
};

export const deleteDepartment = async (id: number) => {
    const res = await api.delete(`/departments/${id}`);
    return res.data;
};
