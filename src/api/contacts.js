import axiosInstance from "./axios";

export const getContacts = async () => {
  return await axiosInstance.get("/contacts");
};

export const addContact = async (user) => {
  return await axiosInstance.post("/contacts", user);
};
