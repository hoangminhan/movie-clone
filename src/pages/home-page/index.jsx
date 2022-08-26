import { apiTrending } from "api";
import { useHomePage } from "hooks/use-homepage";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  const {
    handleGetMovie,
    handleGetListTrending,
    listMovie,
    detail,
  } = useHomePage();
  console.log({ listMovie, detail });
  const { getListTrendning } = apiTrending;
  useEffect(() => {
    console.log("hello");
    handleGetListTrending({
      api_key: process.env.REACT_APP_API_KEY,
    });
    handleGetMovie("popular", {
      page: 1,
      api_key: process.env.REACT_APP_API_KEY,
    });
  }, []);
  return (
    <div className="pt-8">
      <Outlet />
    </div>
  );
};

export default HomePage;
