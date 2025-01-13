import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

// Määritä setToken-metodi
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

// Määritä getAll-metodi
const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};

// Vie objektit mukaan, mukaan lukien setToken
export default { getAll, setToken };
