import { styled } from "styled-components";

export const CategoryBlock = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    border: 1px solid #979393;
    border-radius: 8px;
    background-color: #2e2d39;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 100;
`;
export const Dropdown = styled.div`
    padding: 5px;
    display: flex;
    align-items: center;
    font-family: cursive;
`;
export const DropdownItem = styled.label`
    margin-left: 10px;
    user-select: none;
    cursor: pointer;
    font-family: cursive;
    &hover {
      cursor: pointer;
    }
`;
export const DropdownInput = styled.input`
  margin-right: 10px;
  cursor: pointer;
`;

  