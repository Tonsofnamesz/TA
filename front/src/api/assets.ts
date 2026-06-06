import api from "./axios";

export const getAssets = async () => {
  const res = await api.get("/assets");
  return res.data;
};

export const getAsset = async (id: number) => {
  const res = await api.get(`/assets/${id}`);
  return res.data.data;
};

export const createAsset = async (data: any) => {
  const res = await api.post("/assets", data);
  return res.data;
};

export const updateAsset = async (
  id: number,
  data: any
) => {
  const res = await api.put(
    `/assets/${id}`,
    data
  );

  return res.data;
};

export const deleteAsset = async (id: number) => {
    const res = await api.delete(`/assets/${id}`);
    return res.data;
};