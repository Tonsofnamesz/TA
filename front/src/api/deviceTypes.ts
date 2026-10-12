import api from "./axios";

export const getDeviceTypes = async () => {
    const res = await api.get("/device-types");
    return res.data;
};

export const createDeviceType = async (data: { name: string }) => {
    const res = await api.post("/device-types", data);
    return res.data;
};

export const updateDeviceType = async (
    id: number,
    data: { name: string }
) => {
    const res = await api.put(`/device-types/${id}`, data);
    return res.data;
};

export const deleteDeviceType = async (id: number) => {
    const res = await api.delete(`/device-types/${id}`);
    return res.data;
};
