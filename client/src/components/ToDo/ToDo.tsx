import React, { useState, useEffect } from "react";
import TaskForm from "../TaskForm/TaskForm";
import TaskList from "../TaskList/TaskList";
import { Category, Task } from "../../../../server/src/types/types";
import { fetchTasks } from "../../http/apiTasks";

const ToDo: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskFilter, setTaskFilter] = useState<string>("");
  // const [categories, setCategories] = useState<Category[]>([]);
  const [categories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    undefined,
  );
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasksFromApi();
    // fetchCategories();
  }, []);

  useEffect(() => {
    // Filter tasks based on the selected category
    if (selectedCategory !== undefined) {
      const filtered = tasks.filter(
        (task) => task.categoryId === selectedCategory,
      );
      setFilteredTasks(filtered);
    } else {
      setFilteredTasks(tasks);
    }
  }, [selectedCategory, tasks]);

  useEffect(() => {
    // Фильтруем задачи на основе текста из инпута
    const filtered = tasks.filter((task) =>
      task.title.toUpperCase().includes(taskFilter.toUpperCase()),
    );
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

  // const fetchCategories = async () => {
  //   try {
  //     const response = await $host.get<Category[]>("/api/categories");
  //     setCategories(response.data);
  //   } catch (error) {
  //     console.error("Error fetching categories:", error);
  //   }
  // };

  // const seedCategories = async () => {
  //   try {
  //     await $host.get("/api/seed-categories");
  //     fetchCategories();
  //   } catch (error) {
  //     console.error("Error seeding categories:", error);
  //   }
  // };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const categoryId = event.target.value
      ? Number(event.target.value)
      : undefined;
    setSelectedCategory(categoryId);
  };

  return (
    <div className="tasks__block">
      <h1 className="tasks__title">My Todo List</h1>
      <input
        value={taskFilter}
        type="text"
        placeholder="filter"
        onChange={(e) => setTaskFilter(e.target.value)}
      />
      {/* <button onClick={seedCategories}>Seed Categories</button> */}
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value={undefined}>All</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <TaskList
        tasks={tasks}
        filteredTasks={filteredTasks}
        setTasks={setTasks}
      />
      <TaskForm setTasks={setTasks} categories={categories} />
    </div>
  );
};

export default ToDo;
