import React, { useState, useEffect } from "react";
// import axios from "axios";
import TaskForm from "../TaskForm/TaskForm";
import TaskList from "../TaskList/TaskList";
import { Category, Task } from "../../../../server/src/types/types";
// import { $host } from "../../http/Api";
import { fetchTasks } from "../../http/apiTasks"; // Import the functions

const ToDo: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
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

  // const fetchTasks = async () => {
  //   try {
  //     const response = await $host.get<Task[]>("/api/tasks");
  //     setTasks(response.data);
  //   } catch (error) {
  //     console.error("Error fetching tasks:", error);
  //   }
  // };
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
