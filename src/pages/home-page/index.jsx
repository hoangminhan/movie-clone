import { UserContext } from "contexts";
import { useHomePage } from "hooks/use-homepage";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

const HomePage = () => {
  const stateContext = useContext(UserContext);
  const { handleGetMovie, handleGetListTrending } = useHomePage();

  useEffect(() => {
    const getDataApi = async () => {
      const currentTab = sessionStorage.getItem("currentTab") || "/";
      const locale = sessionStorage.getItem("currentLocale") || "vi-VN";

      const type = currentTab === "/" ? "movie" : "tv";
      await handleGetListTrending(
        {
          api_key: process.env.REACT_APP_API_KEY,
          language: locale,
        },
        type
      );
      await handleGetMovie(
        "popular",
        {
          page: 1,
          api_key: process.env.REACT_APP_API_KEY,
          language: locale,
        },
        type
      );
      await handleGetMovie(
        "top_rated",
        {
          page: 1,
          api_key: process.env.REACT_APP_API_KEY,
          language: locale,
        },
        type
      );
      await handleGetMovie(
        "upcoming",
        {
          page: 1,
          api_key: process.env.REACT_APP_API_KEY,
          language: locale,
        },
        type
      );
    };
    getDataApi();
  }, [stateContext]);
  return (
    <div className="py-8">
      <Outlet />
    </div>
  );
};

export default HomePage;
