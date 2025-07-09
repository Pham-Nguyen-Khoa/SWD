// src/api/userApi.js

import axiosClient from "../axiosClient";

const studentApi = {
  getProfile: () => axiosClient.get("/v1/account/profile"),
  getDetailStudent: (idStudent) => axiosClient.get(`/admin/v1/student/${idStudent}`),
  updateProfile: (data) => axiosClient.put("/user/profile", data),
  changePassword: (data) => axiosClient.patch("/user/password", data),
};

export default studentApi;
