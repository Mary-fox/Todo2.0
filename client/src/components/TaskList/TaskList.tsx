import React, { Dispatch, SetStateAction } from "react";
import { Task } from "../TaskItem/TaskItem";
import "./TaskList.css";
import TaskItem from "../TaskItem/TaskItem";

interface TaskListProps {
  tasks: Task[];
  filteredTasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  filteredTasks,
  setTasks,
}) => {
  return (
    <ol className="tasks">
      {filteredTasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          setTasks={setTasks}
          index={index}
          tasks={tasks}
        />
      ))}
    </ol>
  );
};

export default TaskList;

// import React, { useState } from "react";

// interface TreeNode {
//   id: number;
//   title: string;
//   open: boolean;
//   children: TreeNode[];
// }

// interface TreeProps {
//   data: TreeNode[];
// }
// import React, { useState } from "react";
// import { TreeNode } from "../AccordionItemList/AccordionItemList";
// import AccordionItemList from "../AccordionItemList/AccordionItemList";
// interface TreeProps {
//   data: TreeNode[];
// }

// const Accordion: React.FC<TreeProps> = ({ data }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [treeData, setTreeData] = useState(data);

//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const query = event.target.value.toLowerCase();
//     setSearchQuery(query);

//     if (query === "") {
//       setTreeData(data);
//     } else {
//       const filteredData = filterTreeData(data, query);
//       setTreeData(filteredData);
//     }
//   };

//   const filterTreeData = (
//     data: TreeNode[],
//     searchQuery: string,
//     parentOpen = false,
//   ): TreeNode[] => {
//     return data.map((item) => {
//       const isOpen =
//         parentOpen ||
//         item.title.toLowerCase().includes(searchQuery.toLowerCase());

//       const children = filterTreeData(item.children, searchQuery, isOpen);

//       return {
//         ...item,
//         open: isOpen || children.some((child) => child.open),
//       };
//     });
//   };
//   //обновляем состояние каждого элемента
//   const handleToggle = (id: number) => {
//     setTreeData((prevData) => {
//       return prevData.map((item) => {
//         if (item.id === id) {
//           return { ...item, open: !item.open };
//         } else if (item.children.length > 0) {
//           return { ...item, children: toggleChildren(item.children, id) };
//         }
//         return item;
//       });
//     });
//   };
//   //обновляем состояние дочерних элементов (children)
//   const toggleChildren = (children: TreeNode[], id: number): TreeNode[] => {
//     return children.map((item) => {
//       if (item.id === id) {
//         return { ...item, open: !item.open };
//       } else if (item.children.length > 0) {
//         return { ...item, children: toggleChildren(item.children, id) };
//       }
//       return item;
//     });
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={searchQuery}
//         onChange={handleSearch}
//         placeholder="Поиск по заголовку..."
//       />
//       <AccordionItemList data={treeData} handleToggle={handleToggle} />
//     </div>
//   );
// };

// export default Accordion;
// import React from "react";

// export interface TreeNode {
//   id: number;
//   title: string;
//   open: boolean;
//   children: TreeNode[];
// }
// interface AccordionItemListProps {
//   data: TreeNode[];
//   handleToggle: (id: number) => void;
// }

// const AccordionItemList: React.FC<AccordionItemListProps> = ({
//   data,
//   handleToggle,
// }) => {
//   return (
//     <div>
//       {data.map((item) => (
//         <div key={item.id}>
//           <div
//             style={{
//               paddingLeft: `${item.title.split(">").length * 10}px`,
//               display: "flex",
//             }}
//           >
//             <div
//               onClick={() => handleToggle(item.id)}
//               style={{ cursor: "pointer" }}
//             >
//               {item.open ? "v" : ">"}
//             </div>
//             <div>{item.title}</div>
//           </div>
//           {item.open && item.children.length > 0 && (
//             <AccordionItemList
//               data={item.children}
//               handleToggle={handleToggle}
//             />
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AccordionItemList;
