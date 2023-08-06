import React, { useState } from "react";
import { Task, Category } from "../../../../server/src/types/types";
import "./TaskForm.css";

interface TaskFormProps {
  setTasks: (tasks: Task[]) => void;
  categories: Category[];
}

const TaskForm: React.FC<TaskFormProps> = ({ categories }) => {
  const [taskText, setTaskText] = useState<string>("");

  const handleAddTask = () => {
    if (taskText.trim() === "") return;
    // const newTask: Task = {
    //   id: tasks.length + 1, // Assuming you have a unique id for the tasks
    //   title: taskText, // Changed to title to match the Task interface
    //   completed: false,
    // };
    // setTasks([...tasks, newTask]);
    // setTaskText("");
  };

  return (
    <div className="task-form">
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
      <select>
        <option value={undefined}>Select Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TaskForm;
