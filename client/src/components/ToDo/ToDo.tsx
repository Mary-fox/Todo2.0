import React, { useState, useEffect } from "react";
import TaskForm from "../TaskForm/TaskForm";
import TaskList from "../TaskList/TaskList";
import Loader from "../Loader/Loader";
import { Category, Task } from "../../types/types";
import { fetchTasks, fetchCategories, fetchTaskCategories } from "../../http/apiTasks";
import { TaskTitle, TaskBlock, TaskFilter, TaskFiltersBlock, TaskSelect } from "./ToDo.styled";

const ToDo: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskFilter, setTaskFilter] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTasksFromApi();
    fetchCategoriesFromApi();
  }, []);

  useEffect(() => {
    // Фильтруем задачи на основе текста из инпута или категорий
    const filtered = tasks.filter((task) => {
      // Получаем массив ID категорий для данной задачи
      const taskCategoryIds = task.categories?.map((category) => category.id) || [];
      return (
        task.title.toUpperCase().includes(taskFilter.toUpperCase()) &&
        (!selectedCategory || (taskCategoryIds && taskCategoryIds.includes(selectedCategory)))
      );
    });
    setFilteredTasks(filtered);
  }, [taskFilter, selectedCategory, tasks]);

  const fetchTasksFromApi = async () => {
    try {
      setIsLoading(true);
      const tasks = await fetchTasks();
      // Для каждой задачи запрашиваем её категории с сервера
      const tasksWithCategories = await Promise.all(
        tasks.map(async (task: Task) => {
          const categories = await fetchTaskCategories(task.id);
          // Возвращаем объект задачи, дополненный списком категорий
          return { ...task, categories };
        }),
      );
      // Сортируем задачи с категориями по ID
      const sortedTasks = tasksWithCategories.sort((a, b) => a.id - b.id);

      setTasks(sortedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategoriesFromApi = async () => {
    try {
      setIsLoading(true);
      const categories = await fetchCategories();
      setCategories(categories); // Обновляем состояние категорий
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = event.target.value ? Number(event.target.value) : undefined;
    setSelectedCategory(categoryId);
  };

  return (
    <TaskBlock>
      <TaskTitle>My Todo List</TaskTitle>
      <TaskForm setTasks={setTasks} />
      <TaskFiltersBlock>
        <TaskFilter
          value={taskFilter}
          type="text"
          placeholder="filter"
          onChange={(e) => setTaskFilter(e.target.value)}
        />
        <TaskSelect value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </TaskSelect>
      </TaskFiltersBlock>

      {isLoading ? <Loader /> : <TaskList tasks={tasks} filteredTasks={filteredTasks} setTasks={setTasks} />}
    </TaskBlock>
  );
};

export default React.memo(ToDo);
