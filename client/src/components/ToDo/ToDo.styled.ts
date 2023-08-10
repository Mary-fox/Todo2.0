import { styled } from "styled-components";

export const TaskTitle = styled.h1`
  color: #fff;
  font-family: cursive;
`;
export const TaskBlock = styled.div`
  max-width: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  text-align: center;
`;
export const TaskFilter= styled.input`
  width: 97%;
  background-color: #fff;
  border-radius: 5px;
  padding: 8px;
  font-size: 18px;
  font-family: cursive;
  &:focus {
    outline: none;
  }
`;
export const TaskFiltersBlock= styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
`;
export const TaskSelect= styled.select`
  width: 43%;
  border-radius: 5px;
  padding: 8px;
  font-size: 16px;
  font-family: cursive;
    &:hover {
      cursor: pointer;
    }
    &:focus {
      outline: none;
    }
`;






