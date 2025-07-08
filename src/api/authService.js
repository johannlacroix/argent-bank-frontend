import axios from "axios";

const API_URL = "http://localhost:3001/api/v1/user";

export const login = async (email, password) => {
  return axios.post(`${API_URL}/login`, {
    email,
    password,
  });
};

export const getProfile = async (token) => {
  return axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProfile = async (token, newUserName) => {
  return axios.put(
    `${API_URL}/profile`,
    { userName: newUserName },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
