import { $host } from "./Api";
import { Task, Category } from "../../../server/src/types/types";

export const fetchTasks = async () => {
  try {
    const response = await $host.get("/api/tasks");
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const addTask = async (task: Task) => {
  try {
    const response = await $host.post("/api/tasks", task);
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export const updateTask = async (
  taskId: number,
  updatedTask: Partial<Task>,
): Promise<Task> => {
  try {
    const response = await $host.put(`/api/tasks/${taskId}`, updatedTask);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const deleteTask = async (id: number) => {
  try {
    const { data } = await $host.delete(`/api/tasks/${id}`);
    return data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await $host.get("/api/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};