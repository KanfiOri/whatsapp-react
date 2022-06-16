import axiosInstance from "./axios";

export const getContacts = async () => {
  return await axiosInstance.get("/contacts");
};
