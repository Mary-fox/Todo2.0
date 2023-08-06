import React, { useState } from "react";
import classNames from "classnames";
import { Task } from "../../../../server/src/types/types";
import { deleteTask, fetchTasks, updateTask } from "../../http/apiTasks";

interface TaskItemProps {
  task: Task;
  setTasks: (tasks: Task[]) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, setTasks }) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>(task.title);

  async function handleDelete() {
    try {
      await deleteTask(task.id);
      const updatedTasks = await fetchTasks();
      setTasks(updatedTasks); // Обновляем список задач после успешного удаления
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

  // async function handleSave() {
  //   try {
  //     const updatedTask = { ...task, title: editValue };
  //     // Ваш код для обновления задачи на сервере, если нужно
  //     setEditing(false);
  //   } catch (error) {
  //     console.error("Error updating task:", error);
  //   }
  // }

  async function handleComplete() {
    try {
      const updatedTask = { ...task, completed: !task.completed };
      updateTask(task.id, updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  return (
    <li className="task">
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
            {/* <button onClick={handleSave}>Save</button> */}
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
