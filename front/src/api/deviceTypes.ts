import api from "./axios";

export const getDeviceTypes = async () => {
  const res = await api.get("/device-types");
  return res.data;
};