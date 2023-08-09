import React, { useState } from "react";
import { Task } from "../../../../server/src/types/types";
import "./TaskList.css";
import TaskItem from "../TaskItem/TaskItem";

interface TaskListProps {
  tasks: Task[];
  filteredTasks: Task[]; // Add filteredTasks to the interface
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList: React.FC<TaskListProps> = ({ filteredTasks, setTasks }) => {
  const [editingCategories, setEditingCategories] = useState<number | boolean>(
    false,
  );

  const toggleCategoryDropdown = (taskId: number) => {
    if (editingCategories === taskId) {
      setEditingCategories(false); // Закрыть список, если он уже открыт
    } else {
      setEditingCategories(taskId); // Открыть список для выбранной задачи
    }
  };
  return (
    <ol className="tasks">
      {Array.isArray(filteredTasks)
        ? filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              setTasks={setTasks}
              editingCategories={editingCategories === task.id} // Use editingCategories directly
              toggleCategoryDropdown={toggleCategoryDropdown}
            />
          ))
        : null}
    </ol>
  );
};

export default TaskList;
