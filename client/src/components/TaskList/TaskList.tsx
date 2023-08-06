import React from "react";
import { Task } from "../../../../server/src/types/types";
import "./TaskList.css";
import TaskItem from "../TaskItem/TaskItem";

interface TaskListProps {
  tasks: Task[];
  filteredTasks: Task[]; // Add filteredTasks to the interface
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList: React.FC<TaskListProps> = ({ filteredTasks, setTasks }) => {
  return (
    <ol className="tasks">
      {Array.isArray(filteredTasks)
        ? filteredTasks.map((task) => (
            <TaskItem
              key={task.id} // Use task.id as the key
              task={task}
              setTasks={setTasks}
            />
          ))
        : null}
    </ol>
  );
};

export default TaskList;
