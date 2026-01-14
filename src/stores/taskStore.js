import { create } from "zustand";
import taskService from "../services/taskService";

export const useTaskStore = create((set, get) => ({
  tasks: [],
  loading: false,

  fetchTasks: async () => {
    set({ loading: true });
    const tasks = await taskService.getTasks();
    set({ tasks, loading: false });
  },

  deleteTaskOptimistic: async (id) => {
    const prev = get().tasks;
    set({ tasks: prev.filter((t) => t.id !== id) });

    try {
      await taskService.deleteTask(id);
      await useTaskStore.fetchTasks();
    } catch {
      set({ tasks: prev });
    }
  },
}));
