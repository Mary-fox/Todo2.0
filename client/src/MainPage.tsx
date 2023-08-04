import React from "react";
import "./MainPage.css";
import ToDo from "./components/ToDo/ToDo";

const MainPage: React.FC = () => {
  return (
    <div className="wrapper">
      <ToDo />
    </div>
  );
};

export default MainPage;
