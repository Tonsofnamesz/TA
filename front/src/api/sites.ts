import api from "./axios";

export interface SitePayload {
    site_code: string;
    site_name: string;
    country: string;
}

export interface Site extends SitePayload {
    id: number;
    created_at?: string;
    updated_at?: string;
}

export const getSites = async (): Promise<Site[]> => {
    const res = await api.get("/sites");
    return res.data;
};

export const createSite = async (
    data: SitePayload
): Promise<Site> => {
    const res = await api.post("/sites", data);
    return res.data;
};

export const updateSite = async (
    id: number,
    data: SitePayload
): Promise<Site> => {
    const res = await api.put(`/sites/${id}`, data);
    return res.data;
};

export const deleteSite = async (id: number) => {
    const res = await api.delete(`/sites/${id}`);
    return res.data;
};
