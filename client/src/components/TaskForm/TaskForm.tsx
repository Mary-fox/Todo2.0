import React, { useState } from "react";
import { Task } from "../../types/types";
import { addTask } from "../../http/apiTasks";
import { Form, FormInput, FormBtn } from "./TaskForm.styled";

interface TaskFormProps {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskForm: React.FC<TaskFormProps> = ({ setTasks }) => {
  const [taskText, setTaskText] = useState<string>("");

  const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskText.trim() === "") return;
    try {
      const newTask: Partial<Task> = {
        title: taskText,
        completed: false,
      };

      const addedTask = await addTask(newTask as Task);
      setTaskText("");
      setTasks((prevTasks) => [...prevTasks, addedTask]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <Form onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleAddTask(event)}>
      <FormInput
        type="text"
        placeholder={"Add task..."}
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      <FormBtn>Add Task</FormBtn>
    </Form>
  );
};

export default React.memo(TaskForm, () => true);
