import React, { useState, useEffect } from "react";
import { Task, Category } from "../../../../server/src/types/types";
import {
  deleteTask,
  updateTask,
  fetchCategories,
  fetchTaskCategories,
  removeCategoryFromTask,
} from "../../http/apiTasks";
import classNames from "classnames";
import { Wrapper, Item, TaskBtns, TaskContent, TaskMain, TaskText, TaskTitle } from "./TaskItem.styled";
//icons
import CategoryDropdown from "../CategoryDropdown/CategoryDropdown";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import saveIcon from "../../assets/icons/save.svg";
import cancelIcon from "../../assets/icons/cancel.svg";
import CategoryChips from "../CategoryChips/CategoryChips";

interface TaskItemProps {
  task: Task;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  editingCategories: boolean;
  toggleCategoryDropdown: (taskId: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, setTasks, editingCategories, toggleCategoryDropdown }) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>(task.title);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]); // состояние для категорий задачи

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
      setTasks((prevTasks) => prevTasks.map((t) => (t.id === task.id ? updatedTask : t)));
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
      setTasks((prevTasks) => prevTasks.map((t) => (t.id === task.id ? updatedTask : t)));
      setEditing(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }
  async function handleComplete() {
    try {
      const updatedTask = { ...task, completed: !task.completed };
      await updateTask(task.id, updatedTask); // Ожидаем, пока задача обновится на сервере
      setTasks((prevTasks) => prevTasks.map((t) => (t.id === task.id ? updatedTask : t))); // Обновляем локальное состояние клиента с новым статусом задачи
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  return (
    <Wrapper>
      <Item key={task.id}>
        <TaskContent>
          <TaskMain>
            <TaskTitle>
              <input type="checkbox" checked={task.completed} onChange={handleComplete} />
              {editing ? (
                <>
                  <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} />
                  <TaskBtns>
                    <button onClick={handleSave}>
                      <img src={saveIcon} alt="Save Icon" />
                    </button>
                    <button onClick={handleCancel}>
                      <img src={cancelIcon} alt="Cancel Icon" />
                    </button>
                  </TaskBtns>
                </>
              ) : (
                <>
                  <TaskText className={classNames({ task_completed: task.completed })}>{task.title}</TaskText>
                  <TaskBtns>
                    <button onClick={handleEdit}>
                      <img src={editIcon} alt="Edit Icon" />
                    </button>
                    <button onClick={handleDelete}>
                      <img src={deleteIcon} alt="Delete Icon" />
                    </button>
                  </TaskBtns>
                </>
              )}
            </TaskTitle>
          </TaskMain>
          <CategoryChips
            task={task}
            editingCategories={editingCategories}
            handleRemoveCategory={handleRemoveCategory}
            toggleCategoryDropdown={toggleCategoryDropdown}
            selectedCategories={selectedCategories}
          />
        </TaskContent>
      </Item>
      <CategoryDropdown
        task={task}
        setTasks={setTasks}
        categories={categories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        editingCategories={editingCategories}
        handleRemoveCategory={handleRemoveCategory}
      />
    </Wrapper>
  );
};

export default TaskItem;
