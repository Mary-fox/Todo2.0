import React from "react";
import { LoaderContainer, Spiner } from "./Loader.styled";

const Loader: React.FC = () => {
  return (
    <LoaderContainer>
      <Spiner />
    </LoaderContainer>
  );
};

export default Loader;
