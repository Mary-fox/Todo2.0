import React, { useState } from "react";
import { Task } from "../../../../server/src/types/types";
import "./TaskForm.css";
import { addTask } from "../../http/apiTasks";

interface TaskFormProps {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskForm: React.FC<TaskFormProps> = ({ setTasks }) => {
  const [taskText, setTaskText] = useState<string>("");

  const handleAddTask = async () => {
    if (taskText.trim() === "") return;
    try {
      const newTask: Partial<Task> = {
        title: taskText,
        completed: false,
      };

      const addedTask = await addTask(newTask as Task);
      setTasks((prevTasks) => [...prevTasks, addedTask]);
      setTaskText("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="task-form">
      <input type="text" value={taskText} onChange={(e) => setTaskText(e.target.value)} />
      <button onClick={handleAddTask}>Add Task</button>
      {/* <select>
        <option value={undefined}>Select Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select> */}
    </div>
  );
};

export default TaskForm;
