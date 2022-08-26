import { apiTrending } from "api";
import { useMovie } from "hooks/use-movie";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  const { handleGetMovie, listMovie, detail } = useMovie();
  console.log({ listMovie, detail });
  const { getListTrendning } = apiTrending;
  useEffect(() => {
    console.log("hello");
    getListTrendning("movie/day", {
      api_key: process.env.REACT_APP_API_KEY,
    });
    handleGetMovie("popular", {
      page: 1,
      api_key: process.env.REACT_APP_API_KEY,
    });
  }, [getListTrendning]);
  return (
    <div className="pt-4">
      <Outlet />
    </div>
  );
};

export default HomePage;
