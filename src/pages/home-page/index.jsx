import React from "react";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="pt-4">
      <Outlet />
    </div>
  );
};

export default HomePage;
