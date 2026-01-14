import api from "./api";

const taskService = {
  getTasks: async () => (await api.get("/api/tasks/")).data,
  getTask: async (id) => (await api.get(`/api/tasks/${id}`)).data,
  createTask: async (payload) => (await api.post("/api/tasks/", payload)).data,
  updateTask: async (id, payload) =>
    (await api.put(`/api/tasks/${id}`, payload)).data,
  deleteTask: async (id) => api.delete(`/api/tasks/${id}`),
};

export default taskService;
