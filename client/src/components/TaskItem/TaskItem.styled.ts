import { styled } from "styled-components";

export const Wrapper = styled.div`
  position: relative;
`;

export const Item = styled.li`
  display: flex;
  gap: 5px;
  counter-increment: task-counter;
  border: 1px solid #979393;
  border-radius: 8px;
  padding: 10px;
  background-color: #2e2d39;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
  align-items: baseline;
  position: relative;
  &::before {
    content: counter(task-counter) ". ";
  margin-right: 0.5em;
  }
  &:hover {
    background-color: #403f52;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

export const TaskTitle = styled.div`
  display: flex;
  gap: 10px;
  align-items: baseline;
  width: 100%;
`;

export const TaskText = styled.span`
  font-size: 21px;
  font-family: cursive;
  &.task_completed {
    text-decoration: line-through;
  color: #a0a0a0;;
  }
`;

export const TaskBtns = styled.div`
  margin-left: auto;
  display: flex;
  gap: 10px;
`;

export const TaskContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 30px;
`;

export const TaskMain = styled.div`
  display: flex;
`;






