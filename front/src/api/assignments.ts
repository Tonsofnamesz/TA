import api from "./axios";

export const getAssignments = async () => {
    const res = await api.get("/asset-assignments");
    return res.data;
};

export const getAssignment = async (
    id: number
) => {
    const res = await api.get(
        `/asset-assignments/${id}`
    );

    return res.data;
};

export const createAssignment = async (data: any) => {
    const res = await api.post(
        "/asset-assignments",
        data
    );

    return res.data;
};

export const updateAssignment = async (
    id: number,
    data: any
) => {
    const res = await api.put(
        `/asset-assignments/${id}`,
        data
    );

    return res.data;
};

export const deleteAssignment = async (
    id: number
) => {
    const res = await api.delete(
        `/asset-assignments/${id}`
    );

    return res.data;
};

export const returnAssignment = async (
    id: number
) => {
    const res = await api.post(
        `/asset-assignments/${id}/return`
    );

    return res.data;
};