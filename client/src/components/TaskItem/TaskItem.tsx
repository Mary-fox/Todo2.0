import React, { useState, useEffect } from "react";
import "./TaskItem.css";
import classNames from "classnames";
import { Task, Category } from "../../../../server/src/types/types";
import {
  deleteTask,
  updateTask,
  fetchCategories,
  fetchTaskCategories,
  addCategoriesToTask,
  removeCategoryFromTask,
} from "../../http/apiTasks";

interface TaskItemProps {
  task: Task;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, setTasks }) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>(task.title);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]); // Добавляем состояние для категорий задачи
  const [editingCategories, setEditingCategories] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
        const taskCategoriesData = await fetchTaskCategories(task.id);
        setSelectedCategories(taskCategoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, [task.id]);

  const handleCategoryToggle = (categoryId: number) => {
    if (selectedCategories.some((category) => category.id === categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((c) => c.id !== categoryId),
      );
    } else {
      const selectedCategory = categories.find((c) => c.id === categoryId);
      if (selectedCategory) {
        setSelectedCategories([...selectedCategories, selectedCategory]);
      }
    }
  };

  async function handleAddCategories() {
    try {
      const categoryIdsToAdd = selectedCategories.map(
        (category) => category.id,
      );
      await addCategoriesToTask(task.id, categoryIdsToAdd);
      // Обновляем данные категорий для задачи
      const updatedCategories = await fetchTaskCategories(task.id);

      // Обновляем состояние задачи на клиенте
      const updatedTask = {
        ...task,
        categories: updatedCategories, // Добавляем выбранные категории к текущим категориям задачи
      };
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? updatedTask : t)),
      );
      setSelectedCategories(updatedCategories);

      setEditingCategories(false);
    } catch (error) {
      console.error("Error adding categories:", error);
    }
  }

  // async function handleRemoveCategories() {
  //   try {
  //     const categoryIdsToRemove = selectedCategories.map(
  //       (category) => category.id,
  //     );
  //     await removeCategoriesFromTask(task.id, categoryIdsToRemove);

  //     // Обновляем данные категорий для задачи после удаления
  //     const updatedCategories = await fetchTaskCategories(task.id);

  //     // Обновляем состояние задачи на клиенте
  //     const updatedTask = {
  //       ...task,
  //       categories: updatedCategories, // Обновляем категории в состоянии задачи
  //     };
  //     setTasks((prevTasks) =>
  //       prevTasks.map((t) => (t.id === task.id ? updatedTask : t)),
  //     );
  //     setSelectedCategories(updatedCategories);

  //     // Завершаем режим редактирования категорий
  //     setEditingCategories(false);
  //   } catch (error) {
  //     console.error("Error removing categories:", error);
  //   }
  // }
  async function handleRemoveCategory(categoryId: number) {
    try {
      await removeCategoryFromTask(task.id, categoryId);
      // Обновляем данные категорий для задачи после удаления
      const updatedCategories = await fetchTaskCategories(task.id);

      // Обновляем состояние задачи на клиенте
      const updatedTask = {
        ...task,
        categories: updatedCategories, // Обновляем категории в состоянии задачи
      };
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? updatedTask : t)),
      );
      setSelectedCategories(updatedCategories);
    } catch (error) {
      console.error("Error removing category:", error);
    }
  }

  async function handleDelete() {
    try {
      await deleteTask(task.id);
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  async function handleEdit() {
    setEditing(true);
  }

  async function handleCancel() {
    setEditing(false);
    setEditValue(task.title);
  }

  async function handleSave() {
    try {
      const updatedTask = { ...task, title: editValue };
      await updateTask(task.id, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? updatedTask : t)),
      );
      setEditing(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }
  async function handleComplete() {
    try {
      const updatedTask = { ...task, completed: !task.completed };
      await updateTask(task.id, updatedTask); // Ожидаем, пока задача обновится на сервере
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? updatedTask : t)),
      ); // Обновляем локальное состояние клиента с новым статусом задачи
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  return (
    <li key={task.id} className="task">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleComplete}
      />
      {editing ? (
        <>
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <div className="task__buttons">
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <span
            className={classNames("task__text", {
              task_completed: task.completed,
            })}
          >
            {task.title}
          </span>
          {selectedCategories.map((category) => (
            <div className="category-chip" key={category.id}>
              {category.name}
              <button onClick={() => handleRemoveCategory(category.id)}>
                x
              </button>
            </div>
          ))}
          <div className="task__buttons">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            {editingCategories && (
              <button onClick={() => setEditingCategories(false)}>
                Cancel
              </button>
            )}
            {!editingCategories && (
              <button onClick={() => setEditingCategories(true)}>
                Manage Categories
              </button>
            )}
          </div>
        </>
      )}
      {editingCategories && (
        <div className="category-dialog">
          <h3>Manage Categories</h3>
          {categories.map((category) => (
            <label key={category.id}>
              <input
                type="checkbox"
                checked={selectedCategories.some((c) => c.id === category.id)}
                onChange={() => handleCategoryToggle(category.id)}
              />
              {category.name}
            </label>
          ))}
          <button onClick={handleAddCategories}>Add Categories</button>
          {/* <button onClick={handleRemoveCategories}>Remove Categories</button> */}
          <button onClick={() => setEditingCategories(false)}>Cancel</button>
        </div>
      )}
    </li>
  );
};

export default TaskItem;
