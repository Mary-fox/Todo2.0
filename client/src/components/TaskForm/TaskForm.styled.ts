import { styled } from "styled-components";
export const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 97%;
  background-color: #fff;
  border-radius: 5px;
  padding: 8px;
  margin-bottom: 12px;
`;
export const FormInput = styled.input`
  padding: 5px;
  border: none;
  font-size: 18px;
  font-family: cursive;
  &:focus {
    outline: none;
  }
`;
export const FormBtn = styled.button`
  border-radius: 8px;
  color: #FFF;
  background-color: #3f3c5f;
  padding: 8px 12px;
  font-size: 16px;
  font-weight: 400;
  font-family: cursive;
  &:hover {
    background-color: #474658;
  }
`;


