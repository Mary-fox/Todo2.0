import React, { useState } from "react";
import "./TaskItem.css";
import classNames from "classnames";
import { Task } from "../../../../server/src/types/types";
import { deleteTask, updateTask } from "../../http/apiTasks";

interface TaskItemProps {
  task: Task;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, setTasks }) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>(task.title);

  async function handleDelete() {
    try {
      await deleteTask(task.id);
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id)); // Remove the deleted task from the list
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

          <div className="task__buttons">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
    </li>
  );
};

export default TaskItem;
