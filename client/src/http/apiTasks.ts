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

export const fetchTaskCategories = async (taskId: number): Promise<Category[]> => {
  try {
    const response = await $host.get(`/api/tasks/${taskId}/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching task categories:", error);
    throw error;
  }
};

export const addCategoriesToTask = async (taskId: number, categoryIds: number[]) => {
  try {
    await $host.post(`/api/tasks/${taskId}/categories`, { categoryIds }); // Отправляем POST-запрос на сервер
  } catch (error) {
    console.error("Error adding categories to task:", error);
    throw error;
  }
};

// export const removeCategoriesFromTask = async (taskId: number, categoryIds: number[]) => {
//   try {
//     await $host.delete(`/api/tasks/${taskId}/categories`, { data: { categoryIds } }); // Отправляем DELETE-запрос на сервер с данными о категориях
//   } catch (error) {
//     console.error("Error removing categories from task:", error);
//     throw error;
//   }
// };
export const removeCategoryFromTask = async (taskId: number, categoryId: number) => {
  try {
    const response = await $host.delete(`/api/tasks/${taskId}/categories/${categoryId}`);
    return response.data; // Если вы хотите обработать ответ сервера
  } catch (error) {
    console.error('Error removing category from task:', error);
    throw error;
  }
};