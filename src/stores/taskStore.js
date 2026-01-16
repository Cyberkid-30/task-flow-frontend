import { create } from "zustand";
import taskService from "../services/taskService";

export const useTaskStore = create((set, get) => ({
  tasks: [],
  isLoading: false,

  fetchTasks: async () => {
    set({ isLoading: true });
    const tasks = await taskService.getTasks();
    set({ tasks, isLoading: false });
  },

  createTask: async (task) => {
    set({ isLoading: true });
    await taskService.createTask(task);
    set({ isLoading: false });
  },

  updateTask: async (id, task) => {
    set({ isLoading: true });
    await taskService.updateTask(id, task);
    set({ isLoading: false });
  },

  deleteTaskOptimistic: async (id) => {
    const prev = get().tasks;
    set({ tasks: prev.filter((t) => t.id !== id) });

    try {
      set({ isLoading: true });
      await taskService.deleteTask(id);
      set({ isLoading: false });
      await useTaskStore.fetchTasks();
    } catch {
      set({ tasks: prev });
    }
  },
}));
