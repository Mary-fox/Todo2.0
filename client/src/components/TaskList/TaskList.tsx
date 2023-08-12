import React, { useState } from "react";
import { Task } from "../../types/types";
import TaskItem from "../TaskItem/TaskItem";
import { List } from "./TaskList.styled";

interface TaskListProps {
  tasks: Task[];
  filteredTasks: Task[]; // Add filteredTasks to the interface
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList: React.FC<TaskListProps> = ({ filteredTasks, setTasks }) => {
  const [editingCategories, setEditingCategories] = useState<number | boolean>(false);

  const toggleCategoryDropdown = (taskId: number) => {
    if (editingCategories === taskId) {
      setEditingCategories(false); // Закрыть список, если он уже открыт
    } else {
      setEditingCategories(taskId); // Открыть список для выбранной задачи
    }
  };
  return (
    <List>
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
    </List>
  );
};

export default React.memo(TaskList);
