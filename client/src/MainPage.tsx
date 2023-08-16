import React from "react";
import ToDo from "./components/ToDo/ToDo";
import { Wrapper } from "./MainPage.styled";

const MainPage: React.FC = () => {
  return (
    <Wrapper>
      <ToDo />
    </Wrapper>
  );
};

export default MainPage;
