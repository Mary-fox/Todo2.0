import React, { useState, useMemo } from "react";
import "./TaskItem.css";
import classNames from "classnames";

export interface Task {
  text: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  setTasks: (tasks: Task[]) => void;
  index: number;
  tasks: Task[];
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  setTasks,
  index,
  tasks,
}) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null); //текущая задача
  const [editValue, setEditValue] = useState<string>(""); // значение текущей задачи
  const [isEditing, setIsEditing] = useState<boolean>(false); //состояние отображения

  function resetEditing() {
    setEditingIndex(null);
    setIsEditing(false);
  }

  function handleDelete(index: number) {
    if (index === editingIndex) {
      resetEditing();
    }
    const taskToDelete = tasks[index];
    const newTasks = tasks.filter((task) => task !== taskToDelete);
    setTasks(newTasks);
  }

  function handleEdit(index: number) {
    setEditingIndex(index);
    setEditValue(tasks[index].text);
    setIsEditing(true);
  }

  function handleCancel() {
    resetEditing();
  }

  function handleSave() {
    const newTasks = tasks.map((task, index) =>
      index === editingIndex ? { ...task, text: editValue } : task,
    );
    setTasks(newTasks);
    resetEditing();
  }

  function handleComplete(index: number) {
    const newTasks = tasks.map((task, i) =>
      i === index
        ? {
            ...task,
            completed: !task.completed,
          }
        : task,
    );
    setTasks(newTasks);
  }

  //определяем индекс текущей задачи, чтобы выполнять операции над ней(редактирование или удаление.)Чтобы не было ошибок с индексом при отфильтрованном индексе.
  const originalIndex = useMemo(
    () => tasks.findIndex((t) => t === task),
    [tasks, task],
  );

  return (
    <li key={index} className="task">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => handleComplete(originalIndex)}
      />
      {originalIndex === editingIndex && isEditing ? (
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
            {task.text}
          </span>

          <div className="task__buttons">
            <button onClick={() => handleEdit(originalIndex)}>Edit</button>
            <button onClick={() => handleDelete(originalIndex)}>Delete</button>
          </div>
        </>
      )}
    </li>
  );
};
export default TaskItem;
