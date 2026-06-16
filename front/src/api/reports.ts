import api from "./axios";

export const getWarrantyReport = async () => {
    const res = await api.get(
        "/reports/warranty"
    );

    return res.data;
};

export const getAssetReport = async () => {
    const res = await api.get(
        "/reports/assets"
    );

    return res.data;
};