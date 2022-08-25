import React from "react";
import ReactLoading from "react-loading";

export const LoadingSuspense = ({ type, color }) => {
  return (
    <div className="min-h-[100vh] flex justify-center items-center">
      <ReactLoading type={type} color={color} height={"10%"} width={"10%"} />
    </div>
  );
};
