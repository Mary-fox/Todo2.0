import React, { useState, useMemo } from "react";
import "./ToDo.css";
import { Task } from "../TaskItem/TaskItem";
import TaskForm from "../TaskForm/TaskForm";
import TaskList from "../TaskList/TaskList";

function ToDo() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskFilter, setTaskFilter] = useState<string>("");

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) =>
      task.text.toUpperCase().includes(taskFilter.toUpperCase()),
    );
  }, [tasks, taskFilter]);

  return (
    <div className="tasks__block">
      <h1 className="tasks__title">My Todo List</h1>
      <input
        value={taskFilter}
        type="text"
        placeholder="filter"
        onChange={(e) => setTaskFilter(e.target.value)}
      />
      <TaskList
        tasks={tasks}
        setTasks={setTasks}
        filteredTasks={filteredTasks}
      />
      <TaskForm setTasks={setTasks} />
    </div>
  );
}

export default ToDo;
