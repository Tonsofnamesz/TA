import api from "./axios";

export const getSuppliers = async () => {
  const res = await api.get("/suppliers");
  return res.data;
};