import api from "./axios";

export const getSummary = async () => {
    const response = await api.get(
        "/dashboard/summary"
    );

    return response.data;
};

export const getWarranty = async () => {
    const response = await api.get(
        "/dashboard/warranty"
    );

    return response.data;
};

export const getExpiringAssets =
    async () => {
        const response =
            await api.get(
                "/dashboard/expiring-assets"
            );

        return response.data;
    };