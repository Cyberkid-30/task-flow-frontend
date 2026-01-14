import api from "./api";

const authService = {
  login: async (payload) => {
    const res = await api.post("/api/auth/login", payload);
    return res.data;
  },
  register: async (payload) => {
    const res = await api.post("/api/auth/register", payload);
    return res.data;
  },
  me: async () => (await api.get("/api/auth/me")).data,
};

export default authService;
