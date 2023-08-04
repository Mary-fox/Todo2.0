import React, { useState, useCallback, ChangeEvent } from "react";
import { Task } from "../TaskItem/TaskItem";
import "./TaskForm.css";

interface TaskFormProps {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskForm: React.FC<TaskFormProps> = ({ setTasks }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (inputValue.trim() === "") return;
      setTasks((prevTasks) => [
        ...prevTasks,
        { text: inputValue, completed: false },
      ]);
      setInputValue("");
    },
    [inputValue, setTasks],
  );

  return (
    <form className="tasks__form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="new task"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default React.memo(TaskForm);
