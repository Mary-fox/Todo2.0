import React, { useState, useEffect } from "react";
import TaskForm from "../TaskForm/TaskForm";
import TaskList from "../TaskList/TaskList";
import { Category, Task } from "../../../../server/src/types/types";
import { fetchTasks, fetchCategories } from "../../http/apiTasks";
import { TaskTitle, TaskBlock, TaskFilter, TaskFiltersBlock, TaskSelect } from "./ToDo.styled";

const ToDo: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskFilter, setTaskFilter] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasksFromApi();
    fetchCategoriesFromApi();
  }, []);

  useEffect(() => {
    // Фильтруем задачи на основе текста из инпута
    const filtered = tasks.filter((task) => task.title.toUpperCase().includes(taskFilter.toUpperCase()));
    setFilteredTasks(filtered);
  }, [taskFilter, tasks]);

  const fetchTasksFromApi = async () => {
    try {
      const tasks = await fetchTasks();
      setTasks(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  const fetchCategoriesFromApi = async () => {
    try {
      const categories = await fetchCategories();
      setCategories(categories); // Обновляем состояние категорий
    } catch (error) {
      console.error("Error fetching categories:", error);
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
          <option value={undefined}>All</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </TaskSelect>
      </TaskFiltersBlock>

      <TaskList tasks={tasks} filteredTasks={filteredTasks} setTasks={setTasks} />
    </TaskBlock>
  );
};

export default ToDo;
