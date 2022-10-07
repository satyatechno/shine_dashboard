import axiosInstance from "./axiosInstance";

export const getDashboardStructure = () => axiosInstance.get("menu-structure.json");
export const getTableData = (url) => axiosInstance.get(url);
